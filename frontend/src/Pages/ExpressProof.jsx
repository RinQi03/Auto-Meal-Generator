import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Temp() {
    const [count, setCount] = useState(0);
    const [array,setArray] = useState([]);
    const backendURL = "http://"+import.meta.env.VITE_BACKEND_DOMAIN+":"+import.meta.env.VITE_BACKEND_PORT+"/api/connect"
    console.log("backendURL: "+backendURL)
  
    const fetchAPI = async () =>{
      const response = await axios.get((backendURL+"/express").toString()); //const response = await axios.get(backendURL+"/home"); 
      setArray(response.data["users"]);
      console.log(response.data["users"]);
      console.log("arrays:",array);
    };
  
    useEffect(()=>{
      fetchAPI();
    },[])


    return(
        <>
        <h2>Proof of connecting to Express</h2>
        {
          array.map ((user, index) => (
            <div key = {index}>
              <p>{user}</p>
            </div>
          ))
        }
        <embed src="https://www.bilibili.com/" className='w-1/2'></embed>
        </>
    );
}

export default Temp;