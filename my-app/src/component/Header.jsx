import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
// import { LogIn } from 'lucide-react';
import { useAuth0 } from "@auth0/auth0-react";
const ethers = require('ethers');

let userAddress1;

function Header() {
    const [userAddress, setUserAddress] = useState('');
    const [balance, setBalance] = useState('');
    const [connected, setConnected] = useState(false);
    const [login, setlogin]=  useState(false);
    const [signup, setsignup]=  useState(false);
    const { user,loginWithRedirect , isAuthenticated , logout} = useAuth0();


    console.log("user is :",user);

    useEffect(() => {
        if (userAddress !== '') {
            setConnected(true);
        } else {
            setConnected(false);
            setBalance(''); // Reset balance when user disconnects wallet
        }
    }, [userAddress]);

    const btnhandler = () => {
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

    const getBalance = async (address) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(address);
            setBalance(ethers.utils.formatEther(balance));
        } catch (error) {
            console.error("Error fetching balance:", error);
            // Handle error here
        }
    };

    const accountChangeHandler = (account) => {
        setUserAddress(account);
        getBalance(account);
    };

    userAddress1=userAddress;
    return (
        <nav className="nav">
            <div className="logo-container">
                <img src="https://images.squarespace-cdn.com/content/v1/6421d8c93c39ef33b83a2587/3d104c26-9a8d-4b1e-89b7-b878af7c540a/FullLogo-Horizontal-FullColor_Blue_Gray_RGB.png" alt="logo" />
            </div>
            <div className="links">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to="/Completed">contact us</Link></li>
                    <li>Balance: {balance}</li>
                    <li>Address: {userAddress}</li>
                </ul>
            </div>
            <div className='buttoncontainer'>
            <div className="join-button" onClick={btnhandler}>
                {connected ? 'Connected' : 'Connect Wallet'}
                {/* <Link to="/join" className="btn-join"></Link> */}
            </div>
            {isAuthenticated ? (<button onClick={ ()=>logout()}>logout</button>):(

                    <div className='join-button'  onClick={(e) => loginWithRedirect()}>login</div>
            )}
            
            </div>
        </nav>
    );
}

export {userAddress1};
export default Header;
