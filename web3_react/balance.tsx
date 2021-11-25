import { formatEther } from "@ethersproject/units"
import { useWeb3React } from "@web3-react/core"
import React from "react"
import styles from '../styles/Home.module.css'

export default function Balance() {
    const { account, library, chainId } = useWeb3React()
  
    const [balance, setBalance] = React.useState()
    React.useEffect((): any => {
      if (!!account && !!library) {
        let stale = false
  
        library
          .getBalance(account)
          .then((balance: any) => {
            if (!stale) {
              setBalance(balance)
            }
          })
          .catch(() => {
            if (!stale) {
              setBalance(null)
            }
          })
  
        return () => {
          stale = true
          setBalance(undefined)
        }
      }
    }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds
  
    return (
      <div className={styles.flex_between}>
        <span>Balance</span>                
        <span>{balance === null ? 'Error' : balance ? `Ξ${formatEther(balance)}` : ''}</span>        
      </div>
    )
  }
  