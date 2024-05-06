'use client'


import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'
import { FaExpandAlt } from "react-icons/fa";
import { useRef, useState } from 'react';
import routes from '@/json/routes.json'
import data from '@/json/links.json'
const NoSSRForceGraph = dynamic(() => import('@/lib/force-graph'), {
  ssr: false
});

export default function Graph() {
  const ref = useRef(null)
  const ref1 = useRef(null)
  const [w, setW] = useState(200)
  const [h, setH] = useState(200)

  function setFS() {
    const wrapper = ref.current;
    const graph = ref1.current
    var ww = window.innerWidth;
    var wh = window.innerHeight
    if ((w == ww * 0.8) && (h == wh * 0.8)) {
      setW(200)
      setH(200)
      wrapper.classList.remove("w-screen")
      graph.classList.remove("h-5/6")
    } else {
      setW(ww * 0.8)
      setH(wh * 0.8)
      wrapper.classList.add("w-screen")
      graph.classList.add("h-5/6")
    }
  }
  const router = useRouter()
  const color = '#c17aff'
  return (
    <>
      {router.pathname == '/' ? <div />
        :

        <div ref={ref} className='right-0 top-0 fixed h-screen content-center flex-wrap flex-row justify-center hidden lg:flex z-30'>
          <div ref={ref1} className='border bg-white dark:bg-black relative w-fit rounded-xl m-3 '>

            <button>
              <FaExpandAlt className='text-[#3c3c3c] dark:text-[#e5e5e5] right-2 top-2 absolute' onClick={setFS} />
            </button>
            <NoSSRForceGraph className='rounded-xl'
              graphData={data}
              nodeAutoColorBy="group"
              width={w}
              height={h}
              nodeLabel="id"
              linkWidth="1"
              linkColor={() => color}
              onNodeClick={
                (node) => routes.routes.map((item) => {
                  if (item.id == node.id) {
                    router.push(`/${item.route}`)
                  }
                  else {
                  }
                })} />
          </div>
        </div>
      }
    </>
  );
}


