import React, { useEffect, useState } from 'react';
import { X, SendHorizontal } from 'lucide-react';
import './Popup.css';
const ethers = require('ethers');

const Popup = ({ campaigndetails, onClose }) => {               // campaigndetails conataing address of owner of campaign address
  const [campaign_id, setCampaignId] = useState('');
  const [amount, setAmount] = useState('');
  const [fromAddress, setFromAddress] = useState('');

  const sendEther = async (to, from, value) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tx = {
      to: to,
      value: ethers.utils.parseEther(value),
    };
    try {
      const txResponse = await signer.sendTransaction(tx);
      console.log('Transaction sent:', txResponse);
    } catch (error) {
      console.error('Error sending transaction:', error.message);
    }
  };

  const sendFund = async () => {
    const gettingUserAddress = () => {                  // getting user address
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => accountChangeHandler(res[0]))
          .catch((error) => {
            console.error("Error connecting to MetaMask:", error);
            // Handle error here
          });
      } else {
        alert("Install MetaMask extension!!");
      }
    };
    gettingUserAddress();
  };

  const accountChangeHandler = (account) => {
    setFromAddress(account);
    console.log("fromAddress", account); // Log user's address after setting it
    console.log("toAddress", campaigndetails);
    console.log("amount to send:", amount);
    console.log("campaign id:", campaign_id);
    
    // Call sendEther function here passing toAddress, fromAddress, and amount
    sendEther(campaigndetails, fromAddress, amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendFund();
  };

  useEffect(() => {
    // Logic to execute when amount or campaign_id changes
  }, [amount, campaign_id]);

  return (
    <div className='main_popup'>
      <div className='div2'>
        <button onClick={onClose}>
          <X className='close' />
        </button>
        <h1>Donate to campaign</h1>
        <form className='form_popup' onSubmit={handleSubmit}>
          <div>
            <input
              type='number'
              placeholder='campaign id'
              value={campaign_id}
              required
              onChange={(e) => setCampaignId(e.target.value)}
            />
          </div>
          <div>
            <input
              type='number'
              placeholder='Enter amount in ether'
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button type='submit' className='button_donate'>
            Send fund <SendHorizontal />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
