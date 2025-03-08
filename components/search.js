'use client'
import { searchInJSON } from "@/lib/search";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "@/components/ui/input"
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { batchRenderSearch } from "@/lib/searchRender";

export default function Search({ size, inputRef, isOpen, close }) {
  const [searchResults, setSearchResults] = useState([]);
  const [renderedResults, setRenderedResults] = useState([]);
  const [value, setValue] = useState("");
  const router = useRouter()
  const { isLoggedin } = useAuth()
  const handleSearch = (value) => {
    const results = searchInJSON(value, { caseSensitive: true, partialMatch: true }, isLoggedin);
    setSearchResults(results);
  }

  useEffect(() => {
    const processResults = async () => {
      if (searchResults.length > 0) {
        const rendered = await batchRenderSearch(searchResults);
        setRenderedResults(rendered);
      } else {
        setRenderedResults([]);
      }
    };

    processResults();
  }, [searchResults]);


  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      <div className="m-3 w-full">
        {/*Input Bar*/}
        <Input
          placeholder="⌘k"
          ref={inputRef}
          value={value}
          onChange={(e) => {handleSearch(e.target.value); setValue(e.target.value)}}
          variant="faded"
        />
        <div className="bg-white dark:bg-black max-h-[30rem] overflow-auto rounded-xl mt-3">
          <ul>
            {renderedResults.map((result, index) => (
              <li key={index} className="border-2 m-3 rounded-xl p-2 cursor-pointer transition-colors duration-300 ease-in-out dark:hover:bg-secondary hover:bg-light-secondary " onClick={() => { router.push(`/${result.route}`); {if ( close){ close()}}; setValue(""); handleSearch(""); }}>
                <p className="text-light-secondary">{result.route}</p>
                {/*Html inset to render word highlighting highlighting*/}
                <div className="search-result-content" dangerouslySetInnerHTML={{ __html: result.renderedContext }}></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div >
  );
}


