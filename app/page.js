'use client'
import { useEffect, useRef, useState } from "react";
import data from '@/json/sidebar'
import Search from "@/components/search";
import UserBox from "@/components/auth/userBox";
import { useAuth } from "@/app/context/AuthContext";
import { genList } from "@/lib/genList";

export default function Home({ }) {
  const { isLoggedIn } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null)
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if Cmd/Ctrl + K is pressed
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsActive(!isActive);
        toggleSearch();
      }
      if (isActive && event.key === 'Escape') {
        event.preventDefault()
        toggleSearch();
      }
    }
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  })
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const toggleSearch = () => {
    setIsActive(!isActive);
    console.log("changed")
  };

  const [showMe, setShowMe] = useState([]);
  const setCurrent = index => {
    if (showMe.includes(index)) {
      setShowMe(showMe.filter(function(a) {
        return a !== index
      }))
    } else {
      setShowMe([
        ...showMe,
        index
      ])
    }

  };

  return (
    <>
      <div className='w-full flex justify-center pt-3' >
        <div className="w-3/6">
          <Search size={14} inputRef={inputRef} isOpen={isActive} close={toggleSearch} />
          <UserBox />
        </div>
      </div>
      <div className="flex ml-20 xl:ml-80  select-none">
        <div className="flex flex-col text-3xl mt-10">
        {data.map((item) => (
                    genList(item, showMe, setCurrent, isLoggedIn)
                  ))}

        </div >
      </div>
    </>
  )
}
