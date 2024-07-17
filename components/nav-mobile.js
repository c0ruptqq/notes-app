import { useEffect } from "react";
import { useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import data from '@/json/sidebar.json'
import Link from 'next/link'
import Search from "@/components/search";
import { useRouter } from "next/navigation";
export default function NavMobile() {
  const [isOpen, setOpen] = useState(false);

  const [showMe, setShowMe] = useState([]);
  const [scroll, setScroll] = useState(true)
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
  const router = useRouter();
  function toggleScroll() { //disables scrolling while the menu is opened 
    if (scroll) {
      document.body.classList.remove('no-scroll')
    } else {
      document.body.classList.add('no-scroll')

    }
    setScroll(!scroll)

  }
  useEffect(() => {
    if (isOpen) {
      setOpen(!isOpen);
    }
    if (scroll) {
      document.body.classList.remove('no-scroll')
      setScroll(!scroll)
    }

  }, [router.asPath]);

  function genList(node) { //same as nave-desktop.js
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
  return (
    <div className="xl:hidden w-screen z-50">
      <div className='bg-[#E9D2FD] rounded-xl absolute z-50 left-0 ml-4 mt-4 aspect-square w-16 text-black flex justify-center items-center' onClick={toggleScroll}>
        <Hamburger toggled={isOpen} size={50} toggle={setOpen} rounded />
      </div>
      {(isOpen) &&
        <div className="h-screen bg-white dark:bg-black absolute w-screen top-0 bottom-0 overflow-y-scroll">
          <div className="mt-28">
            {data.map((item) => (
              genList(item)
            ))}
            <Search />
          </div>
        </div>
      }
    </div>
  );
};

