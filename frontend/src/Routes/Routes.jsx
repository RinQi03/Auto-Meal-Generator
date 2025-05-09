import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Googlemap from '../Pages/LocationMap.jsx';
import Express from '../Pages/ExpressProof.jsx';
import TalkToAI from '../Pages/TalkToAI.jsx';
import Login from '../Pages/Login.jsx';
import Register from '../Pages/Register.jsx';
import Main from '../Layouts/Main.jsx'
import Home from '../Pages/Home.jsx'
import RestPref from '../Pages/RestaurantPreference.jsx'
import RestDetails from '../Pages/RestDetails.jsx'
import RecipeDetails from '../Pages/RecipeDetails.jsx';
import RecipePref from '../Pages/RecipePreference.jsx';
import ErrorPage from '../Pages/Error.jsx';
import About from '../Pages/About.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element:<Main></Main>,
        children:[
            
            {
                path: "/error",
                element:<ErrorPage></ErrorPage>
            },
            {
                path: "/api/connect/talktoai",
                element:<TalkToAI></TalkToAI>
            },
            {
                path: "/api/connect/about",
                element:<About></About>
            },
            {
                path:"/googlemap",
                element:<Googlemap></Googlemap>
            },
            {
                path:"/api/connect/express",
                element:<Express></Express>
            },
            {
                path:"/api/connect/login",
                element:<Login></Login>
            },
            {
                path:"/api/connect/register",
                element:<Register></Register>
            },
            {
                path: "/api/connect/home",
                element:<Home></Home>
            },
            {
                path: "/api/connect/restaurant-pref",
                element:<RestPref></RestPref>
            },
            {
                path: "/api/connect/recipe-pref",
                element:<RecipePref></RecipePref>
            },
            {
                path:"/api/connect/restaurant-details",
                element:<RestDetails></RestDetails>
            },
            {
                path:"/api/connect/recipe-details",
                element:<RecipeDetails></RecipeDetails>
            }
        ]
    }
])

export default router;