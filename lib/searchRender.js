import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from 'remark-gfm';
import rehypeKatex from "rehype-katex";
import rehypePrism from 'rehype-prism';
import remarkBreaks from 'remark-breaks';


export async function renderSearch(content) {
    try {
      const processedContent = await unified()
        .use(remarkParse)
        .use(remarkBreaks)
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeKatex)
        .use(rehypePrism)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content);
      
      return processedContent.toString();
    } catch (error) {
      console.error("Error rendering markdown:", error);
      return content; // Return original content if rendering fails
    }
  }
  
  /**
   * Batch renders multiple markdown content items
   * 
   * @param {Array} items - Array of objects containing markdown content to render
   * @param {string} contentKey - The key in each item object that contains the markdown content
   * @param {string} outputKey - The key to store the rendered content in each item
   * @returns {Promise<Array>} - Array of objects with rendered content
   */
  export async function batchRenderSearch(items, contentKey = 'context', outputKey = 'renderedContext') {
    return Promise.all(
      items.map(async (item) => {
        const renderedContent = await renderSearch(item[contentKey]);
        return {
          ...item,
          [outputKey]: renderedContent
        };
      })
    );
  }