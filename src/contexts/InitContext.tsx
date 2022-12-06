import React, { createContext, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/App.module.css'
import LogoImage from '../../public/logo.png'
import { AccountModal } from '../components/account/AccountModal'
import { WalletAccount } from '../wallets/types'
import { Connection } from '../components/connection/Connection'
import { useApi } from './ApiContext'

type Props = {
   children: React.ReactNode
}

type ContextType = {
   isConnected: boolean
   isNftOwner: boolean
   account: WalletAccount
   setAccount: (account: WalletAccount) => void
}

export const AccountContext = createContext<ContextType>({
   isConnected: false,
   isNftOwner: false,
   account: {} as WalletAccount,
   setAccount: {} as React.Dispatch<React.SetStateAction<WalletAccount>>,
})

const dummyHasNft = () => {
   return true
}

export const InitProvider = ({ children }: Props) => {
   const [account, setAccount] = useState<WalletAccount>({} as WalletAccount)
   const isConnected = account != undefined && JSON.stringify(account) != '{}'
   const [isNftOwner, setNftOwner] = useState(false)
   const { isApiReady } = useApi()

   useEffect(() => {
      if (isConnected) {
         setNftOwner(dummyHasNft())
      }
   }, [isConnected])

   return (
      <AccountContext.Provider
         value={{ isConnected, isNftOwner, account, setAccount }}
      >
         <Image
            priority
            src={LogoImage}
            alt="Graphenet Logo"
            className={styles.logo}
         />
         <Connection isOpen={!isApiReady} />
         {children}
      </AccountContext.Provider>
   )
}

export function useAccount() {
   return useContext(AccountContext)
}
