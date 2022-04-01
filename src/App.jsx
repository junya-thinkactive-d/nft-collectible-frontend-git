import { useEffect, useState } from 'react'
import contract from './contracts/NFTCollectible.json'
import { ethers } from 'ethers'
import {
  ConnectWalletButton,
  Loading,
  MetamaskError,
  MintNftButton,
} from './components'
import background from './images/background_image.png'

const contractAddress = '0x7d6Db0C293163E46Ab6eD0f89D41CA7728Ce3feD'
const abi = contract.abi

const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [metamaskError, setMetamaskError] = useState(true)
  const [loading, setLoading] = useState(false)
  const [readyWallet, setReadyWallet] = useState(false)
  const [purchaseQuantity,setPurchaseQuantity] = useState(0)

  const checkWalletIsConnected = async () => {
    const { ethereum } = window

    if (!ethereum) {
      console.log('Make sure you have MetaMask installed!')
      return
    } else {
      setReadyWallet(true)
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })
    const network = await ethereum.request({ method: 'eth_chainId' })

    if (accounts.length !== 0 && network.toSting() === '0x13881') {
      const account = accounts[0]
      console.log('Found an authorized account: ', account)
      setMetamaskError(false)
      setCurrentAccount(account)
    } else {
      setMetamaskError(true)
      console.log('No authorized account found')
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window

    if (!ethereum) {
      alert('Please install Metamask!')
    }

    try {
      const network = await ethereum.request({ method: 'eth_chainId' })

      if (network.toString() === '0x13881') {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })
        console.log('Found an account! Address: ', accounts[0])
        setMetamaskError(null)
        setCurrentAccount(accounts[0])
      } else {
        setMetamaskError(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const mintNftHandler = async () => {
    setLoading(true)
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const nftContract = new ethers.Contract(contractAddress, abi, signer)

        console.log('Initialize payment')

        let nftTxn = await nftContract.mintNFTs(purchaseQuantity, {
          value: ethers.utils.parseEther('0.01'),
        })

        console.log('Mining... please wait')
        await nftTxn.wait()
        console.log(`Mined, see transaction: ${nftTxn.hash}`)
        setLoading(false)
      } else {
        console.log('Ethereum object does not exist')
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    checkWalletIsConnected()
  }, [])

  return (
    <>
      {metamaskError && <MetamaskError />}
      <div
        className='bg-stone-800 w-screen h-screen flex flex-col justify-center items-center bg-no-repeat bg-cover'
        style={{ backgroundImage: `url(${background})` }}
      >
        <h1 className='text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
          Scrappy Squirrels Tutorial
        </h1>
        <div className='my-12 flex justify-center items-center'>
          <img
            className='w-1/2'
            src={`${window.location.origin}/rinkeby_squirrels.gif`}
            alt=''
          />
        </div>
        <div>
          {!readyWallet ? (
            <div className='text-lg text-white bg-stone-800 font-bold w-screen h-12'>
              Get Metamask!
            </div>
          ) : currentAccount ? (
            <MintNftButton handler={mintNftHandler} purchaseQuantity={purchaseQuantity} setPurchaseQuantity={setPurchaseQuantity} />
          ) : (
            <ConnectWalletButton handler={connectWalletHandler} />
          )}
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='mt-4 text-white'>Your address being connected:</div>
          <div className='text-orange-400'>{currentAccount ? currentAccount : ''}</div>
        </div>
        <div>{loading && <Loading />}</div>
      </div>
    </>
  )
}

export default App
