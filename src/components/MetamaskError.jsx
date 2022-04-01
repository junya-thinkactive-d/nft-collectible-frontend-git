import React from 'react'

const MetamaskError = () => {
  return (
    <div className='fixed top-0 left-0 w-screen h-20 bg-opacity-50 bg-red-400 flex justify-center items-center'>
      <div className='text-white text-2xl'>
        Please connect to Polygon Testnet from Metamask!
      </div>
    </div>
  )
}

export default MetamaskError
