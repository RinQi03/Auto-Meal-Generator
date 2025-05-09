import './db.mjs';
import mongoose from 'mongoose';

const User = mongoose.model('User');
const Restaurant = mongoose.model('Restaurant');
const Recipe = mongoose.model('Recipe');

function translateInstructions (instructions){
  const regex = /(\d+\.\s)/g;

  const parts = instructions.split(regex);

  const formattedInstructions = [];
  for (let i = 1; i < parts.length; i += 2) {
      formattedInstructions.push(parts[i] + parts[i + 1].trim());
  }

  return formattedInstructions;
}

export async function addVisitedRestaurant (username, restaurant) {
    try {
      console.log(username,"went to",restaurant)
      const updatedUser = await User.findOneAndUpdate(
        {username: username},
        { $push: { visitedRestaurants: restaurant } }, 
        { new: true } 
      );
  
      console.log('Updated User:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error adding visited restaurant:', error);
    }
};

export async function getVisitedRestaurants (username){
    try {
      const user = await User.findOne(
        { username }, 
        { visitedRestaurants: 1, _id: 0 } 
      );
  
      if (!user) {
        console.log('User not found');
        return " ";
      }
  
      // console.log('Visited Restaurants:', user.visitedRestaurants);
      return user.visitedRestaurants;
    } catch (error) {
    console.error('Error fetching visited restaurants:', error);
    throw error;
    }
};

export async function addRestaurant (result){
  const placeId = (result["place_id"] === undefined) ? "Unavailable" : result["place_id"];
  const RestaurantName = (result.name === undefined) ? "Unavailable" : result.name;
  const website = (result.website === undefined) ? "Unavailable" : result.website;
  const operatingHours = (result["opening_hours"]  === undefined) ? result["opening_hours"]["weekday_text"]
  : "Operating hours unavailable";
  const address = (result.formatted_address === undefined) ? "Unavailable" : result.formatted_address;
  const phone = (result.formatted_phone_number === undefined) ? "Unavailable" : result.formatted_phone_number;
  const starRate = Number(result.rating);
  const tagList = result.tags;
  const photoList = (result.photos === undefined) ? "Unavailable" : result.photos.map(photo => photo.photo_reference);

  await Restaurant.find({placeId: placeId})
    .then(foundData => {
      //console.log("foundData:"foundData);
      if (foundData.length!==0){
        return "Restaurant already exists";
      }
    }
  )
  const newRestaurant = new Restaurant({
    name: RestaurantName,
    placeId: placeId,
    tags: tagList,
    phone: phone,
    website: website,
    operationTime: operatingHours,
    rating: starRate,
    address: address,
    photo_references_list: photoList,
  })
  await newRestaurant.save();
  return newRestaurant;
}

export async function addCookedRecipe (username, recipe) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      {username},
      { $push: { cookedRecipe: recipe } }, 
      { new: true } 
    );

  //   console.log('Updated User:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error adding cooked Recipe:', error);
  }
};

export async function getCookedRecipe (username){
  try {
    const user = await User.findOne(
      { username }, 
      { cookedRecipe: 1, _id: 0 } 
    );

    if (!user) {
      console.log('User not found');
      return " ";
    }

    return user.cookedRecipe;
  } catch (error) {
    console.error('Error fetching cooked recipes:', error);
  throw error;
  }
};

export async function addRecipe (result){
  
  const recipeName = (result.recipeName === undefined) ? "Unavailable" : result.recipeName;
  const ingredients = (result.ingredients === undefined) ? "Unavailable" : result.ingredients;
  let stepsToCook = (result.stepsToCook === undefined) ? "Unavailable" : result.stepsToCook;
  const youtubeVideoId = (result.youtubeVideoId === undefined) ? "Unavailable" : result.youtubeVideoId;
  const tagList = result.tags;

  stepsToCook = translateInstructions(stepsToCook);

  // const photoList = (result.photos === undefined) ? "Unavailable" : result.photos.map(photo => photo.photo_reference);

  await Recipe.find({name: recipeName})
    .then(foundData => {
      //console.log("foundData:"foundData);
      if (foundData.length!==0){
        return "Restaurant already exists";
      }
    }
  )

  const newRecipe = new Recipe({
    name: recipeName,
    tags: tagList,
    ingredients: ingredients,
    youtubeVideoId: youtubeVideoId,
    instructions: stepsToCook,
  })
  await newRecipe.save();
  return newRecipe;
}


export async function getNumInFileRestaurants (){
  try {
    const num = await Restaurant.countDocuments({}).then((res)=> (res));

    // console.log('Restaurants in file:', num);
    return num;
  } catch (error) {
    console.error('Error getting number of restaurants in file:', error);
  throw error;
  }
};

export async function getNumInFileRecipes (){
  try {
    const num = await Recipe.countDocuments({}).then((res)=> (res));

    // console.log('Recipe in file:', num);
    return num;
  } catch (error) {
    console.error('Error getting number of restaurants in file:', error);
  throw error;
  }
};

export async function getNumInFileUsers (){
  try {
    const num = await User.countDocuments({}).then((res)=> (res));

    // console.log('Users in file:', num);
    // console.log(typeof num);

    return num;
  } catch (error) {
    console.error('Error getting number of restaurants in file:', error);
  throw error;
  }
};