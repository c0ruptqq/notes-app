'use client'
import { useTheme } from 'next-themes'
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { DiAtom } from "react-icons/di";
//button which manages dark mode
export default function Theme() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  return (
    <>
      <div className='fixed top-0 z-40'>
        {router.pathname == '/' ? <div />
          :
          <button type="button" onClick={() => router.push('/')} className='bg-[#E9D2FD] z-40 xl:block hidden rounded-xl left-0 ml-4 mt-4 aspect-square w-16 fixed'>
            <DiAtom size={40} className='m-3 dark:text-black' />
          </button>
        }
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className='bg-[#E9D2FD] rounded-xl right-0 mr-4 mt-4 fixed z-40'>
          <div className='m-3 dark:text-black'>
            <FaMoon size={40} className='dark:hidden' />
            <FaSun size={40} className='dark:block hidden' />
          </div>
        </button>
      </div>
    </>
  )
}
