'use client'
import { searchInJSON, getHighlightedFileContent, groupResultsByRoute, getFileContent } from "@/lib/search";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/app/context/AuthContext";
import { 
  batchRenderSearch, 
  cachedRenderFullContent, 
  cachedRenderHighlightedContent,
  clearRenderCache 
} from "@/lib/searchRender";

export default function Search({ size, inputRef, isOpen, close, isMobile}) {
  const [searchResults, setSearchResults] = useState([]);
  const [renderedResults, setRenderedResults] = useState([]);
  const [value, setValue] = useState("");
  const [hoveredRoute, setHoveredRoute] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [renderedFileContent, setRenderedFileContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isLoggedin } = useAuth();

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm === "") {
        setSearchResults([]);
        setRenderedResults([]);
        setHoveredRoute(null);
        return;
      }
      
      const results = searchInJSON(searchTerm, { caseSensitive: false, partialMatch: true }, isLoggedin);
      setSearchResults(results);
      
      // Set the first route as hovered by default for initial content display
      if (results.length > 0) {
        const firstRoute = results[0].route;
        setHoveredRoute(firstRoute);
      }
    }, 300),
    [isLoggedin]
  );

  const handleSearch = (value) => {
    setValue(value);
    debouncedSearch(value);
  };

  // Process search results with the enhanced renderer
  useEffect(() => {
    const processResults = async () => {
      if (searchResults.length > 0) {
        setIsLoading(true);
        try {
          const rendered = await batchRenderSearch(searchResults);
          setRenderedResults(rendered);
        } catch (error) {
          console.error("Error rendering search results:", error);
          setRenderedResults(searchResults); // Fallback to unrendered results
        } finally {
          setIsLoading(false);
        }
      } else {
        setRenderedResults([]);
      }
    };

    processResults();
  }, [searchResults]);

  // Update the file content when hovered route changes
  useEffect(() => {
    const updateFileContent = async () => {
      if (hoveredRoute && value) {
        setIsLoading(true);
        try {
          // Get the raw content
          const rawContent = getFileContent(hoveredRoute);
          setFileContent(rawContent);
          
          // Render the content with highlighted search terms
          const rendered = await cachedRenderHighlightedContent(rawContent, value);
          setRenderedFileContent(rendered);
        } catch (error) {
          console.error("Error rendering file content:", error);
          // Fallback to basic highlighting if rendering fails
          const highlightedContent = getHighlightedFileContent(hoveredRoute, value);
          setRenderedFileContent(highlightedContent);
        } finally {
          setIsLoading(false);
        }
      } else if (hoveredRoute) {
        // No search term, just render the file content
        const rawContent = getFileContent(hoveredRoute);
        setFileContent(rawContent);
        
        const rendered = await cachedRenderFullContent(rawContent);
        setRenderedFileContent(rendered);
      } else {
        setFileContent("");
        setRenderedFileContent("");
      }
    };

    updateFileContent();
  }, [hoveredRoute, value]);

  // Clear render cache when component unmounts
  useEffect(() => {
    return () => {
      clearRenderCache();
    };
  }, []);

  // Group results by route/filename
  const groupedResults = groupResultsByRoute(renderedResults.length > 0 ? renderedResults : searchResults);

  // Check if a route has title matches
  const hasMatchInTitle = (results) => {
    return results.some(result => result.source === "title");
  };

  // Handle click on a title - navigate to the page
  const handleTitleClick = (route) => {
    router.push(`/${route}`);
    if (close) close();
    setValue("");
    setSearchResults([]);
  };

  // Handle mouse over on a title - show preview
  const handleTitleHover = (route) => {
    setHoveredRoute(route);
  };

  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      <div className="m-3 w-full">
        {/*Input Bar*/}
        <Input
          placeholder="Search titles and content..."
          ref={inputRef}
          value={value}
          onChange={(e) => handleSearch(e.target.value)}
          variant="faded"
        />
        
        {searchResults.length > 0 && (
          <div className="bg-white dark:bg-black border rounded-xl mt-3 overflow-hidden">
            <div className="flex h-[30rem]">
              {/* Left panel: Titles with hover and click functionality */}
              <div className={`${!isMobile ? 'w-1/3' : 'w-3/3' } border-r overflow-auto bg-gray-50 dark:bg-gray-900`}>
                {Object.entries(groupedResults).map(([route, results]) => {
                  // Get the title from the first result for this route
                  const title = results[0] && results[0].title ? results[0].title : route;
                  const matchedInTitle = hasMatchInTitle(results);
                  
                  return (
                    <div key={route} className="border-b">
                      <div 
                        className={`px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                          hoveredRoute === route ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'
                        }`}
                        onMouseEnter={() => handleTitleHover(route)}
                        onClick={() => handleTitleClick(route)}
                      >
                        <div className="font-semibold flex items-center gap-2">
                          {title}
                          {matchedInTitle && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Title match</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {results.length} {results.length === 1 ? 'match' : 'matches'}
                          {matchedInTitle ? ' (includes title match)' : ' in content'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Right panel: Content preview based on hover */}
              {!isMobile ? (
              <div className="w-2/3 overflow-auto p-4 bg-white dark:bg-black">
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : hoveredRoute ? (
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      {(() => {
                        const resultsForRoute = groupedResults[hoveredRoute] || [];
                        return resultsForRoute.length > 0 && resultsForRoute[0].title 
                          ? resultsForRoute[0].title 
                          : hoveredRoute;
                      })()}
                    </h2>
                    {/* Use the search-result-content class to maintain markdown rendering */}
                    <div 
                      className="search-result-content prose prose-l dark:prose-invert break-words prose-td:p-3" 
                      dangerouslySetInnerHTML={{ __html: renderedFileContent }}
                    ></div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full text-gray-500">
                    Hover over a result to preview
                  </div>
                )}
              </div>
              ):(<></>)}
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function for debouncing
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}