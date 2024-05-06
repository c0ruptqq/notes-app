'use client'
import { searchInJSON } from "@/lib/search";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search({ size, inputRef, isOpen, close }) {
  const [searchResults, setSearchResults] = useState([]);
  const [value, setValue] = useState("");
  const router = useRouter()
  const handleSearch = (value) => {
    const results = searchInJSON(value, { caseSensitive: true, partialMatch: true });
    setSearchResults(results);
  }
  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      <div className="m-3 w-full">
        {/*Input Bar*/}
        <Input
          ref={inputRef}
          onValueChange={setValue}
          value={value}
          type="input"
          onChange={(e) => handleSearch(e.target.value)}
          variant="faded"
          startContent={
            <FaSearch size={size} />
          }
          endContent={
            <div>
              {/*End of line Keybind test*/}
              {!isOpen
                ?
                (
                  <div className="flex items-center">
                    <span className="text-2xl">⌘</span>
                    <span className="text-xl">k</span>
                  </div>
                )
                :
                (<span>esc</span>)
              }
            </div>
          }
        />
        <div className="bg-white dark:bg-black max-h-[30rem] overflow-auto rounded-xl mt-3">
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} className="border-2 m-3 rounded-xl p-2 cursor-pointer transition-colors duration-300 ease-in-out dark:hover:bg-secondary hover:bg-light-secondary" onClick={() => { router.push(`/${result.route}`); close(); setValue(""); handleSearch(""); }}>
                <p>{result.route}</p>
                {/*Html inset to render word highlighting highlighting*/}
                <div dangerouslySetInnerHTML={{ __html: result.context }}></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div >
  );
}


