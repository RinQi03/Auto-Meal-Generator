import './config.mjs';

async function getPlaceID (name, latitude, longtitude){
    // const locationLatLongList = [
    //     {"location": "Lower Manhattan", "latitude": 40.7142, "longitude": -74.0060},
    //     {"location": "Chinatown", "latitude": 40.7142, "longitude": -73.9940},
    //     {"location": "SoHo", "latitude": 40.7213, "longitude": -74.0014},
    //     {"location": "Midtown West", "latitude": 40.7614, "longitude": -73.9850},
    //     {"location": "Midtown East", "latitude": 40.7541, "longitude": -73.9738},
    //     {"location": "Theater District", "latitude": 40.7580, "longitude": -73.9855},
    //     {"location": "Times Square", "latitude": 40.7589, "longitude": -73.9851},
    //     {"location": "Upper West Side", "latitude": 40.7851, "longitude": -73.9780},
    //     {"location": "Upper East Side", "latitude": 40.7789, "longitude": -73.9589},
    //     {"location": "Central Park", "latitude": 40.7851, "longitude": -73.9632},
    //     {"location": "Harlem", "latitude": 40.8075, "longitude": -73.9441}
    // ]

    // let specificArea = ""
    // if (area === "Manhattan"){
    //     specificArea = "&location=40.776676%2C-73.97132&radius=50000"
        
    // }else{
    //     const temp = locationLatLongList.find(areaInfo => areaInfo.location === area);
    //     console.log(temp)

    //     // Extract the latitude
    //     let latitude = ""
    //     let longitude = "";

    //     if (temp) {
    //         latitude = temp.latitude;
    //         longitude = temp.longitude;

    //     } else {
    //         console.log("Location not found.");
    //     }
    //     specificArea = `location=${latitude}%2C${longitude}&radius=3000`
    // }    

    //place id
    
    let specificArea;
    if (longtitude===undefined || latitude === undefined){
        specificArea = "&location=40.776676%2C-73.97132&radius=50000"
    }else{
        specificArea = `location=${latitude}%2C${longitude}&radius=2000`
    }
    
    let fetchURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
                    +specificArea
                    +"&keyword="+name
                    +"&key="+process.env.PLACES_API_KEY;

    //general info
    let roughInfoURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
                    +"?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry"
                    +"&input=raku"
                    +"&inputtype=textquery"
                    +"&locationbias=circle%3A2000%40.776676%2C-73.97132"
                    +"&key="+process.env.PLACES_API_KEY;
    
    
    // console.log("fetchURL",fetchURL)

    try {
        const response = await fetch(fetchURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            }
        });
    
        const data = await response.json();
        // console.log(data.results[0].place_id);
        return (data.results[0].place_id)
      } catch (error) {
        console.error('Error posting data:', error);
      }
}

const getRestDetails = async (name, latitude, longtitude) => {

    const place_id = await getPlaceID(name, latitude, longtitude);
    let fetchURL =`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.PLACES_API_KEY}`;
    
    // console.log(fetchURL);
    try {
      const response = await fetch(fetchURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      const result = data.result;
      // console.log(result.name);
      // console.log(result.opening_hours.weekday_text);
      // console.log(result.types);
      // console.log(result.website);
      // console.log(result.formatted_address);
      return(result)

    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  
//   postData();
// getRestDetails("raku", "Midtown East")
// getPlaceID("raku", "Central Park")

export default getRestDetails;
