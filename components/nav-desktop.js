import { useEffect, useRef } from "react";
import { useState } from "react";
import data from '@/json/sidebar.json'
import Search from './search';
import ProfileBox from "./auth/userBox";
import { genList } from "@/lib/genList";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation";

export default function NavDesktop() {
  const { isLoggedIn } = useAuth();
  const ref = useRef(null);
  const [showMe, setShowMe] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null)
  const [scroll, setScroll] = useState(true)
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
    toggleScroll()
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

  function toggleScroll() {
    if (scroll) {
      document.body.classList.remove('no-scroll')
    } else {
      document.body.classList.add('no-scroll')

    }
    setScroll(!scroll)

  }
  const pathname = usePathname()
  useEffect(() => {
    if (scroll) {
      document.body.classList.remove('no-scroll')
      setScroll(!scroll)
    }
  }, [pathname]);

  return (
    <div ref={ref} className="hidden xl:block z-[999]">
      <div className={`h-screen bg-white ${!isActive ? 'dark:bg-black bg-white' : 'bg-white/25 dark:bg-black/25 backdrop-blur-sm'} absolute top-0 bottom-0 border-r-1`}>
        <div className="mt-14" >
          <div className="transition ease-in-out delay-150">
            {!isActive
              ?
              (
                <div>
                  <ProfileBox />
                  <div onClick={toggleSearch}>
                    <Search size={42} />
                  </div>
                  {data.map((item) => (
                    genList(item, showMe, setCurrent, isLoggedIn)
                  ))}

                </div>
              )
              :
              (
                <div className="top-0 mt-[-7rem] justify-center items-center flex h-screen w-screen">
                  <div className="w-[50rem] outline-none absolute">
                    <Search size={14} inputRef={inputRef} isOpen={isActive} close={toggleSearch} isMobile={false} />
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

