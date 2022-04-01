import React from 'react'

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 bg-opacity-50 bg-black w-screen h-screen flex flex-col items-center justify-center'>
        <div className='animate-spin h-20 w-20 border-8 border-red-600 rounded-full border-t-transparent'></div>
        <div className='text-white text-2xl'>Loading...</div>
    </div>
  )
}

export default Loading
