import { useEffect, useState, useContext } from "react";
import {SearchResult} from '../App.jsx'
import RestaurantTag from "../Components/DetailsTags.jsx";
import { useNavigate } from 'react-router-dom';
import StarRating from "../Components/rating.jsx";
import Googlemap from '../Pages/LocationMap.jsx';



function getDayNum (){
    const today = new Date(); // Get the current date
    return today.getDay(); // Map the day number to the name
}
function RestDetails(){

    const [result, setResult] = useContext(SearchResult);
    const [photoAvailable, setPhotoAvailable] = useState(true);

    const navigate = useNavigate();
    const placesAPI = import.meta.env.VITE_PLACES_API_KEY;

    // useEffect(() => {
    //     if (result.name === undefined){
    //         navigate('/api/connect/home');
    //     }
    //   }, [navigate]); 


    // const result = {address_components: [
    //     { long_name: '1291', short_name: '1291', types: [Array] },
    //     { long_name: '3rd Avenue', short_name: '3rd Ave', types: [Array] },
    //     { long_name: 'Manhattan', short_name: 'Manhattan', types: [Array] },
    //     { long_name: 'New York', short_name: 'New York', types: [Array] },
    //     {
    //       long_name: 'New York County',
    //       short_name: 'New York County',
    //       types: [Array]
    //     },
    //     { long_name: 'New York', short_name: 'NY', types: [Array] },
    //     { long_name: 'United States', short_name: 'US', types: [Array] },
    //     { long_name: '10021', short_name: '10021', types: [Array] }
    //   ],
    //   adr_address: '<span class="street-address">1291 3rd Ave</span>, <span class="locality">New York</span>, <span class="region">NY</span> <span class="postal-code">10021</span>, <span class="country-name">USA</span>',
    //   business_status: 'OPERATIONAL',
    //   curbside_pickup: true,
    //   current_opening_hours: {
    //     open_now: true,
    //     periods: [
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object]
    //     ],
    //     weekday_text: [
    //       'Monday: 11:30 AM – 3:00 AM',
    //       'Tuesday: 11:30 AM – 3:00 AM',
    //       'Wednesday: 11:30 AM – 3:00 AM',
    //       'Thursday: 11:30 AM – 3:00 AM',
    //       'Friday: 11:30 AM – 3:00 AM',
    //       'Saturday: 11:30 AM – 3:00 AM',
    //       'Sunday: 11:30 AM – 1:00 AM'
    //     ]
    //   },
    //   delivery: false,
    //   dine_in: true,
    //   editorial_summary: {
    //     language: 'en',
    //     overview: 'A comfy atmosphere attracts a laid-back neighborhood crowd to this cash-only pub famed for burgers.'
    //   },
    //   formatted_address: '1291 3rd Ave, New York, NY 10021, USA',
    //   formatted_phone_number: '(212) 744-0585',
    //   geometry: {
    //     location: { lat: 40.77107379999999, lng: -73.9593297 },
    //     viewport: { northeast: [Object], southwest: [Object] }
    //   },
    //   icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png',
    //   icon_background_color: '#FF9E67',
    //   icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet',
    //   international_phone_number: '+1 212-744-0585',
    //   name: 'JG Melon',
    //   opening_hours: {
    //     open_now: true,
    //     periods: [
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object]
    //     ],
    //     weekday_text: [
    //       'Monday: 11:30 AM – 3:00 AM',
    //       'Tuesday: 11:30 AM – 3:00 AM',
    //       'Wednesday: 11:30 AM – 3:00 AM',
    //       'Thursday: 11:30 AM – 3:00 AM',
    //       'Friday: 11:30 AM – 3:00 AM',
    //       'Saturday: 11:30 AM – 3:00 AM',
    //       'Sunday: 11:30 AM – 1:00 AM'
    //     ]
    //   },
    //   photos: [
    //     {
    //       height: 3024,
    //       html_attributions: [Array],
    //       photo_reference: 'AdDdOWqjdLfunSROIWAeOsJ6HhScjJMDTZbtd3h7Uobx32np2UF16OsepivW7svUnnMoLyPl5LaA1W7sAWVWyO4OtIo79iojeikRHzTDAiuhaxop8jqO-eOgE8Z6J9uxd3JfbEp90lFoH2WPO50Hh89Lbz2SZ4I26ZVv0uV_faX68bZf7XIv',
    //       width: 4032
    //     },
    //     {
    //       height: 2988,
    //       html_attributions: [Array],
    //       photo_reference: 'AdDdOWoysLwc5sfP1ggO4Gn8O2uSV5BuKUKxfmjc3Gy3AmKXOLZcXR7BD222lPSsDJVkPedAGpKdCmBbtNPYYWQUnX7uU3jKo4dPk7qt5e6OtNDRnLDrYdt0_PzxaGYzpj4dsRQfeh9Q1DqP3S9-VDBQ4CN6tUkQugXuXCZaskVLkAnSIDto',
    //       width: 5312
    //     },
    //     {
    //       height: 2688,
    //       html_attributions: [Array],
    //       photo_reference: 'AdDdOWqY2EL6hdN_YNtB-H0c2SQ7mfF0VHa4ScG_IHAJvy3DbhGIoDL-uxcWHabhfq19ZrxV5ppSwotpwL4pkDZevDiJpwPdZFbeyK-AK4ucHwCDkRNBMD1lMFcVTxpU17xh54Ry1BYJtuLN0EsqANNZvBXSkp1jRp0hkxM_SwVq5gl6ZFK8',
    //       width: 4032
    //     },
    //     {
    //       height: 429,
    //       html_attributions: [Array],
    //       photo_reference: 'AdDdOWoAa5zJ0R5AbXU3Nwv3yWcm4bocvqQDyi4G423oRR77FejZL93LbIeeZrwlGwtp8CCCzfSiGPJ0Jbx4Hlx0CQfpHnp67_CB0tVcCGLE7WEwbbe8ReL2LdnIYaXb9iZOoujlICKtWnMTGzA6F8yPCND-CtNpA1_gJS3kFMaaQtvO2CDC',
    //       width: 761
    //     },
    //     {
    //       height: 4032,
    //       html_attributions: [Array],
    //       photo_reference: 'AdDdOWp-UKmnA2PxbFk_uTSmSGkrCBytw5546z8R4Li-0Q0Ox2OABcT80bbWWrcrvTrUy0XtoU34tIXO5SYIGZPgFgkc3njAbr6fj-92YcOounXtoG9nSNsvhzSrChkPvJzfDd-A4aeiMLJInayW6ds_gN11jGrnegQQSelFnbjLDwbpfqmo',
    //       width: 3024
    //     },
    //     {
    //       height: 3024,
    //       html_attributions: [Array],
    //       photo_reference: 'AdDdOWrhR7-cKtZVXpUY3Ozx64C21t6vyi3kOp4UEDvob0O_Pp08uCJ3_SZwnvtgbqTtIRyyK7ZI164eJYi14GFD5JHw5vtbcftFJGjMZG6xhd858yrQYqxXppv3q_FpUuG4STbVdX2pG_lw9wAWBc0XPviMOXsEmfz3pYZEx1EeAZbAsqUE',
    //       width: 4032
    //     },
    //     {
    //       height: 2589,
    //       html_attributions: [Array],
    //       photo_reference: 'AdDdOWocsQUoyTgYnQbhLS-XNiqfmsnYyRsP0BBdjQGvlIMsGabi2fqEHCWQwYU4Rr7Y6XTDr6dQHoEJvoL7NB0mGZ9cgwYG103vX28DAtMZDJN7_kvK1hG2n0yEtCNCIWeBGnOGsWZd-guO4a-GAOdBnVe11MPJmsD0-7IBPg12O7RRbskn',
    //       width: 2173
    //     },
    //     {
    //       height: 4032,
    //       html_attributions: [Array],
    //       photo_reference: 'AdDdOWqpmvtWi_l56yBtXW3NPZpe99Ep1abEzXZx_T8Nit23iJbTQ0SUCQRGZDnVXXMFEW1EZPe-UCc0DR7tYL36YYJM1mkfnTgvvMUeDcyYa4yg6VjU5dFHQugUz9uwbSAvjFkYv0KcjLwj3HYMb1C7-ja4BA8y5xzlCHMR7vVyJ6Brjc6P',
    //       width: 3024
    //     },
    //     {
    //       height: 3024,
    //       html_attributions: [Array],
    //       photo_reference: 'AdDdOWo-LwH0FOQps9tEXPFVTT8taclXHcsjebCBd3PbvHCJTtBkD1Nbzx6h3IA8hNxxQ4OgXb-WCalJq0oAHIdnq8qQFX7Xn3yK41fdBQCmHWnSq_C-MRiJk6GvOBCSEWvznQV6d7v0K2WdgcCu9cAQfMJhynGZX965rOHyzod9_-n1wwVX',
    //       width: 4032
    //     },
    //     {
    //       height: 4080,
    //       html_attributions: [Array],
    //       photo_reference: 'AdDdOWoqIKvXyg2IRQGg1hC_4u2ptbZeSFfD3d-zimGPqk7VSB3kJe7zoSZJ6uANmN37Q3s2Hdmn7cATPIAVksnFwoWX10efcuq35oGWdV2VhVVbaAj0xSeVvGfQ-2VjRGpRWJ2L_pgPlygJ8yXtfIvUVR49aRCz4W4Pp4pEEE2O50ohlACs',
    //       width: 3072
    //     }
    //   ],
    //   place_id: 'ChIJORutA8BYwokR6obC5YpaamM',
    //   plus_code: {
    //     compound_code: 'Q2CR+C7 New York, NY, USA',
    //     global_code: '87G8Q2CR+C7'
    //   },
    //   price_level: 2,
    //   rating: 4.2,
    //   reference: 'ChIJORutA8BYwokR6obC5YpaamM',
    //   reservable: false,
    //   reviews: [
    //     {
    //       author_name: 'Elizabeth Durflinger',
    //       author_url: 'https://www.google.com/maps/contrib/107555017201607645652/reviews',
    //       language: 'en',
    //       original_language: 'en',
    //       profile_photo_url: 'https://lh3.googleusercontent.com/a-/ALV-UjV_Zll65IIRSxMdLPwpeBXZvQpAkfkmpTtKGl_7aBB3heq5vDjx=s128-c0x00000000-cc-rp-mo',
    //       rating: 3,
    //       relative_time_description: '2 months ago',
    //       text: "Cute place with a bustling atmosphere. We were seated outside quickly, and the staff was very friendly. We hadn't noticed it was cash only, but they kindly directed us to an ATM across the street at Wells Fargo. Our food arrived quickly.\n" +
    //         '\n' +
    //         "If you're craving a classic bar burger, this is the spot! My partner and I both had the Bacon Cheeseburger. While it didn’t blow our socks off as some locals claimed, it’s definitely solid bar food if that’s your thing.",
    //       time: 1725407795,
    //       translated: false
    //     },
    //     {
    //       author_name: 'Jeremy Alfano',
    //       author_url: 'https://www.google.com/maps/contrib/110682905178646395455/reviews',
    //       language: 'en',
    //       original_language: 'en',
    //       profile_photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocJVNp1B1pL4YyP2AAeSW1kenbdsVTfN_jUIleyf6NQkTtb6PQ=s128-c0x00000000-cc-rp-mo-ba6',
    //       rating: 5,
    //       relative_time_description: '6 months ago',
    //       text: 'Classic New York burger spot cooking up one of the best in the city.\n' +
    //         '\n' +
    //         'Started with the cottage potatoes which were good, but got a cup of the chili which was great. Tons of flavor and seasoning; definitely try it.\n' +     
    //         '\n' +
    //         'The burger was big and juice; the best part was the char on the bottom that brought out an extra level of flavor and texture.\n' +
    //         '\n' +
    //         'Must stop on any NY food bucket list',
    //       time: 1716336405,
    //       translated: false
    //     },
    //     {
    //       author_name: 'Avi Barr',
    //       author_url: 'https://www.google.com/maps/contrib/100616332058038362642/reviews',
    //       language: 'en',
    //       original_language: 'en',
    //       profile_photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocIzQySK4HXtFxZVGAxNzbN6z-Xe6q3yU6Kp8czKYzZwByWN__M=s128-c0x00000000-cc-rp-mo',
    //       rating: 5,
    //       relative_time_description: '4 weeks ago',
    //       text: 'I won’t beat around the bush - it’s a bit expensive, the cash-only bit is an inconvenience, the waits are long, and the food really didn’t blow me away. So why 5 stars? Because I don’t care. This place has an energy and a stuck-in-time vibe that draws you in. In a city filled with avant-garde smashburgers with kimchi, it’s places like this we rely on to keep us grounded. It’s honest, it isn’t pretending to be innovative or new. It’s getting hard to find places left in Manhattan that feel like real, old New York. Places like Minetta Tavern or Caffe Reggio, and of course, JG Melon. Some complained about rude service, and okay, the older male host can be very short and come across as rude to someone not from the city, but he isn’t. He’s just an authentic New Yorker.',
    //       time: 1730504966,
    //       translated: false
    //     },
    //     {
    //       author_name: 'Arnab Bhowal',
    //       author_url: 'https://www.google.com/maps/contrib/115071416537059764053/reviews',
    //       language: 'en',
    //       original_language: 'en',
    //       profile_photo_url: 'https://lh3.googleusercontent.com/a-/ALV-UjVvaDQ4xxlORK0s8yHjKOlwdTPD7ZLYMYjRd1keZQlwoFo2LaLTWg=s128-c0x00000000-cc-rp-mo-ba4',
    //       rating: 4,
    //       relative_time_description: '2 months ago',
    //       text: "We visited this burger place on a weekend, and there was a bit of a crowd. They told us there would be a 45-minute wait and wrote our name down, but luckily, we were called in just 5-10 minutes. We ordered the bacon cheeseburger, and while it wasn't as mind-blowing as some of the reviews suggested, it was still a solid, tasty burger. One thing to keep in mind—be sure to carry cash as they only accept cash. Overall, a good experience!",
    //       time: 1727075944,
    //       translated: false
    //     },
    //     {
    //       author_name: 'Alisa Valencia Gowing',
    //       author_url: 'https://www.google.com/maps/contrib/100156075623210657771/reviews',
    //       language: 'en',
    //       original_language: 'en',
    //       profile_photo_url: 'https://lh3.googleusercontent.com/a-/ALV-UjWZhd3dUMvaucdnU3DhUVTdGiV6IsUg754ChFmU6vOJh08oXi3S=s128-c0x00000000-cc-rp-mo-ba2',
    //       rating: 5,
    //       relative_time_description: '2 weeks ago',
    //       text: 'Absolutely worth the wait. The chili and cottage fries are a killer combo. The cheeseburger is perfect. I could sit here and drink martinis all night. In fact, I did. :)',
    //       time: 1731772873,
    //       translated: false
    //     }
    //   ],
    //   serves_beer: true,
    //   serves_breakfast: true,
    //   serves_brunch: true,
    //   serves_dinner: true,
    //   serves_lunch: true,
    //   serves_vegetarian_food: false,
    //   serves_wine: true,
    //   takeout: true,
    //   types: [ 'bar', 'restaurant', 'food', 'point_of_interest', 'establishment' ],
    //   url: 'https://maps.google.com/?cid=7163637709892912874',
    //   user_ratings_total: 3359,
    //   utc_offset: -300,
    //   vicinity: '1291 3rd Avenue, New York',
    //   website: 'http://jgmelon-nyc.com/',
    //   wheelchair_accessible_entrance: true,
    //   tags: [
    //     'classic burger',
    //     'cash only',
    //     'Upper East Side institution',
    //     'no-frills'
    //   ]
    // }


    const RestaurantName = (result.name === undefined) ? "Unavailable" : result.name;
    const website = (result.website === undefined) ? "Unavailable" : result.website;
    const operatingHours = (result["opening_hours"] && result["opening_hours"]["weekday_text"])
    ? result["opening_hours"]["weekday_text"][getDayNum()]
    : "Operating hours unavailable";
    const address = (result.formatted_address === undefined) ? "Unavailable" : result.formatted_address;
    const phone = (result.formatted_phone_number === undefined) ? "Unavailable" : result.formatted_phone_number;
    const starRate = Number(result.rating);
    const tagList = (result.tags===undefined || result.tags.length ===0)? []:result.tags;
    const photoList = (result.photos === undefined) ? [] : result.photos.map(photo => photo.photo_reference);

    if (photoList === "Unavailable"){
        setPhotoAvailable(false);
    }
    // console.log("photoList",photoList);
    // console.log(`Restaurant Name: ${RestaurantName}`);
    // console.log(`Website: ${website}`);
    // console.log(`Operating Hours: ${operatingHours}`);
    // console.log(`Address: ${address}`);
    // console.log(`Phone Number: ${phone}`);
    // console.log(result.opening_hours)
    // console.log(result.opening_hours.weekday_text)
    // console.log(result["opening_hours"]["weekday_text"][1])
    // console.log(getDayNum())
    // console.log(result["opening_hours"]["weekday_text"][getDayNum()])



    return (
        <div className="h-5/6 bg-teal-600 text-white">
        <main className="px-40 pt-10">
            {/* Left Section */}
            <div className="grid grid-cols-3 gap-32">
            <section className="col-span-2">
                <h2 className="text-3xl font-bold">{RestaurantName}</h2>

                {/* Tags */}
                <div className="mt-4">
                <span className="font-bold">Tags:</span>
                <div className="flex space-x-2 mt-2 overflow-hidden">
                    {
                        tagList.map((ele) => (
                            <RestaurantTag key = {ele} name={ele}/>
                        ))
                    }
                </div>
                </div>

                {/* Details */}
                <div className="mt-6 space-y-2">
                <p><span className="font-bold">Operating Time:</span> {operatingHours}</p>
                <p><span className="font-bold">Location:</span> {address}</p>
                <p><span className="font-bold">Phone Number:</span> {phone}</p>
                <p><span className="font-bold">Website:</span> <a href = {website} className="underline decoration-white/70 decoration-2 underline-offset-2">{website}</a></p>
                {/* <p><span className="font-bold">Notice:</span> Approximate location, verify hours by calling.</p> */}
                </div>

                {/* Map Section */}
                <div className="mt-6">
                    <div className="w-[740px] h-72 mt-2 p-2 border border-gray-300 rounded">
                        <Googlemap className="mt-2 p-2 border border-gray-300 rounded" location = {RestaurantName} height="300px" width = "750px"></Googlemap>
                    </div>
                </div>
            </section>

            {/* Right Section */}
            <aside>
                {/* Rating */}
                <div className="mb-6">
                <h3 className="font-bold">Rating:</h3>
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                        <StarRating rating = {starRate}></StarRating>
                    </div>
                    <span className="text-gray-600">4.5</span>
                </div>
                </div>

                {/* Dishes */}
                <div>
                <h3 className="font-bold">Pictures:</h3>
                <div className="mt-4 space-y-4 h-[340pt] overflow-scroll hide-scrollbar">
                    {
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
                    }
                </div>
                </div>
            </aside>
            </div>
        </main>
        </div>
    );
}

export default RestDetails