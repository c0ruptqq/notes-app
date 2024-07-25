'use client'
import { useEffect, useRef, useState } from "react";
import data from '@/json/sidebar'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import Search from "@/components/search";
import UserBox from "@/components/auth/userBox";

export default function Home({ }) {
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
  function genList(node) {
    if (node.children && node.children.length > 0) {
      return (
        <div key={node.name} className="m-7 text-2xl">
          <div className='mt-6 hover:underline underline-offset-8 flex items-center'>
            {
              showMe.includes(node.name) ? <IoIosArrowUp />
                : <IoIosArrowDown />
            }
            <h1 className='select-none' onClick={() => setCurrent(`${node.name}`)}>{node.name}/</h1>
          </div>
          <ul className="ml-4">
            {node.children.map(child =>
              (showMe.includes(node.name)) && genList(child))}
          </ul>
        </div>
      )

    } else {
      return (
        <li key={node.route} className='mt-2' >
          <Link href={`/${node.route}`} >
            <h1 className='hover:underline'>{node.name}</h1>
          </Link>
        </li>
      )
    }
  }

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
            genList(item)
          ))}

        </div >
      </div>
    </>
  )
}
