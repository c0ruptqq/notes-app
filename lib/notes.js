import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import 'katex'
import 'katex/contrib/mhchem'
import rehypeKatex from "rehype-katex";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from 'remark-gfm'
import wikiLinkPlugin from "@/lib/wikilink/lib/remarkWikiLink"
import rehypePrism from '@mapbox/rehype-prism';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import toc from '@jsdevtools/rehype-toc';
import rehypeMermaid from 'rehype-mermaid';
// Wrapper to flatten and return nested path list as flat array expected by next
export async function getPathList(folder, ogPath, pageFileCache) {
  let nestedPaths = await getNestedPathList(folder, ogPath, pageFileCache);
  return flatten(nestedPaths).filter((x) => !!x);
}

// Recursivly scan the documentation folder. This includes any extra resolution magic
// such as index.md acting as the folder index
export async function getNestedPathList(folder, ogPath, pageFileCache) {
  return (
    await Promise.all(
      (await fs.readdir(folder)).map(async (file) => {
        const joined = path.join(folder, file);

        //  Call recursively if a directory
        if ((await fs.stat(joined)).isDirectory()) {
          return getNestedPathList(joined, ogPath, pageFileCache);
        }

        // If a content markdown is found
        if (joined.endsWith('.md')) {
          let alteredPath = joined
            .slice(folder.length + 1)
            .replace(/\.md$/, '')
            .replace(/\index$/, '');

          // In recursive depths, add folder name and trim any stray '/'
          if (folder !== ogPath) {
            alteredPath = folder.replace(ogPath, '') + '/' + alteredPath;
          }
          alteredPath = trimChar(alteredPath, '/');

          pageFileCache[alteredPath] = joined;
          return {
            params: {
              id: alteredPath.split('/'),
            },
          };
        } else {
          return null;
        }
      })
    )
  ).filter((x) => !!x);
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


export async function getPostData(id, fullPath) {
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const behaviour = 'append'
  // Use remark to convert markdown into HTML string
  // Remark perses markdown
  // rehype parses HTML
  const processedContent = await unified() //Convert markdown to html
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype) //convert to HTML
    .use(rehypeMermaid, { strategy: 'img-svg' })
    .use(rehypeKatex) //Katex support
    .use(rehypePrism) //Prism support
    .use(rehypeStringify)
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
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

var trimChar = function(origString, charToTrim) {
  charToTrim = escapeRegExp(charToTrim);
  var regEx = new RegExp('^[' + charToTrim + ']+|[' + charToTrim + ']+$', 'g');
  return origString.replace(regEx, '');
};

var escapeRegExp = function(strToEscape) {
  return strToEscape.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

function flatten(items) {
  const flat = [];

  items.forEach((item) => {
    if (Array.isArray(item)) {
      flat.push(...flatten(item));
    } else {
      flat.push(item);
    }
  });

  return flat;
}

