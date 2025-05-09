# Milestone 04 - Final Project Documentation

## NetID

yq2290

## Name

Rin Qi

## Repository Link

https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/tree/master

## URL for deployed site

http://linserv1.cims.nyu.edu:60001

There will be nothing on this page except for the header and the footer, please head to other sub-website using the header.

## URL for form 1 (from previous milestone)

http://linserv1.cims.nyu.edu:60001/api/connect/register

## Special Instructions for Form 1

Form 1 is a form for signing up. Username cannot be the ones that already exist in the database. The length of the username needs to be greater than 1 and that of password needs to be greater than 4.

You should be automatically logged in after you register. To check if you are login, check the top right icon. If your username appears on the top right instead of Guest, then you are logged in.

## URL for form 2 (for current milestone)

http://linserv1.cims.nyu.edu:60001/api/connect/home

## Special Instructions for Form 2

Form 2 (and other forms that will appear after choosing form 2) is the most important function of this website. Please follow the instruction on the screen and after selection, you should see a random restaurant in Manhattan / recipe generated.

If you are not login, the website might generate the same recipe or restaruant over and over again.

If you want to go back to the home page, please click the logo on the top left or the Back button on the top left.

## URL for form 3 (from previous milestone)

http://linserv1.cims.nyu.edu:60001/api/connect/login

## Special Instructions for Form 3

Form 3 is a form for signing in. You can use the ones that are already created by me:

- Username: Rin
- Password: asdqwe
  Or you can sign up using form 1 and use your info.

To check if you are login, check the top right icon. If your username appears on the top right instead of Guest, then you are logged in.

## First link to github line number(s) for constructor, HOF, etc.

HOF 1：https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/blob/master/frontend/src/Components/threeRowHorScroll.jsx#L15-L23

## Second link to github line number(s) for constructor, HOF, etc.

HOF 2：https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/blob/master/frontend/src/Pages/RestDetails.jsx#L304C21-L308C22

## Short description for links above

HOF 1 is a hof that maps elements of an array, which includes preference to restaurants, into frontend components [<ChooseTags>](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/blob/master/frontend/src/Components/chooseTags.jsx) to show them on the website.

HOF 2 is a hof that maps elements of an array, which includes hash tags of restaurants or recipes, into frontend components [<DetailTag>](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/blob/master/frontend/src/Components/DetailsTags.jsx) to show them on the website.

## Link to github line number(s) for schemas (db.js or models folder)

https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/blob/master/backend/db.mjs#L7-L34

## Description of research topics above with points

6 points - Using **React** for all of frontend development

2 points - Using **tailwind.css** in all frontend styling

2 point - Using **Google Places API** for retriving operating hours, websites, address, photos, phone number of a restaurant

1 point - Using **Google Maps API** for displaying google maps in the frontend

1 point - Using **Gemini API** for autogenerate random recipes or restaurants

1 point - Using **Youtube Data API v3** for retrieving Youtube video links for recipes

## Links to github line number(s) for research topics described above (one link per line)

(TODO: add link to github line number(s), one per line for research topics ... for example, if using auth/passport, link to auth.js or where bulk of auth code is)

1. [React](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/blob/master/frontend/src/Pages/Home.jsx)

2. [Tailwind.css](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/blob/master/frontend/src/Pages/RecipePreference.jsx#L112-L185)

3. [Google Places API](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/blob/master/backend/extractRestDetails.js)

4. [Google Maps API](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/blob/master/frontend/src/Pages/LocationMap.jsx)

5. [Gemini API](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/blob/master/backend/ai_generator.js)

6. [Youtube Data API v3](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/blob/master/backend/youtubeExtractor.js)

Optional project notes

---

**Note**: Both guests and users can access all the functions on the website except that for the users, the restaurants/recipes they generated will be recorded so that the generator will not generate the same restaurants/recipes. That's said, if the user is not logged in, the generator might generate the same restaurant/recipe.

There is also an [About](http://linserv1.cims.nyu.edu:60001/api/connect/about) Page that includes the number of recipes, restaurants, and users the current website has.

There is also an [Error](http://linserv1.cims.nyu.edu:60001/error) Page that shows error message and provides a link back to the home page.

Draft Test Websites (that serves solely for the purpose of testing backend and frontend, should not be accounted for final project grading ):

1. [Location and embedding testing page](http://linserv1.cims.nyu.edu:60001/googlemap)：[github link](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/blob/master/frontend/src/Pages/LocationMap.jsx)

2. [Connecting of frontend and backend testing page](http://linserv1.cims.nyu.edu:60001/api/connect/express): [github link](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/blob/master/frontend/src/Pages/ExpressProof.jsx)

3. [Gemini testing page](http://linserv1.cims.nyu.edu:60001/api/connect/talktoai): [github link](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Rin-Qi/blob/master/frontend/src/Pages/TalkToAI.jsx)

## Attributions

- Backend

  - ai_generator.js - AI response code based off of https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/ground-gemini
  - app.mjs - Authentication part based on [hw5](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/homework05-Rin-Qi/tree/main/src)
  - auth.mjs - Authentication part based on [hw5 auth.mjs](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/homework05-Rin-Qi/blob/main/src/auth.mjs)
  - db.mjs - schema construtor based on [hw5 db.mjs](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/homework05-Rin-Qi/blob/main/src/db.mjs)
  - extractRestDetails.js - methods for retrieving place_id using name of the restaurnat and methods for retrieving detailed operating restaurant information using place_id based on [Google Places API documentation](https://developers.google.com/maps/documentation/places/web-service/search-nearby)
  - mongodbHelper.js - helper methods for dealing with mongodb, such as adding documents and/or update documents based on [Mongodb documentation](https://www.mongodb.com/docs/manual/reference/method/)
  - youtubeExtractor.js - extract Youtube videoId based on [Youtube Data API v3 documentation](https://developers.google.com/youtube/v3/docs/search/list)
  - translate.js - JSON format based on [structured output documentation of Gemini](https://ai.google.dev/gemini-api/docs/structured-output?lang=node)

- Frontend
  - React - the use of useContext, useState, useEffect, useNavigate, useContext, createContext - based on [tutorial](https://www.youtube.com/watch?v=EBuGV_FQFao&list=PL_c9BZzLwBRKFRIBWEWYCnV4Lk9HE3eYJ)
  - src/Routes/Routes.jsx - code use to navigate between website pages based on [React-router-Tutorial] (https://www.youtube.com/watch?v=oTIJunBa6MA&t=134s)
  - Tailwind CSS - styling the whole website based on [Tailwind.css official website](https://tailwindcss.com/docs/installation)
  - src/Pages/LocationMap.jsx - embedding Google Maps based on [Google Maps API documentation](https://developers.google.com/maps/documentation/embed/get-started)
  - src/Pages/RecipeDetails.jsx - embedding Youtube video based on [Youtube Data API v3 Youtube Tutorial](https://www.youtube.com/watch?v=pdQ3X8Xa80o)
  - src/Pages/RestaurantDetails.jsx - loading images from Google Places API based on [A Blog about Google Place Details and Place Photos API](https://afi.io/blog/google-place-details-and-place-photos-api/)
