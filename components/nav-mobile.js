import { useEffect } from "react";
import { useState } from "react";
import data from '@/json/sidebar.json'
import Search from "@/components/search";
import { usePathname } from "next/navigation";
import Hamburger from "./hamburger";
import UserBox from "./auth/userBox";
import { genList } from "@/lib/genList";
import { useAuth } from "@/app/context/AuthContext";

export default function NavMobile() {
  const { isLoggedIn } = useAuth();
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
    if (isOpen) {
      setOpen(!isOpen);
    }
    if (scroll) {
      document.body.classList.remove('no-scroll')
      setScroll(!scroll)
    }

  }, [pathname]);
  return (
    <div className="xl:hidden z-[999]">
      <div className='border-solid border-2 border-black rounded-xl z-[50] relative dark:border-white aspect-square w-16 text-black flex justify-center items-center bg-white dark:bg-black' onClick={() => {setOpen(!isOpen); toggleScroll()}}>
        <Hamburger isOpen={isOpen}/>
      </div>
      {(isOpen) &&
        <div className="h-screen bg-white dark:bg-black absolute w-screen top-0 left-0 overflow-y-scroll">
          <div className="mt-28">
          {data.map((item) => (
                    genList(item, showMe, setCurrent, isLoggedIn)
                  ))}
            <Search />
            <UserBox />
          </div>
        </div>
      }
    </div>
  );
};

