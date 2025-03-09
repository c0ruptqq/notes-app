import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from 'remark-gfm';
import rehypeKatex from "rehype-katex";
import rehypePrism from 'rehype-prism';
import wikiLinkPlugin from "@/lib/wikilink/lib/remarkWikiLink"
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import toc from '@jsdevtools/rehype-toc';
import { visit } from 'unist-util-visit';
import remarkBreaks from 'remark-breaks'
import matter from 'gray-matter';

import 'katex'
import 'katex/contrib/mhchem'

function remarkListsInTables() {
  return (tree) => {
    visit(tree, 'table', (node) => {
      visit(node, 'tableCell', (cell) => {
        if (cell.children && cell.children.length > 0) {
          // Join all text nodes in the cell, replace <br> with newlines
          const cellContent = cell.children
            .map(child => {
              if (child.type === 'text') return child.value
              if (child.type === 'html' && child.value === '<br>') return '\n'
              return ''
            })
            .join('')

          // Parse the cell content as Markdown
          const parsedContent = unified()
            .use(remarkParse)
            .use(remarkGfm)
            .parse(cellContent)
          // Replace the cell content with the parsed structure
          cell.children = parsedContent.children
        }
      })
    })
  }
}
const customizeTOC = toc => {
  try {
    const { children } = toc
    const childrenOfChildren = children?.[0]?.children
    if (!children?.length || !childrenOfChildren?.length) return null
  } catch (e) { }
  return {
    type: "element",
    tagName: "div",
    properties: { className: "toc" },
    children: [
      {
        type: "element",
        tagName: "p",
        properties: { className: "title" },
        children: [
          {
            type: "text",
            value: "Table of Contents"
          }
        ]
      },
      ...(toc.children || [])
    ]
  }
}
// Create a unified processor for rendering full content
const Processor = unified()
.use(remarkParse)
.use(remarkBreaks)
.use(remarkGfm)
.use(remarkListsInTables)
.use(remarkMath)
.use(remarkRehype, { allowDangerousHtml: true }) //convert to HTML
.use(rehypeKatex) //Katex support
.use(rehypePrism) //Prism support
.use(rehypeStringify, { allowDangerousHtml: true })
.use(rehypeSlug)
.use(toc, {
  customizeTOC, headings: ["h1", "h2", "h3"], customizeTOCItem(tocItem) {
    return {
      type: "element",
      tagName: "li",
      children: [
        {
          type: "element",
          tagName: "span",
        },
        ...(tocItem.children || [])
      ]
    }
  }
}) //generate the TOC at the top of the pages
.use(rehypeAutolinkHeadings, { behavior: 'append', properties: { id: "wrapper" } }) //add link icons to all the headings
.use(wikiLinkPlugin) //parses markdown [[Links]] to HTML links


export async function renderSearch(content) {
  try {
    if (!content || typeof content !== 'string') {
      console.warn("Invalid content provided to renderSearch:", content);
      return "";
    }

    const processedContent = await Processor.process(content);
    return processedContent.toString();
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return content; // Return original content if rendering fails
  }
}


export async function renderFullContent(content) {
  try {
    if (!content || typeof content !== 'string') {
      console.warn("Invalid content provided to renderFullContent:", content);
      return "";
    }
    const matterResult = matter(content)
    const processedContent = await Processor.process(matterResult.content);
    return processedContent.toString();
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return content; // Return original content if rendering fails
  }
}


export async function batchRenderSearch(items, contentKey = 'context', outputKey = 'renderedContext') {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  return Promise.all(
    items.map(async (item) => {
      if (!item || !item[contentKey]) {
        return item;
      }
      
      const renderedContent = await renderSearch(item[contentKey]);
      return {
        ...item,
        [outputKey]: renderedContent
      };
    })
  );
}

export async function renderHighlightedContent(content, searchTerm) {
  if (!content || typeof content !== 'string' || !searchTerm) {
    return content ? await renderFullContent(content) : "";
  }
  
  try {
    // Highlight all occurrences of the search term in the content with mark tags
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const highlightedContent = content.replace(regex, '<mark>$1</mark>');
    
    // Render the full markdown with highlights
    return await renderFullContent(highlightedContent);
  } catch (error) {
    console.error("Error highlighting content:", error);
    // Fall back to just rendering the content without highlights
    return await renderFullContent(content);
  }
}

// Simple cache implementation
const renderCache = new Map();
const CACHE_MAX_SIZE = 100;

async function getOrCacheRender(key, renderFn) {
  if (renderCache.has(key)) {
    return renderCache.get(key);
  }
  
  const result = await renderFn();
  
  // Implement LRU-like behavior by clearing oldest entries if cache gets too big
  if (renderCache.size >= CACHE_MAX_SIZE) {
    const oldestKey = renderCache.keys().next().value;
    renderCache.delete(oldestKey);
  }
  
  renderCache.set(key, result);
  return result;
}

export async function cachedRenderSearch(content) {
  const cacheKey = `search:${content}`;
  return getOrCacheRender(cacheKey, () => renderSearch(content));
}

export async function cachedRenderFullContent(content) {
  const cacheKey = `full:${content}`;
  return getOrCacheRender(cacheKey, () => renderFullContent(content));
}

export async function cachedRenderHighlightedContent(content, searchTerm) {
  const cacheKey = `highlight:${content}:${searchTerm}`;
  return getOrCacheRender(cacheKey, () => renderHighlightedContent(content, searchTerm));
}

export function clearRenderCache() {
  renderCache.clear();
}