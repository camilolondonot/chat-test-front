import React from 'react'
import BootEva from '../../../../assets/img/brand/eva_boot.webp'

const HederChat = ({resetChat}) => {
  return (
    <div className='bg-teal-600 relative w-full rounded-t-md px-4 py-2 flex justify-between items-center'>
      <img className='w-28 pointer-events-none  h-auto object-contain aspect-square absolute left-[-50px] top-[-60px]  drop-shadow-lg' src={BootEva} alt="" />
      <h4 className='pointer-events-none font-bold ms-10 text-lg text-white'>Chat Pocki</h4>
      <div className="online  flex items-center gap-3">
        <small className='text-white pointer-events-none'>Online</small>
        <span className="relative flex size-2 pointer-events-none">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
        </span>
        <div className="group relative">
          <button
            onClick={resetChat}
            className="p-2 rounded-full bg-teal-800 hover:bg-teal-900 transition-all"
          >
            <svg id="Reset--Streamline-Carbon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height={16} width={16}>
              <path d="M9 14A6 6 0 1 0 3 8v3.1l-1.8 -1.8L0.5 10l3 3 3 -3 -0.7 -0.7L4 11.1V8a5 5 0 1 1 5 5Z" fill="#fff" strokeWidth={0.5} />
              <path d="M0 0h16v16H0Z" fill="none" strokeWidth={0.5} />
            </svg>
          </button>
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 text-center pointer-events-none transition-all bg-gray-900 text-white text-[9px] px-2 py-1 rounded shadow-md z-10">
            Resetear chat
          </span>
        </div>
      </div>
    </div>
  )
}

export default HederChat