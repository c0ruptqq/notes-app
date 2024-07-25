'use client'
import NavMobile from "@/components/nav-mobile"
import NavDesktop from "@/components/nav-desktop"
import { usePathname } from "next/navigation"

// Left sidebar
export default function Sidebar() {

  const pathname = usePathname()
  return (
    <>
      {/*Check if its at home route§*/}
      {pathname === '/' ? <div />
        :
        <div className="z-30">
          <NavMobile />
          <NavDesktop />
        </div>
      }
    </>
  )
}

