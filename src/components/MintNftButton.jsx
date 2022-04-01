import React from 'react'

const MintNftButton = ({ handler, purchaseQuantity, setPurchaseQuantity }) => {
  const incremnetQuantity = () => {
    purchaseQuantity < 3 && setPurchaseQuantity(purchaseQuantity + 1)
  }
  const decrementQuantity = () => {
    purchaseQuantity > 0 && setPurchaseQuantity(purchaseQuantity - 1)
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='text-white'>purchasing quantity</div>
      <div className='flex justify-center items-center my-2'>
        <button
          className='w-6 h-6 bg-stone-400 border rounded-sm border-orange-400 shadow-sm'
          onClick={decrementQuantity}
        >
          -
        </button>

        <div className='mx-4 flex justify-center items-center bg-white w-8 h-8 rounded-lg'>
          <div>{purchaseQuantity}</div>
        </div>
        <button
          className='w-6 h-6 bg-stone-400 border border-orange-400 rounded-sm shadow-sm'
          onClick={incremnetQuantity}
        >
          +
        </button>
      </div>
      <div className='px-2 py-1 bg-white rounded-sm'>
        {purchaseQuantity * 0.01} ETH
      </div>
      <button
        onClick={handler}
        className='mt-12 text-lg text-stone-800 font-bold w-48 h-12 bg-gradient-to-br from-red-600  to-orange-400 rounded-lg'
      >
        Mint NFT
      </button>
    </div>
  )
}

export default MintNftButton
