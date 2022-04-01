import React from 'react'

const ConnectWalletButton = ({handler}) => {
  return (
    <button
      onClick={handler}
      className='text-lg text-stone-800 font-bold w-48 h-12 bg-gradient-to-br from-teal-600 to-sky-400 rounded-lg'
    >
      Connect Wallet
    </button>
  )
}

export default ConnectWalletButton
