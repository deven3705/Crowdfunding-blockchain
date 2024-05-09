import React, { useState, useEffect } from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './Footer.css'; // Import the CSS file
const ethers = require('ethers');

function Footer() {
  const [fromAddress, setFromAddress] = useState('');
  const [message, setMessage] = useState('');
  const [crowdfundingText, setCrowdfundingText] = useState('');
  
  const gettingUserAddress = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({ method: "eth_requestAccounts" });
        accountChangeHandler(res[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Install MetaMask extension!!");
    }
  };

  useEffect(() => {
    gettingUserAddress();
  }, []);

  const accountChangeHandler = (account) => {
    setFromAddress(account);
  };

  const contractInteraction = async () => {

    

    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0x6eb3228e1ce5aee614f82aff4a1b016fff4fed5c";
      const walletAbi =[
        {
          "inputs": [],
          "name": "getMessage",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getUser",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_user",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "_message",
              "type": "string"
            }
          ],
          "name": "send",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]; // Your ABI definition here

      const walletContract = new ethers.Contract(
        contractAddress,
        walletAbi,
        signer
      );

      try {
        // Send message to the smart contract
        console.log(fromAddress, message);

         const sender=await walletContract.send(fromAddress, message);
        console.log("contract message :", sender);
        // Retrieve message from the smart contract
        // const getMessage = await walletContract.getMessage();
        // console.log("Message from user is ", getMessage.toString());
      } catch (error) {
        console.error("Error interacting with smart contract:", error);
      }
    } else {
      console.error("MetaMask extension not detected.");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    contractInteraction();
  };

  return (
    <div className="container">
      {/* <span className="big-circle"></span> */}
      <img src="img/shape.png" className="square" alt="" />
      <div className="form">
        <div className="contact-info">
          <h3 className="title">Let's get in touch</h3>
          <p className="text">
            {crowdfundingText}
          </p>
          <div className="info">
            
            <p>At MetaFund, we're passionate about supporting innovative projects and empowering creators like you. Our crowdfunding platform provides a collaborative space where visionaries can turn their ideas into reality with the help of our vibrant community. </p>
          </div>
          <div className="social-media">
            <p>Connect with us :</p>
            <div className="social-icons">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>
          <form onSubmit={handleFormSubmit} autoComplete="off">
            <h3 className="title">Contact us</h3>
            <div className="input-container textarea">
              <textarea 
                placeholder="Message" 
                className="input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <span>Message</span>
            </div>
            <input type="submit" value="Send" className="btn_footer" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Footer;
