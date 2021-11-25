import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import Account from "../web3_react/account";
import Balance from "../web3_react/balance";
import BlockNumber from "../web3_react/blocknumber";
import ChainId from "../web3_react/chainid";

export default function DialogWalletDetailsInfo({show, handleClose, handleDisconnect}) {  

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Wallet details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Account/>
        <ChainId/>
        <Balance/>
        <BlockNumber/>
      </Modal.Body>      
      <Modal.Footer>      
        <Button variant="danger" onClick={handleDisconnect}>
          Disconnect
        </Button>        
      </Modal.Footer>
    </Modal>
  );
}
