import fs from 'fs-extra'
import path from 'path';

// Source directory
const sourceDir = path.join('content', 'img');

// Destination directory
const destDir = path.join('public', 'img');

// Copying the img folder
async function copyImgFolder() {
  try {
    await fs.copy(sourceDir, destDir);
  } catch (err) {
    console.error('Error copying img folder:', err);
    process.exit(1)
  }
}

copyImgFolder();
