import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {LoginContext} from '../App.jsx'

function Register() {
    const listenURL = "http://"+import.meta.env.VITE_BACKEND_DOMAIN+":"+import.meta.env.VITE_BACKEND_PORT+"/api/connect"

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loginContext, setLoginContext] = useContext(LoginContext);
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState("")
    const navigate = useNavigate();
    
  
    function handleForm (event){
        event.preventDefault();
        let input = {
            username: username,
            email : email,
            password: password
        }
        fetch((listenURL+"/register").toString(),{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body:JSON.stringify (input)
        }).then(response => response.json())
        .then(data=>{
            console.log("res",data);
            if (data["message"]===undefined){
                setIsRegistered(true);
                setError("")
                console.log("set true")
                setTimeout(() => {
                    setIsRegistered(false);
                    navigate('/api/connect/home')
                    console.log("Success message hidden.");
                }, 1000);
            }else{
                console.log("errorMessage", data["message"]);
                setError(data["message"]);
            }
            setLoginContext(data["currentUser"]);
            // setTextareaValue(res);
        })
        // console.log(email);
        // console.log(password);
    }



    return(
        <>
        <div className='flex justify-center items-center h-3/4 bg-zinc-50 '>
            <div className='flex flex-col justify-center items-center h-4/6 w-2/4 mb-10 bg-zinc-50 rounded-xl shadow-red-600 shadow'>
                <div className='h-16'></div>
                <h1 className='text-4xl text-black font-bold text-center mb-6'>Register</h1>
                <form onSubmit={handleForm} className='justify-between'>
                    <div className='relative my-4 '>
                        <input type="text" placeholder = "Username" onChange = {e => setUsername(e.target.value)} className='pl-2 black w-60 py-2.3 text-sm bg-transparent border-0 border-b-2 border-gray-900 appearance-none' ></input>
                    </div>
                    <div className='relative my-4 '>
                        <input type="email" placeholder = "Email" onChange = {e => setEmail(e.target.value)} className='pl-2 black w-60 py-2.3 text-sm bg-transparent border-0 border-b-2 border-gray-900 appearance-none' ></input>
                    </div>
                    <div className='relative my-4'>
                        <input type="text" placeholder = "Password" onChange = {e => setPassword(e.target.value)} className='pl-2 black w-60 py-2.3 text-sm bg-transparent border-0 border-b-2 border-gray-900 appearance-none' ></input>
                    </div>
                        <button type = "submit" className='flex w-auto px-5 mx-auto mb-6 mt-7 items-center justify-center border-2 border-black rounded-md hover:bg-red-200'>Sign Up</button>
                </form>
                <div className='h-5'></div>
                <div className='flex-row justify-end w-full mb-1'>
                    <span className='flex place-content-end text-sm pr-3 '>Already got an account?  </span>
                    <span className='flex place-content-end text-sm pr-3.5 text-blue-400 hover:text-blue-700'><Link to='/api/connect/login'>Sign In</Link></span>
                </div>
            </div>           
        </div>
        {
            isRegistered &&(
            <div id="successMessage" className='absolute z-10 top-64 justify-center items-center place-content-center h-2/5 w-full bg-red-400 shadow-red-600 shadow' >
                <span className='flex text-9xl italic -mt-8 text-white align-middle justify-center'>Success</span>
                <span className='flex text-xl text-white align-middle justify-center pr-3'>Live as a food randomist!</span>
            </div>
            )
        }
        {
            error && (
            <div id="errorMessage" className='absolute z-10 top-80 mt-5 justify-center items-center w-full place-content-center' >
                <span className='flex text-sm text-red-500 align-middle justify-center mt-2'>{error? error:"Registration Error"}</span>
            </div>
            )
        }
        
        </>
    );
}

export default Register;