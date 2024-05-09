import React, { useState,useRef, useEffect } from "react";
import Card from "./Card";
import Cards_register from "./Cards_register"
import "./Home.css";
import { userAddress1 } from "./Header";
const ethers=require('ethers');

function Home() {




  // console.log("userAddress1", userAddress1);
  const [campaigns, setCampaigns] = useState([]);
  const [deadline, setDeadline] = useState(null);
  const [numberOfCampaigns, setNumberOfCampaigns] = useState(0);
  const [amountRaised,setamountRaised]=useState(0);
  const [amount, setAmount] = useState('');
  // const [isvalid, setisvalid]=useState(false);
  let done=false;
  const [validcampaigns_id, setvalidcampaigns_id]= useState([]);
  const [votes, setvotes]=useState(0);
  const [count, setcount]=useState(0);
  const target=50;


  // address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    const currentDate = new Date();
    const targetDate = new Date(formValues.date);
    const unixTargetDate = Math.floor(targetDate.getTime() / 1000); // Convert to Unix timestamp
  
    if (targetDate < currentDate) {
      alert("Please select a future date for the campaign target date.");
      return;
    }
  
    let newCampaign = {
      contractCreator: userAddress1,
      daysLeft: calculateDaysLeft(formValues.date),
      projectName: formValues.title,
      projectDescription: formValues.description,
      targetAmount: formValues.amount,
      amountRaised: 0,
      targetDate1: unixTargetDate, // Set the target date as a Unix timestamp
      isvalid: done,
      votes: 0,
    };
  
    setCampaigns([...campaigns, newCampaign]);
    setDeadline(targetDate);
    event.target.reset();
  };
  

  const calculateDaysLeft = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const differenceInTime = target.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

   // const [showForm, setShowForm] = useState(false); // State to control form visibility

  //  scrolling behaviour

  const hero2Ref = useRef(null);
  
  const scrollToHero2 = () => {
    hero2Ref.current.scrollIntoView({ behavior: "smooth" }); // Scroll to hero2 section
  };

  const register = useRef(null);
 
  const registerCampaign = () => {
    register.current.scrollIntoView({ behavior: "smooth" }); // Scroll to register campaigns section
  };

  const pending= useRef(null)
  const pendingCampaign = () => {
    pending.current.scrollIntoView({ behavior:"smooth" }); // Scroll to pending campaigns section
  };

  

  

  //  to check whether campaign has completed votes or not

  // useEffect(() => {
  //     for (let i = 0; i < campaigns.length; i++) {
        
  //       if(campaigns[i].votes>=1){                  // if votes is greater than or equal to 1

  //         setvalidcampaigns_id=i;                 // taking campaigns whose votes are done 
  //         campaigns[i].isvalid=true;              // set their validattion == true

  //       }
        
  //     }
  // },[]);

  // contract creation code 
  const contractIntreaction = async () => {


    // Check if the input value is greater than or equal to 1
   


    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0x9e065465af786e52efc91ae6ec984ac67b26e336";
      const walletAbi =[
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "campaigns",
          "outputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "target",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountCollected",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "votes",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "success",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "_title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "_target",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_deadline",
              "type": "uint256"
            }
          ],
          "name": "createCampaign",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            }
          ],
          "name": "donateToCampaign",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            }
          ],
          "name": "getDonators",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
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
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            }
          ],
          "name": "getdetails",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            }
          ],
          "name": "isvalid",
          "outputs": [
            {
              "internalType": "bool",
              "name": "_isvalid",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "message",
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
          "name": "numberOfCampaigns",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
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
        },
        {
          "inputs": [],
          "name": "user",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]// Your ABI definition here
  
      try {
        if (campaigns.length >= 0) {
          const walletContract = new ethers.Contract(
            contractAddress,
            walletAbi,
            signer
          );
  
          // Call contract functions or interact with it as needed
          const transaction = await walletContract.createCampaign(
            userAddress1,
            "hello",
            "food",
            45,
            2
          ); // address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline
          await transaction.wait();
          const receipt = await provider.getTransactionReceipt(transaction.hash);
          console.log("Setter response:", receipt);
        } else {
          console.error("No campaigns created.");
        }
      } catch (err) {
        console.error("Error interacting with contract:", err);
      }
    } else {
      console.error("MetaMask extension not detected.");
    }
    
  };
  

  return (
    <>
      <div className="hero">
        <section className="boxes"> 
          <div className="intro-text">
            <div className="heading-text">
              <h1 className="title">
                <span className="gradient">Welcome to Crowdfund3 </span>
                <div className="selection">
                  Free crowdfunding for India
                </div>
               
              </h1>
              <p className="subtitle ">
                Crowdfund3 is not just another crowdfunding platform;
                it's a revolution in how projects get funded. Powered
                by Web3 technology, Crowdfund3 leverages the decentralized
                nature of blockchain to provide a transparent, secure, and
                community-driven platform for creators and backers alike.
              </p>
              
                <div className="hero1buttons">
                <button className="raiseFund" onClick={scrollToHero2}>Raise Fund - its free</button>
                {/* <button className="raiseFund" onClick={registerCampaign}>Registered campaigns</button> */}
                <button className="raiseFund" onClick={pendingCampaign}>explore campaigns</button>
                </div>
                

              
            </div>
            <div className="hero1image">
              <img src="https://img.freepik.com/premium-vector/crowdfunding-isolated-cartoon-vector-illustrations_107173-22564.jpg" alt="hero1image" />
            </div>
            
          </div>
        </section>
        <div className="nofee" id="form-section">
          <h2 className="nofee-text">Our crowdfunding platform charges NO fees<p className="zero">0%</p></h2>
        </div>
      </div>
      <div className="hero2" ref={hero2Ref}>
        
          <div className="forms">
            <h2>Campaign</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" placeholder="Enter title" required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" placeholder="Enter description" required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Target Amount:</label>
              <input type="number" id="amount" name="amount" placeholder="Enter target amount" min="1" required />
            </div>
            <div className="form-group">
              <label htmlFor="date">Target Date:</label>
              <input type="date" id="date" name="date" required />
            </div>
            <button type="submit" className="submit_button" onClick={contractIntreaction}>Create campaign</button>
          </form>
          </div>
        </div>

        <div className="cards" ref={pending}>
        <div className="campaignheading"><h1 color="white"> all campaigns</h1>
        <div className="contentcard">
          {campaigns.map((campaign, index) => (
            <Card key={index} campaign={campaign} />
          ))}
          </div>
        </div>
        </div>
        
            
        
    </>
  );
}

export default Home;
