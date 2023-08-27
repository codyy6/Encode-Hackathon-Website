import React from "react";
import backgroundImg from '../bg.png'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import { BrowserProvider } from 'ethers';

export default function UserProfile() {

    const [ensName, setEnsName] = useState(""); // State to hold the ENS name
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(0);

    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(address);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    };

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
                    <div className="flex items-center">
                        <p>
                            <a href={`https://etherscan.io/address/${address}`}>
                                {address}
                            </a>
                        </p>
                        <button className={`ml-2 py-1 px-2 rounded flex items-center ${isCopied ? 'bg-green-500' : 'bg-gray-300 hover:bg-gray-500'} text-black`} onClick={copyToClipboard}>
                            {isCopied ? 'Copied!' : 'Copy'}
                            <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="text-gray-700">
                    <p className="font-semibold">ENS:</p>
                    <p>
                        {ensName ? (
                            <a href={`https://etherscan.io/name-lookup-search?id=${ensName}`}>
                                {ensName}
                            </a>
                        ) : (
                            "N/A"
                        )}
                    </p>
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