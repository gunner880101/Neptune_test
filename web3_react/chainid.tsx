import { useWeb3React } from '@web3-react/core'
import styles from '../styles/Home.module.css'
export default function ChainId() {
    const { chainId } = useWeb3React()
  
    return (
        <div className={styles.flex_between}>
            <span>Chain Id</span>        
            <span>{chainId ?? ''}</span>
        </div>
    )
  }
  