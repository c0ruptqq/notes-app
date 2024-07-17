import jsonData from "../json/search.json" assert {type: "json"};

const files = []
jsonData.forEach(item => {
  if (!item.title) {
    files.push(item.route)
  }
})
if (files == []) {
  console.log("All files have titles")
} else {
  console.log(files)
}
