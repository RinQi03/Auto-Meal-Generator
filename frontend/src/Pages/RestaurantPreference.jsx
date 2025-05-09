import React, {useState, useContext, createContext} from 'react';
import Slider from 'react-slider'
import ThreeRows from '../Components/threeRowHorScroll.jsx';
import { PrefInfo, SearchResult, LoginContext } from '../App.jsx'
import { useNavigate } from 'react-router-dom';



function divideIntoThree(list) {
    const length = list.length;
    const partSize = Math.ceil(length / 3); 
    return [
        list.slice(0, partSize), 
        list.slice(partSize, partSize * 2), 
        list.slice(partSize * 2), 
    ];
}




function RestPref() {
    const listenURL = "http://"+import.meta.env.VITE_BACKEND_DOMAIN+":"+import.meta.env.VITE_BACKEND_PORT+"/api/connect"

    const minCost = 0;
    const maxCost = 200;
    const [cost, setCost] = useState(0);
    const [TooMuchPref, setTooMuchPref] = useState(0);
    const [username, setUsername] = useContext(LoginContext);
    const [prefInfo, setPrefInfo] = useContext(PrefInfo);
    const [result, setResult] = useContext(SearchResult);
    const [selectPref, setSelectPref] = useState([]);
    const [location, setLocation] = useState([]);
    const [note, setNote] = useState("");
    const navigate = useNavigate();
  

    let locationList = [
        ["🏙️", "Lower Manhattan"],
        ["🏮", "Chinatown"],
        ["🛍️", "SoHo"],
        ["🏢", "Midtown West"],
        ["🏢", "Midtown East"],
        ["🎭", "Theater District"],
        ["🚦", "Times Square"],
        ["🌳", "Upper West Side"],
        ["🌳", "Upper East Side"],
        ["🏞️", "Central Park"],
        ["🌇", "Harlem"],
    ]
  
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
        prefInfo.location = location;
        console.log(prefInfo);

        if ((prefInfo.preference.length+prefInfo.location.length)>2){
            setTooMuchPref(true);
            setTimeout(() => {
                setTooMuchPref(false);
            }, 3000);
            return;
        }
        prefInfo.note = note;
        prefInfo.cost = cost;
        prefInfo.username=username;

        console.log(prefInfo);

        let input = prefInfo;
        fetch((listenURL+"/restaurant-pref").toString(),{
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
    }


    
    return(
        <>
        <div className='flex justify-center items-center h-5/6 bg-teal-600 overflow-scroll'>
            <Select.Provider value = {[selectPref, setSelectPref]}>
            <Location.Provider value = {[location, setLocation]}>
            <div className={`absolute -mt-[460px] w-full h-1/6 'bg-teal-500' `}>
                <div className='flex-col ml-[640px] -mt-2 justify-center bg-transparent'>
                <span className='flex text-white text-3xl'>
                    Any Preference?
                </span>
                <span className='flex text-white text-base -ml-2'>
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

                    <div className="font-bold">Location</div>
                    <div className="col-span-5"> {/*02 */}
                        <div className="grid grid-rows-3 h-full gap-1">
                            <ThreeRows data-type="location" array={divideIntoThree(locationList)}></ThreeRows>
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
                        <span className='text-sm h-8 text-slate-500 font-thin text-right'>200+</span>  
                        </div>

                        
                        <Slider className="w-full backdrop-blur bg-white/70" step={10} onChange={setCost} value={cost} min={minCost} max={maxCost}
                        thumbClassName="w-2 h-6  bg-white -mt-1 mr-2 rounded-sm cursor-pointer"
                        trackClassName="backdrop-blur bg-white/70 h-2 px-2 rounded-full "
                        ></Slider>
                        </div>
                        
                    </div>
                    <div className="font-bold">Note</div>
                    <div className="col-span-5">
                        <textarea type="text" id='note' className='relative w-full backdrop-blur bg-white/50 rounded-md p-2 h-full text-base pb-10' placeholder='Going on a date.' onChange = {e => setNote(e.target.value)}></textarea>
                    </div>

                </div>
                <div className='w-full mt-7 justify-center items-center flex h-12'>
                    <button onClick={handlePrefGenerate} className='flex justify-center items-center bg-slate-50 rounded-md px-3 py-1 text-teal-700 border-2 border-teal-700 ring-2 ring-offset-2 ring-teal-700 ring-offset-teal-500' >Let's Go</button>
                </div>
                </div>
            </div>
            </div>
            </Location.Provider>
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


export default RestPref;
export const Select = createContext();
export const Location = createContext();
