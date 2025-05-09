import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import {LoginContext,Pages} from '../App.jsx'


function Header(){
    const [username, setUsername] = useContext(LoginContext);
    const [page, setPage] = useContext(Pages);


    return (
        <header className="w-full font-mono border-b-2 bg-white h-24">
            <div className="w-full flex relative items-center justify-between h-full">
                <Link to='/api/connect/home' className="flex relative items-center justify-between h-full">
                    <img src="/Images/OfficialIcon.png" alt = "Logo" className="h-full flex-none"></img>
                </Link>
                <Link to='/api/connect/home' className="absolute mt-2">
                    <span className="absolute -mt-12 ml-28">{"<<<<"}Home</span>
                    <span className="absolute -mt-4 ml-28">{"<<<<"}Home</span>
                    <span className="absolute mt-4 ml-28">{"<<<<"}Home</span>
                </Link>

                <Link to='/api/connect/about' className="absolute mt-2">    
                    <span className="absolute mt-4 ml-[1170px] bg-gray-200 px-2 rounded-md">About</span>
                </Link>
                
                <div className = "flex-col text-center mt-4">
                <h1 className = "text-center text-5xl">Auto Meal Generator</h1>
                <h1 className = "aboslute mt-1 text-sm">Manhattan ver.</h1>
                </div>

                <div className="absolute mt-2">
                    <Link to='/api/connect/login'><span className="absolute -mt-12 ml-[1370px]">Login{">>>>"}</span></Link>
                    <Link to='/api/connect/register'><span className="absolute -mt-4 ml-[1344px]">Register{">>>>"}</span></Link>
                    <Link to='/api/connect/login'><span className="absolute mt-4 ml-[1370px]">Login{">>>>"}</span></Link>
                </div>
                <div className="h-full flex aspect-square place-items-center justify-center flex-col">
                    <a href = "/api/connect/login" className="h-1/2 flex">
                        <img  src="/Images/login.png" alt = "Login Icon" className="h-full"></img>
                    </a>
                    <p className="block">{username}</p>
                </div>
                
                {/* <p className = "block aspect-square h-3/4"></p> use for balance auto meal gen */}
            </div>

            
            
            
            {/* <nav className = "flex justify-center w-full bg-white shadow h-1/4">
                <ul className="flex items-center h-full">
                    <li className="list-none inline-block px-5"><Link to = "/api/connect/home">Home</Link></li>
                    <li className="list-none inline-block px-5"><Link to = "/api/connect/talktoai">Talk To AI</Link></li>
                    <li className="list-none inline-block px-5"><Link to = "/api/connect/express">Express</Link></li>
                    <li className="list-none inline-block px-5"><Link to = "/googlemap">Google Map</Link></li>
                    <li className="list-none inline-block px-5"><Link to = "/api/connect/login">Login</Link></li>
                    <li className="list-none inline-block px-5"><Link to = "/api/connect/register">Register</Link></li>
                </ul>
            </nav>
             */}
        </header>

    );
}

export default Header