import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import { commitAndPush } from './commit.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, 'util'); 


const executeFile = async (filePath) => {
  try {
    console.log(`Executing ${filePath}...`);
    await import(filePath); // Use dynamic import for ES modules
  } catch (err) {
    console.error(`Error executing ${filePath}:`, err);
  }
};

// Read all files in the specified directory
fs.readdir(directoryPath, async (err, files) => {
  if (err) {
    return console.error('Unable to scan directory:', err);
  }
  for (const file of files.filter(file => file.endsWith('.mjs') || file.endsWith('.js'))) {
    const filePath = path.join(directoryPath, file);
    await executeFile(filePath);
  }
  commitAndPush()
});

