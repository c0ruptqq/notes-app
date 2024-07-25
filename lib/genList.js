import Link from 'next/link';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export function genList(node, showMe, setCurrent, isLoggedIn) {
  if (node.private === true && !isLoggedIn) {
    return null;
  }

  if (node.children && node.children.length > 0) {
    const visibleChildren = node.children.filter(child => !child.private || isLoggedIn);

    if (visibleChildren.length === 0) {
      return null;
    }

    return (
      <div key={node.name} className="m-7 text-2xl">
        <div className='mt-6 hover:underline underline-offset-8 flex items-center'>
          {
            showMe.includes(node.name) ? <IoIosArrowUp />
              : <IoIosArrowDown />
          }
          <h1 
            className={`select-none ${node.private && isLoggedIn ? 'text-blue-500' : ''}`} 
            onClick={() => setCurrent(node.name)}
          >
            {node.name}/
          </h1>
        </div>
        <ul className="ml-4">
          {visibleChildren.map(child =>
            (showMe.includes(node.name)) && genList(child, showMe, setCurrent, isLoggedIn))}
        </ul>
      </div>
    )
  } else {
    return (
      <li key={node.route} className='mt-2'>
        <Link href={`/${node.route}`}>
          <h1 className={`hover:underline ${node.private && isLoggedIn ? 'text-blue-500' : ''}`}>
            {node.name}
          </h1>
        </Link>
      </li>
    )
  }
}