import React, { useEffect, useState } from 'react';
import axios from 'axios';

function About() {
    const [restNum, setRestNum] = useState(0);
    const [recipeNum, setRecipeNum] = useState(0);
    const [userNum, setUserNum] = useState(0);
    const [stats,setStats] = useState({});


    const backendURL = "http://"+import.meta.env.VITE_BACKEND_DOMAIN+":"+import.meta.env.VITE_BACKEND_PORT+"/api/connect"
    console.log("backendURL: "+backendURL)
  
    const fetchAPI = async () =>{
        const response = await axios.get((backendURL+"/about").toString()); //const response = await axios.get(backendURL+"/home"); 
        console.log(response.data["stats"]);
        setStats(response.data["stats"]);
        setRestNum(stats.restNum)
        setRecipeNum(stats.recipeNum)
        setUserNum(stats.userNum)

        console.log("restNum",  restNum);
        console.log("recipeNum",  recipeNum);
        console.log("userNum",  userNum);



    //   console.log("arrays:",array);
    };
  
    useEffect(()=>{
      fetchAPI();
    },[])


    return(
        <>
        <div className="flex-col h-5/6 bg-red-400 text-white p-32">
            <h2 className='text-8xl '>About</h2>

            <h2 className='text-4xl mt-4'>Our website now have {stats["restNum"]} restaurants in file</h2>
            <h2 className='text-4xl mt-4'>Our website now have {stats["recipeNum"]} recipes in file</h2>
            <h2 className='text-4xl mt-4'>Our website now have {stats["userNum"]} users</h2>
        
        </div>
        </>
    );
}

export default About;