import { useState, useContext } from "react";
import { Select, Location} from '../Pages/RestaurantPreference.jsx'
import { PrefInfo } from '../App.jsx';
// import { Select, Location} from '../Pages/RecipePreference.jsx'




function ChooseTag(props){

    const [isActive, setIsActive] = useState(false);
    const [selectPref, setSelectPref] = useContext(Select);
    const [location, setLocation] = useContext(Location);


    const toggleButton = (target) => {
        setIsActive(!isActive); 
        if(isActive){
            if (target.getAttribute('data-type') === "location"){
                setLocation(location.filter((ele) => ele !== target.getAttribute('data-name')));
            }else{
                setSelectPref(selectPref.filter((ele) => ele !== target.getAttribute('data-name')));
            }
            
        }else{
            if (target.getAttribute('data-type') === "location"){
                location.push(target.getAttribute('data-name'))
            }else{
                selectPref.push(target.getAttribute('data-name'))
            }
        }
        // console.log(selectPref)
        // console.log(location)
    };



    return (
        <button onClick={e => toggleButton(e.target)} data-name={props.name} data-type = {props["data-type"]} key = {props.name} className={`w-min h-min mx-1 whitespace-nowrap px-2 rounded-md backdrop-blur bg-white/30 text-[12pt] hover:bg-white/50 ${isActive ? 'bg-white/60' : 'bg-white/30'} `}>
           {props.emoji} {props.name}
        </button>
    );
}

export default ChooseTag