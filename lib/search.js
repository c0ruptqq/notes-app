import jsonData from "@/json/search.json";
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
        const titleMatches = searchAndReturnContext(item.title, item.route, searchTerm, options, item.private); // 5 words of context
        if (titleMatches.length > 0) {
          results.push(...titleMatches);
        }
      } else {
        throw new Error(`Object at route ${item.route} doesn't have a title property`);
      }

      // Search in content
      const contentMatches = searchAndReturnContext(item.content, item.route, searchTerm, options, item.private); // 5 words of context
      if (contentMatches.length > 0) {
        results.push(...contentMatches);
      }
    });
  }
  // Filter out duplicate routes
  const uniqueRoutes = [];
  const uniqueResults = results.filter(result => {
    if (!uniqueRoutes.includes(result.route)) {
      uniqueRoutes.push(result.route);
      return true;
    }
    return false;
  });

  return uniqueResults;
}

function searchAndReturnContext(text, route, searchTerm, options, isPrivate) {
  const { caseSensitive, partialMatch } = options;
  const searchRegex = new RegExp(partialMatch ? searchTerm : '\\b' + searchTerm + '\\b', caseSensitive ? 'g' : 'gi');
  const words = text.split(/\s+/);
  const matches = [];

  // Search for the searchTerm and return the context around it
  words.forEach((word, index) => {
    if (word.match(searchRegex)) {
      const startIndex = Math.max(0, index - 5); // 5 words of context before
      const endIndex = Math.min(words.length, index + 6); // 5 words of context after
      const context = words.slice(startIndex, endIndex).map((w, i) => {
        if (w.match(searchRegex)) {
          return `<mark>${w}</mark>`; // Highlight the matched word
        } else {
          return w;
        }
      }).join(" ");
      matches.push({
        word: word,
        route: route,
        context: context,
        isPrivate: isPrivate
      });
    }
  });
  return matches;
}
