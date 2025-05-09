import React from 'react'


function Googlemap(props){

    let location = props.location ?? "Little Collins";
    const width = props.width ?? "800";
    const height = props.height ?? "400";
    const area = "New York City+NY";
    const googleMapAPI = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


    if (location.includes(" ")){
        location = location.replaceAll(" ","+");
    }

    const generatedURL = "https://www.google.com/maps/embed/v1/place?key="+googleMapAPI+"&q="+location+","+area;

    return (
        <>
            <iframe
                className='rounded-md'
                width= {width}
                height= {height}
                loading="lazy"
                src={generatedURL}>
            </iframe>
        </>
    )
}
export default Googlemap