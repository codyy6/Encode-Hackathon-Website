import React from "react";
import backgroundImg from '../bg.png'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import { BrowserProvider } from 'ethers';

export default function UserProfile() {

    const [ensName, setEnsName] = useState(""); // State to hold the ENS name
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(0);

    //Get user ETH balance from Etherscan API
    async function fetchBalance(address) { 
        return fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=U4KI4B9YBDRBS8QHF1WH2GE13TC248GJUU`) 
                .then((res) => res.json()) 
                .then((d) => setBalance(d)) 
        }

    useEffect(() => {
        // Perform this effect when the component mounts
        getInformation();
    }, []);

    async function getInformation() {
        const res = await fetch(`http://localhost:3000/personal_information`, {
            credentials: 'include',
        });

        if (!res.ok) {
            console.error(`Failed in getInformation: ${res.statusText}`);
            return;
        }

        let result = await res.text();
        console.log(result);
        const address = result.split(" ")[result.split(" ").length - 1];
        setAddress(address)

        // Now that you have the address, you can call displayENSProfile
        displayENSProfile(address);
        fetchBalance(address);
    }

    async function displayENSProfile(address) {
        const provider = new BrowserProvider(window.ethereum);
        const ensName = await provider.lookupAddress(address);
        console.log(ensName);
        setEnsName(ensName); // Update the state with the ENS name
    }

    return (
        <div className="bg-cover bg-center min-h-screen flex flex-col items-center" style={{backgroundImage: `url(${backgroundImg})`}}>
            <div className="absolute top-4 left-10 py-4">
                <Link to="/myjournal">
                    <button className="bg-gray-200 bg-opacity-50 text-gray-800 hover:bg-gray-300 text-sm font-semibold py-2 px-4 rounded">
                        &lt;-- Go Back
                    </button>
                </Link>
            </div>
            <h1 className="text-gray-600 text-3xl py-6"> User Profile </h1>
            <div className="mt-4 p-6 bg-white border border-gray-300 rounded-md shadow-md w-2/5">
                <div className="flex flex-col space-y-2">
                <div className="text-gray-700">
                    <p className="font-semibold">Ethereum Address:</p>
                    <p>{address}</p>
                </div>
                <div className="text-gray-700">
                    <p className="font-semibold">ENS:</p>
                    <p>{ensName || "N/A"}</p>
                </div>
                <div className="text-gray-700">
                    <p className="font-semibold">Wallet Balance:</p>
                    <p>{balance != 0 ? balance.result.substring(0,3)/10000 : 0} ETH</p>
                </div>
                </div>
            </div>
        </div>


    );
    }