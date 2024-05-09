//  registered card

import React ,{useState}from "react";
import "./Card.css";
import Popup from "./Popup.jsx";

function Cards_register({ campaign }) {
  const [showmodel,setshowmodel] = useState(false)
  let campaignOwner;
  // Calculate remaining days
  const currentDate = new Date();
  const targetDate = new Date(campaign.date);
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
  campaignOwner=campaign.contractCreator;
  return (
    <div className="card">
      <div>
      <img src="https://images.playground.com/a9334bb245364c8fb38eddcb5d125241.jpeg" alt="Campaign" />
      <h3>{campaign.title}</h3>
      <p>Target Amount: {campaign.amount}</p>
      <p>Target Date: {campaign.date}</p>
      <p>Days Remaining: {remainingDays}</p> 
      <p>Description: {campaign.description}</p>
      </div>
      <div className="button_donate">
      <button className="donate" onClick={()=> {setshowmodel(true)
      // console.log(campaign);
      
      console.log(campaignOwner);
      }
      }>donate</button>
      {showmodel && <Popup campaigndetails={campaignOwner}  onClose={()=> setshowmodel(false)}/>}
      </div>
    </div>
  );
}

export default Cards_register;
