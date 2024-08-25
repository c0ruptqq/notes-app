import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonFilePath = path.join(__dirname, '../../json/search.json'); 

let jsonData
const loadJsonData = async () => {
  try {
    const data = await fs.readFile(jsonFilePath, 'utf-8');
    jsonData = JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON file:', err);
  }
};

await loadJsonData();


const files = []
jsonData.forEach(item => {
  if (!item.title) {
    files.push(item.route)
  }
})
if (files.length === 0) {

} else {
  console.log("The following files don't have titles:\n", files)
  process.exit(1)
}
