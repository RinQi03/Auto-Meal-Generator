import React, { useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {PrefInfo,SearchResult,LoginContext, Pages} from '../App.jsx'



function divideIntoThree(list) {
  const length = list.length;
  const partSize = Math.ceil(length / 3); // Calculate the size of each part
  return [
    list.slice(0, partSize), // First part
    list.slice(partSize, partSize * 2), // Second part
    list.slice(partSize * 2), // Third part
  ];
}

function Home() {

  const [username, setUsername] = useContext(LoginContext);
  const [isRest, setRest] = useState(true);
  const [prefInfo, setPrefInfo] = useContext(PrefInfo);
  const [result, setResult] = useContext(SearchResult);

  const [select, setSelect] = useState([]);
  const navigate = useNavigate();

  const [cost, setCost] = useState(0);
  // const [page, setPage] = useContext(Pages);
  const [page, setPage] = useState(0)
  const [array,setArray] = useState([]);
  const listenURL = "http://"+import.meta.env.VITE_BACKEND_DOMAIN+":"+import.meta.env.VITE_BACKEND_PORT+"/api/connect"
  // console.log("backendURL: "+backendURL)

  // const fetchAPI = async () =>{
  //   const response = await axios.get((backendURL+"/home").toString()); //const response = await axios.get(backendURL+"/home"); 
  //   setArray(response.data["users"]);
  //   console.log(response.data["users"]);
  //   console.log("arrays:",array);
  // };

  // useEffect(()=>{
  //   fetchAPI();
  // },[])

  function handleSelfCook(event){
    event.preventDefault();
    prefInfo.type = "recipe";
    setRest(false);
    setPage(1);
  }

  function handleRestaurant(event){
    event.preventDefault();
    prefInfo.type = "restaurant";
    setRest(true);
    setPage(1);
  }

  function handleAutoGenerate(event){
    event.preventDefault();
    prefInfo.randomize = true;
    if (isRest){
      let input = prefInfo;
      input.username = username;
      input.cost =0;
      input.ingredients = [];
      input.preference = [];
      input.location = [];
      input.note = "";
      fetch((listenURL+"/home").toString(),{
          method: "POST",
          headers:{
              "Content-Type": "application/json",
          },
          credentials: 'include',
          body:JSON.stringify (input)
      }).then(response => response.json())
      .then(data=>{
          console.log("res",data);
          if (data["message"]===undefined){ //error message
              // setError("")
              console.log(data["RestaurantInfo"])
              setResult(data["RestaurantInfo"]);
              console.log("result",result)
              navigate("/api/connect/restaurant-details");
          }else{
              console.log("errorMessage", data["message"]);
              navigate("/error");
          }
      })

    }else{
      let input = prefInfo;
      input.username = username;
      input.cost =0;
      input.ingredients = [];
      input.preference = [];
      input.location = [];
      input.note = "";
      fetch((listenURL+"/home").toString(),{
          method: "POST",
          headers:{
              "Content-Type": "application/json",
          },
          credentials: 'include',
          body:JSON.stringify (input)
      }).then(response => response.json())
      .then(data=>{
          console.log("res",data);
          if (data["message"]===undefined){ //error message
              // setError("")
              console.log(data["RecipeInfo"])
              setResult(data["RecipeInfo"]);
              console.log("result",result)
              navigate("/api/connect/recipe-details");
          }else{
              console.log("errorMessage", data["message"]);
              navigate("/error");
          }
      })
    }
    console.log(prefInfo)
  }

  function handlePrefGenerate(event){
    event.preventDefault();
    prefInfo.randomize = false;
    if (isRest){
      navigate("/api/connect/restaurant-pref");
    }else{
      navigate("/api/connect/recipe-pref");
    }
    console.log(prefInfo)
    
  }

  const pages = [
    <div className='flex justify-between items-center h-5/6 bg-zinc-50 '>
      <button onClick={handleSelfCook} className='flex mt-8 ml-20 h-5/6 w-5/12 mb-10 rounded-xl bg-orange-300 justify-center items-center' >
        <div className='flex-col h-3/4 w-3/4 justify-items-center content-center'>
          <span className='flex text-white text-9xl'>Self</span>
          <span className='flex text-white text-9xl'>Cook</span>
        </div>
      </button>

      <button onClick={handleRestaurant} className='flex mt-8 mr-20 h-5/6 w-5/12 mb-10 rounded-xl bg-teal-500 justify-center items-center'>
        <span className='flex text-white text-9xl'>Diner</span>
      </button>
    </div>,

    <>
      

      <div className={`absolute mt-8 w-full  ${isRest ? 'bg-teal-500' : ' bg-orange-300'} `}>
        <button onClick={()=>setPage(0)} className='-mt-4 ml-8 text-gray-600'>
          <span className='w-min h-min px-3 py-2 bg-white/30 rounded-md'>{"<<<<<<<<<<<<<"}Back</span>
        </button>
        <div className='flex h-1/6 justify-center items-center content-center bg-transparent'>
          <span className='flex text-white text-7xl'>
            Any Preference?
          </span>
        </div>
      </div>
      

      <div className={`flex justify-center items-center h-5/6  overflow-hidden ${isRest ? 'bg-teal-500' : ' bg-orange-300'} `}>
        <div className='w-1/2 h-5/6 mt-20'>
          <button onClick={handlePrefGenerate} className='flex h-full w-full justify-center items-center' >
            <div className='flex-col h-3/4 w-3/4 justify-items-center'>
              <span className='flex font-extrabold mt-20 text-white text-[170px]'>Yes</span>
            </div> 
          </button>
        </div>

        <div className='w-1 h-2/3 mt-40 bg-white'></div>

        <div className='w-1/2 h-5/6 mt-20'>
          <button onClick={handleAutoGenerate} className='flex h-full w-full justify-center items-center' >
            <div className='flex-col h-3/4 w-3/4 justify-items-center'>
              <span className='flex font-extrabold mt-20 text-white text-[170px]'>NO</span>
            </div>
          </button>
        </div>

      </div>
    </>


  ]

  return(
      <>
        {pages[page]}
      
      </>
  );
}

export default Home;