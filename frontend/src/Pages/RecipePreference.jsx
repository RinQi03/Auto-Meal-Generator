import React, { useEffect, useState, useContext, createContext} from 'react';
import axios from 'axios';
import Slider from 'react-slider'
import ThreeRows from '../Components/threeRowHorScrollRecipeVer.jsx';
import {PrefInfo, SearchResult} from '../App.jsx'
import { useNavigate } from 'react-router-dom';



function RecipePref() {
    const listenURL = "http://"+import.meta.env.VITE_BACKEND_DOMAIN+":"+import.meta.env.VITE_BACKEND_PORT+"/api/connect"

    const minCost = 0;
    const maxCost = 100;
    const [cost, setCost] = useState(0);
    const [TooMuchPref, setTooMuchPref] = useState(0);

    const [prefInfo, setPrefInfo] = useContext(PrefInfo);
    const [result, setResult] = useContext(SearchResult);

    const [selectPref, setSelectPref] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [note, setNote] = useState("");
    const navigate = useNavigate();
  
    let ingredientList = [
        [["🥩", "Beef"],
        ["🐖", "Pork"],
        ["🐔", "Chicken"],
        ["🐑", "Lamb"],
        ["🐟", "Fish"],
        ["🦐", "Seafood"]],
        [["🥕", "Carrots"],
        ["🥦", "Broccoli"],
        ["🥬", "Spinach"],
        ["🥬", "Lettuce"],
        ["🍅", "Tomatoes"],
        ["🧅", "Onions"],
        ["🥔", "Potatoes"],
        ["🫑", "Bell Peppers"],
        ["🍄", "Mushrooms"],
        ["🧄", "Garlic"]],
        [["🍚", "Rice"],
        ["🍝", "Pasta"],
        ["🍞", "Bread"],
        ["🥚", "Eggs"],
        ["🥛", "Milk"],
        ["🧀", "Cheese"],
        ["🧈", "Butter"],
        ["🌿", "Herbs"],
        ["🌶️", "Spices"]]
    ];
  
    let preferenceList = [
        [["🍜", "Asian"],
        ["🍣", "Japanese"],
        ["🍝", "Italian"],
        ["🗼", "French"],
        ["🌮", "Mexican"],
        ["🍔", "American"],
        ["🍖", "Korean"],
        ["🍛", "Indian"]],
        [["🌱", "Vegetarian"],
        ["🥦", "Vegan"],
        ["🌾", "Gluten-free"],
        ["🥩", "High-protein"],
        ["🥬", "Low-carb"]],
        [["🍣", "Sushi"],
        ["🍕", "Pizza"],
        ["🍔", "Burgers"],
        ["🌮", "Tacos"],
        ["🥪", "Sandwiches"]]
    ]
  



    function handlePrefGenerate(event){
        event.preventDefault();
        prefInfo.preference = selectPref;
        prefInfo.ingredients = ingredients;
        console.log(prefInfo);

        if ((prefInfo.preference.length+prefInfo.ingredients.length)>2){
            setTooMuchPref(true);
            setTimeout(() => {
                setTooMuchPref(false);
            }, 3000);
            return;
        }
        prefInfo.note = note;
        prefInfo.cost = cost;


        let input = prefInfo;
        fetch((listenURL+"/recipe-pref").toString(),{
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

    


    return(
        <>
        <div className='flex justify-center items-center h-5/6 bg-orange-500 overflow-scroll'>
            <Select.Provider value = {[selectPref, setSelectPref]}>
            <Ingredient.Provider value = {[ingredients, setIngredients]}>
            <div className={`absolute -mt-[460px] w-full h-1/6 'bg-teal-500' `}>
                <div className='flex-col ml-[640px] -mt-2 justify-center bg-transparent'>
                <span className='flex text-white text-3xl'>
                    Any Preference?
                </span>
                <span className='flex text-white text-sm -ml-2'>
                    Please only choose two buttons!
                </span>
                </div>
            </div>  

            <div className='w-11/12 h-5/6 mt-20 '>
            
            <div className='flex-col h-full w-full justify-items-center' >
            
                <div className="relative overflow-y-scroll hide-scrollbar justify-center ">
                
                {/* <div className="relative ml-20 mt-36 overflow-y-scroll hide-scrollbar h-[400px] justify-center ">   */}
                <div className="grid grid-cols-6 grid-rows-4 gap-5 place-content-center text-white text-xl ">
                    <div className="font-bold ">Preference</div>
                    <div className="col-span-5">
                        <div className="grid grid-rows-3 h-full gap-1">
                            <ThreeRows data-type="preference" array={preferenceList}></ThreeRows>
                        </div>
                    </div>

                    <div className="font-bold">Ingredients</div>
                    <div className="col-span-5"> {/*02 */}
                        <div className="grid grid-rows-3 h-full gap-1">
                            <ThreeRows data-type="ingredients" array={ingredientList}></ThreeRows>
                        </div>
                    </div>

                    <div className="font-bold">Cost</div>
                    <div className="col-span-5">
                        <div className="">
                        <div className="w-full justify-between flex h-7">
                        <span className='text-[12pt] h-2 text-white font-thin'>Current: ${cost}</span>
                        </div>
                        <div className="w-full justify-between flex h-7 mt-3">
                        <span className='text-sm h-2 text-slate-500 font-thin'>0</span>
                        <span className='text-sm h-8 text-slate-500 font-thin text-right'>100+</span>  
                        </div>

                        
                        <Slider className="w-full backdrop-blur bg-white/70" step={10} onChange={setCost} value={cost} min={minCost} max={maxCost}
                        thumbClassName="w-2 h-6  bg-white -mt-1 mr-2 rounded-sm cursor-pointer"
                        trackClassName="backdrop-blur bg-white/70 h-2 px-2 rounded-full "
                        ></Slider>
                        </div>
                        
                    </div>
                    <div className="font-bold">Note</div>
                    <div className="col-span-5">
                        <textarea type="text" id='note' className='relative w-full backdrop-blur bg-white/50 rounded-md p-2 h-full text-base text-gray-500 pb-10' placeholder='Cook for Christmas Eve.' onChange = {e => setNote(e.target.value)}></textarea>
                    </div>

                </div>
                <div className='w-full mt-7 justify-center items-center flex h-12'>
                    <button onClick={handlePrefGenerate} className='flex justify-center items-center bg-slate-50 rounded-md px-3 py-1 text-orange-500 border-2 border-orange-500 ring-2 ring-offset-2 ring-orange-500 ring-offset-orange-300' >Let's Go</button>
                </div>
                </div>
            </div>
            </div>
            </Ingredient.Provider>
            </Select.Provider>
        </div>


        {
            TooMuchPref &&(
            <div id="toomuchprefmessage" className='absolute z-10 top-64 justify-center items-center place-content-center h-2/5 w-full bg-blue-950 shadow-red-600 shadow' >
                <span className='flex text-9xl italic -mt-8 text-white align-middle justify-center'>Too much preferences!</span>
                <span className='flex text-xl text-white align-middle justify-center pr-3 mt-5'>Please only choose two buttons!</span>
            </div>
            )
        }
    </>
    );

}


export default RecipePref;
export const Select = createContext();
export const Ingredient = createContext();
