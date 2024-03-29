import React, { createContext, useContext, useState } from 'react'
import Image from 'next/image'
import styles from '../../styles/App.module.css'
import LogoImage from '../../../public/logo.png'
import { WalletAccount } from '../../model/wallet'

type Props = {
    children: React.ReactNode
}

type ContextType = {
    isConnected: boolean
    account: WalletAccount
    setAccount: (account: WalletAccount) => void
}

export const AccountContext = createContext<ContextType>({
    isConnected: false,
    account: {} as WalletAccount,
    setAccount: {} as React.Dispatch<React.SetStateAction<WalletAccount>>,
})

export const InitProvider = ({ children }: Props) => {
    const [account, setAccount] = useState<WalletAccount>({} as WalletAccount)
    const isConnected = account != undefined && JSON.stringify(account) != '{}'

    return (
        <AccountContext.Provider value={{ isConnected, account, setAccount }}>
            <Image
                priority
                src={LogoImage}
                alt="Graphenet Logo"
                className={styles.logo}
            />
            {children}
        </AccountContext.Provider>
    )
}

export function useAccount() {
    return useContext(AccountContext)
}
