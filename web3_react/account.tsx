import { useWeb3React } from "@web3-react/core"
import styles from '../styles/Home.module.css'

export default function Account() {
    const { account } = useWeb3React()
  
    return (
        <div className={styles.flex_between}>
            <span>Account</span>       
            <span>
            {account === null
                ? '-'
                : account
                ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
                : ''}
            </span>
        </div>
    )
  }
  