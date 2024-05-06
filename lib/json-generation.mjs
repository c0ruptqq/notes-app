import { remark } from 'remark'
import { globSync } from 'glob';
import matter from 'gray-matter';
import strip from 'strip-markdown';
import fs from 'fs'

export async function generate() {
  var jsonData = {
    "nodes": [],
    "links": []
  }
  var jsonRoutes = {
    "routes": []
  }
  const contents = globSync('notes/**/*.md') //get the paths of markdown file in the notes/ folder
  const links = []
  const ids = []
  const routes = []
  // Links and Nodes for the force graph
  contents.map((l) => {
    const file = l
    const markdown = fs.readFileSync(`${l}`, { encoding: 'utf8' });
    const d = markdown.match(/\[\[([^\]]*)\]\]/g) || []
    d.map((item) => {
      links.push([file.match(/[^\/]+(?=\/$|$)/gi).toString().replace('.md', ''), item.match(/(?<=\[\[)(.*)(?=\]\])/gi).toString()])
      ids.push(file.match(/[^\/]+(?=\/$|$)/gi).toString().replace('.md', ''))
      ids.push(item.match(/(?<=\[\[)(.*)(?=\]\])/gi).toString(),)
    })
  })
  const uniqueIds = [...new Set(ids)]

  uniqueIds.forEach((element) =>
    jsonData.nodes.push({
      id: element,
    }))
  links.forEach((element) =>
    jsonData.links.push({
      source: element[0],
      target: element[1]
    })
  )
  const jsonString = JSON.stringify(jsonData)
  fs.writeFileSync('json/links.json', jsonString, 'utf-8', (err) => {
    if (err) throw err;
    console.log('Data added to file');
  })

  // Routes for node click navigation
  contents.map((d) => {
    routes.push([d.match(/[^\/]+(?=\/$|$)/gi).toString().replace('.md', ''), d.toString().replace('.md', '')])
  })
  routes.forEach((element) =>
    jsonRoutes.routes.push({
      id: element[0],
      route: element[1]
    }))
  const routeString = JSON.stringify(jsonRoutes)

  fs.writeFileSync('json/routes.json', routeString, 'utf-8', (err) => {
    if (err) throw err;
  })

  // Routes and paths for the sidebar
  let fileStructure = [];
  contents.forEach(filePath => {
    const directories = filePath.split('/');
    const slug = filePath.replace('.md', '')
    let currentLevel = fileStructure;
    directories.forEach((directory, index) => {
      const existingDirectory = currentLevel.find(item => item.name === directory);
      if (!existingDirectory) {
        if (index === directories.length - 1 && directory.endsWith('.md')) {
          currentLevel.push({
            name: directory.replace('.md', ''),
            route: slug
          });
        } else {
          const newDirectory = { name: directory, children: [] };
          currentLevel.push(newDirectory);
          currentLevel = newDirectory.children;
        }
      }
      else {
        currentLevel = existingDirectory.children;
      }
    });
  });

  const sidebarString = JSON.stringify(fileStructure)
  fs.writeFileSync('json/sidebar.json', sidebarString, 'utf-8', (err) => {
    if (err) throw err;
  })

  // Search JSON
  var searchJson = []
  for (const fileName of contents) {
    const slug = fileName.replace('.md', '')
    const readFile = fs.readFileSync(`${fileName}`, 'utf8')
    const fmatter = matter(readFile)
    var plain = await remark()
      .use(strip)
      .process(fmatter.content)
    var plain = plain.value.replace(/(\r\n|\n|\r)/gm, "").replace(/\$\$.*?\$\$/g, '').replace(/\$.*?\$/g, '')

    searchJson.push({
      route: slug,
      title: fmatter.data.title,
      content: plain
    })
  }
  const searchString = JSON.stringify(searchJson)
  fs.writeFileSync('json/search.json', searchString, 'utf8', (err) => {
    if (err) throw err;
  })
}
generate()
