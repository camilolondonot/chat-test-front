import React from 'react'
import BootEva from '../../../../assets/img/brand/eva_boot.webp'

const HederChat = () => {
  return (
    <div className='bg-teal-600 pointer-events-none relative w-full rounded-t-md px-4 py-2 flex justify-between items-center'>
      <img className='w-28  h-auto object-contain aspect-square absolute left-[-50px] top-[-60px]  drop-shadow-lg' src={BootEva} alt="" />
      <h4 className='font-bold ms-10 text-lg text-white'>Chat Pocki</h4>
      <div className="online flex items-center gap-3">
        <small className='text-white'>Online</small>
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
        </span>
      </div>
    </div>
  )
}

export default HederChat