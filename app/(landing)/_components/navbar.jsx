'use client'
import { Button } from "@/components/ui/button"
import { useEffect } from "react";
import { useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import data from '@/json/sidebar.json'
import Link from 'next/link'
import Search from "@/components/search";
import { usePathname, useRouter } from "next/navigation";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
export const NavBar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
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
    const pathname = usePathname()
    return (
        <>
        <div className="z-50 fixed top-0 flex items-center w-full p-6 ">
            <div>
            {pathname === '/' ? <div /> :
            <div>
                <div className='aspect-square w-16 ' onClick={toggleScroll}>
                    <Hamburger toggled={isOpen} size={50} toggle={setOpen} rounded />
                </div>
                {(isOpen) &&
                    <div className="overflow-y-scroll absolute">
                        <div className="">
                            {data.map((item) => (
                                genList(item)
                            ))}
                            <Search />
                        </div>
                    </div>
                }
                </div>
            }
            </div> 
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
            {isLoading && (
                <p>Loading...</p>
            )}
            {!isAuthenticated && !isLoading &&(
            <>
                <SignInButton mode="modal">
                <Button variant='ghost'>Login</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                <Button>Register</Button>
                </SignUpButton>
            </>
            )}
            {isAuthenticated && !isLoading && (
                <>
                <Button>
                    <Link href="/editor">Editor</Link>
                </Button>
                <UserButton afterSignOutUrl="/" ></UserButton>
                </>
            )}
            </div>
        </div>
        </>
    )
}
          