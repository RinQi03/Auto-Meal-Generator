# Auto Meal Choice Generator

## Overview

Always struggling with what to eat today? Which restaurant should I go to? What dinner should I cook tonight? Let Manhattan Auto Meal Generator help you!

Manhattan Auto Meal Generator is a Gen AI web app that filters out good suited restaurants and foods, collect information and allows user to easily decide what they want to eat for the next meal.

- If the user wants to go to a restaurant for the next meal, it will generate one suitable restaurants in Manhattan, taking into consideration of users' preference, location, operation time, budget, rating, and addtioanl requirements (like going on a date).
- If the user wants to cook his/her own dinner, it will generate one cookable dish, taking into account of the preference of the user, ingredients the user have, cost, and addtioanl requirements (like cooking for Christmas Eve).

**Note: example.env in frontend and backend folder respectively**

## Data Model

The application will store Users, Restaurants, and Recipes using Mongoose.

An Example User:

```javascript
{
  username: "RinQi",
  hash: // a password hash,
  email: // a email
  visitedRestaurants: []
  cookedRecipe:[]
}
```

An Example Restaurants:

```javascript
{
  name: "Wokuni",
  placeId: // a string containing place_id, which is a unique id for each place in Google Map
  tags: // a list of hash tags of the restaurant such as Japanese food, bar, cafe etc
  phone: // a string containing phone number to contact the restaurant
  website: // a string contains URL link to the official page
  operationTime: //a array that contains operation time
  rating: // a number from Google Places API
  address: // a string containing address from Google Places API
  photo_references_list: // a list containing photo_references from Google Places API
}
```

An Example Recipe:

```javascript
{
  name: "Souffle",
  tag: // a list of specific tags of the recipe such as Korean, American, Mexican, fusion, vegan etc
  ingredients: // a objects of list of ingredients {veg: [], meat: [], others:[]}
  youtubeVideoId: // a string contains URL link to the referable cooking tutorials
  instructions: // a list of instructions for cooking
}
```

## [Link to Commented First Draft Schema](/backend/db.mjs)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can let the site pick a random restaurant for me depend on my preference (or if I don't have any preference, it can still choose for me). The site will remember my the restaurants it generated and would not recommend the same one to me.
4. as a user, I can let the site pick a random recipe for me depend on my preference (or if I don't have any preference, it can still choose for me). The site will remember my the recipes it generated and would not recommend the same one to me.
5. as a guest, I can let the site pick a random restaurant for me depend on my preference (or if I don't have any preference, it can still choose for me). Note that the site might generate the **same** restaurant, because there is not user information for further analysis.
6. as a guest, I can let the site pick a random recipe for me depend on my preference (or if I don't have any preference, it can still choose for me). Note that the site might generate the **same** recipe, because there is not user information for further analysis.

## Research Topics

- (6 points) Use a front-end framework
  - React is a JavaScript library for building user interfaces.
  - I can use React for easier/less code writing and obtain a clearer structure.
  - See React Manual for more information [React] (https://legacy.reactjs.org/docs/getting-started.html).
- (5 points) Integrate external API
  - Using [Gemini API](https://ai.google.dev/gemini-api/docs) to perform search, and output recommanded restautants/recipes that are most suitable. The import of LLM is for better understanding the user's preference in natural languages.
  - Using [Google Maps](https://developers.google.com/maps/documentation/embed/get-started) to show the location of the restaurants. I choose this API because it is easy to embed and the documentations and tutorials are well-structured and well-explained.
  - Using [Google Places API](https://developers.google.com/maps/documentation/places/web-service/details) to get detailed operating restaurant information using [Google Map place_id](https://developers.google.com/maps/documentation/places/web-service/search-nearby). I choose this API because it is easy to embed and the documentations and tutorials are well-structured and well-explained. It can also be easily integrated with Google Gemini and Google Maps.
  - Using [Youtube Data API v3](https://developers.google.com/youtube/v3/docs/search/list) to get Youtube videoID for [embedding Youtube](https://www.youtube.com/watch?v=pdQ3X8Xa80o) recipe tutorial videos. I choose this API because Youtube has a huge of amount of recipe videos. It is the website that has the greatest possibility of finding the targeted recipe video.
- (2 points)
  - Using [Tailwind.css](https://tailwindcss.com/docs/installation) to style frontend. I chose this css framework because its abbreviations for CSS styles save time. Also, its functions such as focus and hover are useful as well as convenient.

10 points total out of 10 required points

## [Link to Initial Main Project File](/backend/app.mjs)

## Annotations / References Used

1. [Tailwind-CSS](https://tailwindcss.com/docs/installation) - (use tailwind for set up CSS)
2. [Gemini API](https://ai.google.dev/gemini-api/docs) - (Gemini API documentation)
3. [Google Maps API](https://developers.google.com/maps/documentation/embed/get-started) - (Embeded Google Maps implementation instructions)
4. [React](https://legacy.reactjs.org/docs/getting-started.html) - (React Manual)
5. [Official Icon](https://www.shutterstock.com/zh/image-vector/lottery-machine-line-style-icon-2498543717) Icon
6. [Mongodb documentation](https://www.mongodb.com/docs/manual/reference/method/)
7. [Youtube Data API v3 documentation](https://developers.google.com/youtube/v3/docs/search/list)
8. [Google Places API documentation](https://developers.google.com/maps/documentation/places/web-service/search-nearby)
9. [A Blog about Google Place Details and Place Photos API](https://afi.io/blog/google-place-details-and-place-photos-api/)
10. [React-router-Tutorial](https://www.youtube.com/watch?v=oTIJunBa6MA&t=134s)
11. [React useContext, useState, useEffect, useNavigate, useContext, createContext tutorial](https://www.youtube.com/watch?v=EBuGV_FQFao&list=PL_c9BZzLwBRKFRIBWEWYCnV4Lk9HE3eYJ)
12. [Authentication from HW 5](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/homework05-Rin-Qi/tree/main/src)
