import jsonData from "@/json/search.json";

// Modified searchInJSON function in lib/search.js
export function searchInJSON(searchTerm, options = { caseSensitive: false, partialMatch: false }, isLoggedIn) {
  const results = [];
  if (searchTerm !== "") {
    // Loop through each item in the JSON data
    jsonData.forEach(item => {
      if (item.private === true && !isLoggedIn) {
        return;
      }
      // Search in title
      if (item.title) {
        const titleMatches = searchAndReturnContext(
          item.title, 
          item.route, 
          searchTerm, 
          options, 
          item.private,
          "title"
        );
        if (titleMatches.length > 0) {
          results.push(...titleMatches);
        }
      } else {
        throw new Error(`Object at route ${item.route} doesn't have a title property`);
      }

      // Search in content
      const contentMatches = searchAndReturnContext(
        item.content, 
        item.route, 
        searchTerm, 
        options, 
        item.private,
        "content"
      );
      if (contentMatches.length > 0) {
        results.push(...contentMatches);
      }
    });
  }
  
  return results;
}

export function searchAndReturnContext(text, route, searchTerm, options, isPrivate, source = "content") {
  const { caseSensitive, partialMatch } = options;
  const searchRegex = new RegExp(partialMatch ? searchTerm : '\\b' + searchTerm + '\\b', caseSensitive ? 'g' : 'gi');
  
  // Find the item that matches this route to get its title
  const item = jsonData.find(item => item.route === route);
  const title = item ? item.title : route;
  
  const matches = [];
  
  // If we're searching in a title or the text is short, we can use simple word-based matching
  if (source === "title" || text.length < 1000) {
    const words = text.split(/\s+/);
    
    // Search for the searchTerm in individual words
    words.forEach((word) => {
      if (word.match(searchRegex)) {
        matches.push({
          word: word,
          route: route,
          title: title,
          isPrivate: isPrivate,
          source: source
        });
      }
    });
  } else {
    // For content, we can do more comprehensive matching
    let match;
    while ((match = searchRegex.exec(text)) !== null) {
      matches.push({
        word: match[0],
        route: route,
        title: title,
        isPrivate: isPrivate,
        source: source
      });
    }
  }
  
  return matches;
}

// Get the full content of a document by its route
export function getFileContent(route) {
  const item = jsonData.find(item => item.route === route);
  return item ? item.content : "Content not found";
}

// Get highlighted file content for display
export function getHighlightedFileContent(route, searchTerm) {
  const content = getFileContent(route);
  if (content === "Content not found") return content;
  
  // Highlight all occurrences of the search term in the content
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return content.replace(regex, '<mark>$1</mark>');
}

// Group results by route/filename
export function groupResultsByRoute(results) {
  return results.reduce((acc, result) => {
    if (!acc[result.route]) {
      acc[result.route] = [];
    }
    acc[result.route].push(result);
    return acc;
  }, {});
}