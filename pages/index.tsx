import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { BsArrowDownUp } from "react-icons/bs"
import React, { useState } from "react"
import DialogWalletDetailsQuestion from '../component/dialog_wallet_details_question'
import { injected } from '../web3_react/connectors'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useEagerConnect } from '../web3_react/hook'
import { Web3ReactProvider } from '@web3-react/core'
import DialogWalletDetailsInfo from '../component/dialog_wallet_details_info'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function Home() {  
  const RATE = 3
  const [nep, setNEP] = useState('');
  const [busd, setBUSD] = useState('');
  const [show_question, setShowQuestion] = useState(false);
  const [show_info, setShowInfo] = useState(false);

  const context = useWeb3React<Web3Provider>()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])
  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  const handleKeyPressNEP = (e) => {
    let val = 0;
    if(!isNaN(parseFloat(e.target.value))) 
      val = parseFloat(e.target.value) * 3;    
    setNEP(e.target.value);
    setBUSD(val.toFixed(2));
  } 
  const handleKeyPressBUSD = (e) => {    
    let val = 0;
    if(!isNaN(parseFloat(e.target.value))) 
      val = parseFloat(e.target.value) / 3;    
    setBUSD(e.target.value);
    setNEP(val.toFixed(2));
  }  
  const onClickWalletDetails = (e) => { 
    // setShowQuestion(true);
    const currentConnector = injected;    
    const connected = currentConnector === connector    
    if(!connected){
      setShowQuestion(true);
    }else{
      setShowInfo(true);
    }
  }
  const handleCloseQuestion = (e) => { 
    setShowQuestion(false);
    setShowInfo(false);
  }
  const handleConnect = (e) => {
    const currentConnector = injected;
    // const activating = currentConnector === activatingConnector
    const connected = currentConnector === connector
    // const disabled = !triedEager || !!activatingConnector || connected || !!error    
    if(!connected){
      // setActivatingConnector(currentConnector)
      activate(injected)
    }
    setShowInfo(true)
    setShowQuestion(false)
  }
  const handleDisconnect = (e) => {    
    deactivate()
    handleCloseQuestion(e)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>NEPTUNE MUTAL</title>
        <meta name="description" content="NEPTUNE MUTAL TEST" />
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <main className={styles.main}>        
        <h1 className={styles.title}>NEPTUNE MUTAL</h1>
        <div className={styles.card}>
          <h2>Crypto converter </h2>
          <label htmlFor="NEP" className={styles.form_label}>NEP</label>
          <input id="NEP" name="NEP" type="number" className={styles.form_input} onChange={handleKeyPressNEP} value={nep}/>
          <div className={styles.form_icon}><BsArrowDownUp/></div>
          <label htmlFor="BUSD" className={styles.form_label}>BUSD</label>
          <input id="BUSD" name="BUSD" type="number" className={styles.form_input} onChange={handleKeyPressBUSD} value={busd}/>
          <a className={styles.form_btn} onClick={onClickWalletDetails}>Check Wallet Details</a>
        </div>
      </main>
      <DialogWalletDetailsQuestion show={show_question} handleClose={handleCloseQuestion} handleConnect={handleConnect}/>
      <DialogWalletDetailsInfo show={show_info} handleClose={handleCloseQuestion} handleDisconnect={handleDisconnect}/>41
    </div>
  )
}


export default function() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Home />
    </Web3ReactProvider>
  )
}