import React from "react";
import backgroundImg from '../bg.png'
import { Link } from 'react-router-dom';


export default function UserProfile() {
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
            <div className="mt-4 p-6 bg-white border border-gray-300 rounded-md shadow-md w-96">
                <div className="flex flex-col space-y-2">
                <div className="text-gray-700">
                    <p className="font-semibold">Name:</p>
                    <p>Your Name</p>
                </div>
                <div className="text-gray-700">
                    <p className="font-semibold">Ethereum Address:</p>
                    <p>Your Ethereum Address</p>
                </div>
                <div className="text-gray-700">
                    <p className="font-semibold">ENS:</p>
                    <p>Your ENS</p>
                </div>
                <div className="text-gray-700">
                    <p className="font-semibold">Wallet Balance:</p>
                    <p>Your Wallet Balance</p>
                </div>
                </div>
            </div>
        </div>


    );
    }