// pages/api/link-map.js
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// Regular expression to find markdown links [[link]]
const markdownLinkRegex = /\[\[(.*?)\]\]/g;

// Get all markdown files recursively
async function getAllMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return getAllMarkdownFiles(fullPath);
      } else if (entry.name.endsWith('.md')) {
        return [fullPath];
      }
      return [];
    })
  );
  
  return files.flat();
}

// Extract links from markdown content
function extractLinks(content) {
  const links = [];
  let match;
  
  while ((match = markdownLinkRegex.exec(content)) !== null) {
    links.push(match[1]);
  }
  
  return links;
}

// Helper function to generate node ID from file path
function getNodeId(filePath) {
  // Remove content directory prefix, extension, and normalize
  return filePath.replace(/\.md$/, '').toLowerCase();
}

export default async function handler(req, res) {
  try {
    const { filePath } = req.query;
    
    if (typeof filePath !== 'string') {
      return res.status(400).json({ error: 'File path is required' });
    }
    
    // Configure your content directory here
    const contentDir = path.join(process.cwd(), 'content');
    
    // Get all markdown files
    const allFiles = await getAllMarkdownFiles(contentDir);
    
    // Build graph of nodes and their connections
    const nodesMap = new Map();
    
    // First pass: Create all nodes and extract outgoing links
    for (const file of allFiles) {
      const relativePath = file.replace(contentDir, '');
      const nodeId = getNodeId(relativePath);
      
      const content = await fs.readFile(file, 'utf-8');
      const { data, content: markdownContent } = matter(content);
      const title = data.title || path.basename(file, '.md');
      
      const linksTo = extractLinks(markdownContent).map(link => getNodeId(`/${link}.md`));
      
      nodesMap.set(nodeId, {
        id: nodeId,
        title,
        path: relativePath.replace(/\.md$/, ''),
        linksTo,
        linksFrom: [],
      });
    }
    
    // Second pass: Fill in incoming links
    for (const [nodeId, node] of nodesMap.entries()) {
      for (const targetId of node.linksTo) {
        const targetNode = nodesMap.get(targetId);
        if (targetNode) {
          targetNode.linksFrom.push(nodeId);
        }
      }
    }
    
    // Get current node
    const currentNodeId = getNodeId(filePath);
    const currentNode = nodesMap.get(currentNodeId);
    
    if (!currentNode) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Get related nodes (nodes that link to or from the current node)
    const relatedNodeIds = new Set([
      ...currentNode.linksTo,
      ...currentNode.linksFrom,
    ]);
    
    const relatedNodes = Array.from(relatedNodeIds)
      .map(id => nodesMap.get(id))
      .filter(node => node !== undefined);
    
    // Return the data
    return res.json({
      currentNode,
      relatedNodes,
    });
    
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}