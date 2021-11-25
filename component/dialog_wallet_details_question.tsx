import { useState } from "react";
import { Button, Modal } from 'react-bootstrap';

export default function DialogWalletDetailsQuestion({show, handleClose, handleConnect}) {  

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Wallet details</Modal.Title>
      </Modal.Header>
      <Modal.Body>Wallet not connected. Please click the "Connect" button below.</Modal.Body>
      <Modal.Footer>
      <Button variant="primary" onClick={handleConnect}>
          Connect
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>        
      </Modal.Footer>
    </Modal>
  );
}
