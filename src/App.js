import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
// import { ethers } from 'ethers';
const ethers = require("ethers")

function App() {
    const [radhaContract, setRadhaContract] = useState(null);
    useEffect(()=>{
        const radhaContractAddress = "0x0E0CfFAC8039E5E2f859e68C4912ED7547bA5D76";
const radhaContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_tiffin",
				"type": "string"
			}
		],
		"name": "setFav",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFav",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];async function initializeRadhaContract() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
      await provider.send("eth_requestAccounts", []);
      const accounts = await provider.listAccounts();
      const signer = provider.getSigner(accounts[0]);
      const radhaContract = new ethers.Contract(
        radhaContractAddress, // Replace with your actual contract address
        radhaContractABI,     // Replace with your actual contract ABI
        signer
      );
      setRadhaContract(radhaContract);
    } catch (error) {
      console.error("Error initializing Radha contract:", error);
    }
  }

  initializeRadhaContract();
}, []);


  const [favTiffin, setFavTiffin] = useState('');
  const [tiffin,setTiffin] =useState('');
  const getFav =async ()=>{
    try{
      const fav = await radhaContract.getFav();
      setFavTiffin(fav);
      console.log(fav)
    }
    catch(err){
      console.log(err)
    }

  }
  const onchange=(e)=>{
    setTiffin(e.target.value)
  }
  const changeTiffin=async ()=>{
    await radhaContract.setFav(tiffin);
  }
  return (
    <div className="App">
        
          Learn React
          <form>
            
            <button onClick={getFav}>getfav</button>
            <p>your fav tiffin is {favTiffin}</p>
            {/* //////////////////// */}
            <input type="text" id="fav" value={tiffin} onChange={onchange}/>
            <button onClick={changeTiffin}>setfav</button>
          </form>
      
    </div>
  );
}

export default App;
