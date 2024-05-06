import { Children, useEffect, useRef } from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import data from '@/json/sidebar.json'
import Link from 'next/link'
import Search from './search';
export default function NavDesktop() {
  const ref = useRef(null);
  const [showMe, setShowMe] = useState([]);
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
  const setCurrent = index => { //function which manages the array of 'opened' folders and subfolders
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


  function genList(node) { //recursive generative function uses Next's conditional rendering to display the list of folders and files using sidebar.json
    if (node.children && node.children.length > 0) { //decides if its a folder based on the number of children
      return ( //render method for a folder
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

    } else { //render method for a file
      return (
        <li key={node.route} className='mt-2' >
          <Link href={`/${node.route}`} >
            <h1 className='hover:underline'>{node.name}</h1>
          </Link>
        </li>
      )
    }
  }
  return (
    <div ref={ref} className="hidden xl:block">
      <div className="h-screen bg-white dark:bg-black absolute top-0 bottom-0 overflow-y-scroll border-r-1">
        <div className="mt-28" >
          <div className="transition ease-in-out delay-150">
            {!isActive
              ?
              (
                <div>
                  <div onClick={toggleSearch}>
                    <Search size={42} />
                  </div>
                  {data.map((item) => (
                    genList(item)
                  ))}

                </div>
              )
              :
              (
                <div className="top-0 mt-[-7rem] z-50 justify-center items-center flex backdrop-blur-sm h-screen w-screen">
                  <div className="w-[50rem] outline-none">
                    <Search size={14} inputRef={inputRef} isOpen={isActive} close={toggleSearch} />
                  </div>
                </div>

              )
            }

          </div>
        </div>

      </div>
    </div>
  );
};

