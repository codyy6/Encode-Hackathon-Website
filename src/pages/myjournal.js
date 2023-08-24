import '../App.css';
import { Link } from 'react-router-dom';
import backgroundImg from '../bg.png';
import { useState } from 'react';

export default function MyJournal(){

    const [showNewJournalBlock, setShowNewJournalBlock] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleNewJournalBlock = () => {
        setShowNewJournalBlock(!showNewJournalBlock);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="bg-cover bg-center min-h-screen" style={{backgroundImage: `url(${backgroundImg})`}}>
            <div className="flex items-center justify-between mx-10 py-4">
                <h1 className="text-gray-600 text-3xl py-6"> My Journal </h1>
                <div className="flex">
                    <button className="bg-gray-200 bg-opacity-50 text-gray-800 text-2xl font-normal py-2 px-4 rounded-md" onClick={toggleNewJournalBlock}>
                    + New Journal
                    </button>
                    <button className="bg-gray-200 bg-opacity-50 text-gray-800 text-2xl font-normal py-2 px-4 mx-4 rounded-md" onClick={toggleDropdown}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                    </button>
                </div>
            </div>
            {showNewJournalBlock && (
                <div className="ml-10 mr-32 mt-4 p-4 border border-gray-300 rounded-md">
                    {/* Here you can place the elements for writing the new journal entry */}
                    <input className="w-full h-10 p-2 border border-gray-300 rounded-md mb-2" placeholder="Title"></input>
                    <textarea className="w-full h-40 p-2 border border-gray-300 rounded-md" placeholder="Write your journal entry..."></textarea>
                    <button className="mt-2 bg-blue-400 hover:bg-blue-700 text-white text-lg font-normal py-2 px-4 rounded-md"> Save</button>
                </div>
            )}
            {showDropdown && (
                <div className="fixed top-20 right-10 mx-4 my-4 bg-gray-300 rounded-md shadow-lg">
                    <ul>
                        <li className="px-4 py-2"> 
                            <button> Profile </button>
                        </li>
                        <Link to="/">
                            <li className="px-4 py-2"> 
                                <button> Sign Out </button>
                            </li>
                        </Link>
                    </ul>
                </div>
            )}
        </div>
    );
    
}



