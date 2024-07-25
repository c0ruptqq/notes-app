'use client'

import { ModeToggle } from "./ui/mode-toggle"
import NavMobile from "@/components/nav-mobile"
import NavDesktop from "@/components/nav-desktop"
import { usePathname } from "next/navigation"


export default function Header() {

    const pathname = usePathname()

    return(
        <>
        {pathname === '/' ? <div />
          :
        <div className="h-28 w-screen flex flex-row justify-between p-4">
            <NavMobile />
            <NavDesktop />
            <ModeToggle className='h-16 w-16'/>
        </div>
        }
        </>
    )
}