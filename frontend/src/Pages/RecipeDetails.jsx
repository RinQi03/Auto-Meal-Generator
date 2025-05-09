import { useEffect, useState, useContext } from "react";
import {SearchResult} from '../App.jsx'
import RestaurantTag from "../Components/DetailsTags.jsx";
import { useNavigate } from 'react-router-dom';
import StarRating from "../Components/rating.jsx";
import Googlemap from '../Pages/LocationMap.jsx';
import DetailsTag from '../Components/DetailsTags.jsx'




function translateIngredients (ingredientList){
    // console.log(ingredientList);
    const categories = Object.keys(ingredientList);
    // console.log(categories);
    const colorList = ["bg-teal-200/50","bg-red-300/50","bg-zinc-300/50"]


    return (
        <div className="flex mt-2">
            {
                categories.map((category,index)=>(
                    <div key = {category} className={`flex-col w-min h-min mx-1 whitespace-nowrap px-1 py-2 rounded-md backdrop-blur ${colorList[index]} text-[12pt]`}>
                    {
                        ingredientList[category].map((ele) => (
                            <DetailsTag key = {ele} name={ele} newAdjust="my-1 bg-white/5"/>
                        ))
                    }
                    </div>
                    
                ))
            }
            
        </div>
    )
}

function translateInstructions (instructions){
    if (!(instructions.includes("1.") && instructions.includes("2."))){
        return [instructions];
    }
    const regex = /(\d+\.\s)/g;

    const parts = instructions.split(regex);

    const formattedInstructions = [];
    for (let i = 1; i < parts.length; i += 2) {
        formattedInstructions.push(parts[i] + parts[i + 1].trim());
    }

    return formattedInstructions;
}




function RecipeDetails(){

    const [result, setResult] = useContext(SearchResult);
    // const [photoAvailable, setPhotoAvailable] = useState(true);

    const navigate = useNavigate();
    const placesAPI = import.meta.env.VITE_PLACES_API_KEY;



    // let result = {recipeName: 'Chicken Saltimbocca with Lemon-Butter Sauce',
    //     tags: [ 'Italian', 'Chicken', 'Restaurant-Style', 'Elegant' ],
    //     ingredients: {
    //             vegetable: [ 'Rosemary', 'Garlic', 'Potatoes' ],
    //             meat: [ 'Lamb Chops' ],
    //             others: [ 'Olive Oil', 'Salt', 'Black Pepper' ]
    //         },
    //     stepsToCook: '1. Prepare the chicken: Season chicken breasts generously with salt and pepper. Top each breast with 2-3 slices of prosciutto and 2-3 sage leaves. Lightly flour chicken breasts.\n' +
    //       '2. Sear the chicken: Melt 2 tablespoons of butter in a large skillet over medium-high heat. Sear the chicken for 3-4 minutes per side until golden brown and cooked through.\n' +
    //       '3. Make the sauce: Remove chicken from skillet. Add remaining butter to the skillet and melt. Whisk in flour and cook for 1 minute, stirring constantly. Gradually whisk in chicken broth, scraping up any browned bits from the bottom of the pan. Bring to a simmer and cook until slightly thickened, about 2 minutes. Stir in heavy cream, lemon juice, and lemon zest. Season with salt and pepper to taste.\n' +
    //       '4. Combine: Return chicken to the skillet and simmer for 2 minutes, allowing the sauce to coat the chicken. Stir in Parmesan cheese, if desired.\n' +        
    //       '5. Serve: Serve immediately over pasta, risotto or polenta.   Garnish with extra sage leaves if you like',
    //       youtubeVideoId: 'LLAZUTbc97I'
    //     }


    const recipeName = (result.recipeName === undefined) ? "Unavailable" : result.recipeName;
    const ingredients = (result.ingredients === undefined) ? [] : result.ingredients;
    let stepsToCook = (result.stepsToCook === undefined) ? "Unavailable" : result.stepsToCook;
    const youtubeVideoId = (result.youtubeVideoId === undefined) ? "Unavailable" : result.youtubeVideoId;
    const tagList = (result.tags===undefined || result.tags.length ===0)? []:result.tags;

    try{
        stepsToCook = translateInstructions(stepsToCook);
    }catch(err){
        console.log(err.message)
        stepsToCook = (result.stepsToCook === undefined) ? "Unavailable" : result.stepsToCook;
    }
    
    // if (stepsToCook.length===0 || stepsToCook ===null ){
    //     stepsToCook = []
    // }
    
    // const photoList = (result.photos === undefined) ? "Unavailable" : result.photos.map(photo => photo.photo_reference);

    // if (photoList === "Unavailable"){
    //     setPhotoAvailable(false);
    // }


    // console.log("photoList",photoList);
    console.log(`recipeName: ${recipeName}`);
    console.log(`ingredients: ${ingredients}`);
    console.log(`stepsToCook: ${stepsToCook}`);
    console.log(`youtubeLink: ${youtubeVideoId}`);
    console.log(`tagList: ${tagList}`);




    return (
        <div className="h-5/6 bg-orange-500 text-white overflow-scroll">
        <main className="px-40 pt-10 mt-4">
            {/* Left Section */}
            <div className="grid grid-cols-3 gap-32">
            <div className="col-span-2">
                <h2 className="text-3xl font-bold">{recipeName}</h2>

                {/* Tags */}
                <div className="mt-8">
                <span className="font-bold">Tags:</span>
                <div className="flex mt-2 overflow-hidden">
                    {
                        tagList.map((ele) => (
                            <RestaurantTag key = {ele} name={ele}/>
                        ))
                    }
                </div>
                </div>

                {/* Details */}
                <div className="mt-4">
                    <div><span className="font-bold mt-4 ">Ingredients:</span> {translateIngredients(ingredients)}</div>
                    <div className="mt-6 border p-2 rounded-md bg-white/20">
                        <span className="font-bold ">Instructions:</span> 
                        {
                            stepsToCook.map((ele,index) => (
                                <p key = {index} className="py-1">{ele}</p>
                            ))
                        }
                    </div>
                    <div className="h-16"> </div>
                {/* <p><span className="font-bold">youtubeLink:</span> {youtubeLink}</p> */}
                </div>

                
            </div>

            {/* Right Section */}
            <aside className="flex-col">
                {/* Youtube Section */}
                <div className="flex mt-2 h-2/5">
                    <div className="w-[360px] h-40 mt-2 border-gray-300 rounded">
                        <h3 className="font-bold">Reference Video:</h3>
                        <iframe className="mt-1 rounded" src={`https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1`}
                        frameBorder="0"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" height="250px" width = "400px"></iframe>
                        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/szjZ3vqwyXE?si=z5D4N50SWLGtIvq3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                    </div>
                </div>

                {/* Dishes */}
                {/* <div className="flex mt-6 "> */}
                <div className=" mt-6 hidden">

                <h3 className="font-bold">Picture:</h3>
                <div className="mt-8 space-y-4 h-[340pt] overflow-scroll hide-scrollbar">
                    {/* {
                        photoAvailable && photoList.map((ele,index)=>{
                            return (
                                <img
                                    key = {`picture-${index}`}
                                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${ele}&key=${placesAPI}`}
                                    alt="Picture 1"
                                    className="w-72 h-48 object-cover rounded-md"
                                />
                            )
                        })
                    }
                    {
                        !photoAvailable && <span>Sorry. No photos available.</span>
                    } */}
                </div>
                </div>
            </aside>
            </div>
        </main>
        </div>
    );
}




export default RecipeDetails