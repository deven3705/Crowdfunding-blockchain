import React, { useState, useEffect } from "react";
import "./Card.css";
import Completed from "./Completed";
import Cards_register from "./Cards_register";
import Popup from "./Popup.jsx";

function Card({ campaign }) {
  const [voter, setVoter] = useState([]);
  const [fromAddress, setFromAddress] = useState('');
  const [showModel, setShowModel] = useState(false);
  let campaignOwner;
  campaignOwner = campaign.contractCreator; // campaign owner

  // To get voter address
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

  // Checking voter limit
  const checkVoters = () => {
    if (campaign.votes >= 2) {
      campaign.isvalid = true;
      console.log(campaign);
    }
  };

  // Voting function
  const voting = () => {
    gettingUserAddress(); // Fetch the latest user address
    if (!voter.includes(fromAddress)) {
      campaign.votes = campaign.votes + 1;
      setVoter([...voter, fromAddress]);
      checkVoters();
    }
  };

  const seeVoters = () => {
    voter.map((voters_list, index) => (
      console.log(`voter ${index} is ${voters_list}`)
    ));
  };

  // Calculate remaining days
  const currentDate = new Date();
  const targetDate = new Date(campaign.targetDate1 * 1000); // Convert Unix timestamp to JavaScript Date object
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return (
    <div className="card">
      <div>
        <img src="https://images.playground.com/a9334bb245364c8fb38eddcb5d125241.jpeg" alt="Campaign" />
        <h3>{campaign.projectName}</h3>
        <p>Target Amount: {campaign.targetAmount}</p>
        <p>Target Date: {targetDate.toDateString()}</p>
        <p>Days Remaining: {remainingDays}</p>
        <p>Description: {campaign.projectDescription}</p>
        <p>votes: {campaign.votes}</p>
      </div>
      <div className="buttons">
        {campaign.isvalid === false && <button className="donate" onClick={seeVoters}>See voters list!</button>}
        {campaign.isvalid === false && <button className="donate" onClick={voting}>Raise vote!</button>}
        {campaign.isvalid === true && (
          <div className="buttons">
            <button
              className="donate"
              onClick={() => {
                setShowModel(true);
                console.log(campaignOwner);
              }}
            >
              Donate
            </button>
            {showModel && <Popup campaigndetails={campaignOwner} onClose={() => setShowModel(false)} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
