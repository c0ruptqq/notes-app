import React from 'react';

export default function Hamburger({isOpen}) {

return(
    
  <button
  className="flex flex-col justify-center items-center">
    <span className={`block bg-black dark:bg-white transition-all duration-300 ease-out 
                    h-2 w-6 rounded-sm ${isOpen ? 
                    'rotate-45 translate-y-1' : '-translate-y-0.5'
                    }`} >
    </span>
    <span className={`block bg-black dark:bg-white transition-all duration-300 ease-out 
                    h-2 w-6 rounded-sm my-0.5 ${isOpen ? 
                    'opacity-0' : 'opacity-100'
                    }`} >
    </span>
    <span className={`block bg-black dark:bg-white transition-all duration-300 ease-out 
                    h-2 w-6 rounded-sm ${isOpen ? 
                    '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                    }`} >
    </span>    
  </button>
  
)
};