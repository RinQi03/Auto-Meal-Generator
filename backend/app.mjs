import './db.mjs';
import mongoose from 'mongoose';
import express from 'express'
import session from 'express-session';
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors';
import * as auth from './auth.mjs';
import {run, runRecipe} from './ai_generator.js';
import { translateRest, translateRec } from './translate.js';
import { addVisitedRestaurant, addRestaurant,addCookedRecipe, addRecipe, getNumInFileRestaurants, getNumInFileRecipes, getNumInFileUsers} from './mongodbHelper.js';




const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendURL = ("http://"+process.env.FRONTEND_DOMAIN +":"+ process.env.FRONTEND_PORT).toString();
console.log("frontendURL:" + frontendURL);
const corsOptions = {
  origin: [frontendURL],
  credentials: true
};


//app.use(bodyParser);
app.use(express.json());
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, 
    secure: false, 
    maxAge: 1000 * 60 * 60 * 24, 
  },
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});
// app.use((req, res, next) => {
//   console.log('Session ID:', req.session.id);
//   console.log('Session Data:', req.session);
//   next();
// });




app.use(express.urlencoded({ extended: false }));




app.get('/api/connect/express', (req, res) => {
    res.json({"users": ["express", "2", "3"]});
});

app.get('/', (req, res) => {
    res.json({"home": ["home", "2", "3"]})
});


app.get("/api/connect/talktoai", (req,res)=>{
    console.log(req.body);
    res.json({"message":"get Submitted"});
})

app.post("/api/connect/talktoai", async (req,res)=>{
    const prompt = req.body.JSONPrompt;
    console.log("req.body",prompt);
    const aiRes = await run(prompt);
    console.log("aiRes:",aiRes);
    res.json({"aiRes":aiRes});
})

app.get("/api/connect/register", (req,res)=>{
    console.log(req.body);
    res.json({"message":"register get method"});
})

app.post("/api/connect/register", async (req,res)=>{
  const input = req.body;
  const username = input.username;
  const email = input.email;
  const password = input.password;
  try {
    const newUser = await auth.register(
      username,
      email,
      password
    );
    
    await auth.startAuthenticatedSession(req, newUser);
    console.log("no err");
    res.json({currentUser:newUser.username}); 
  } catch(err) {
    console.log("err in body:",err);
    res.json({message: err.message ?? 'Registration error'}); 
  }
})

app.get("/api/connect/login", (req,res)=>{
  console.log(req.body);
  res.json({"message":"login get method"});
})

app.post('/api/connect/login', async (req, res) => {
  const input = req.body;
  const username = input.username;
  const password = input.password;

  try {
    const user = await auth.login(
      username, 
      password
    );
    await auth.startAuthenticatedSession(req, user);
    res.json({currentUser:user.username})
  //   res.redirect('/'); 
  } catch(err) {
    console.log(err);
    res.json({"message": err.message ?? 'Login unsuccessful'}); 
  }
});


app.get("/api/connect/restaurant-pref", (req,res)=>{
  console.log(req.body);
  res.json({"message":"restaurant-pref get method"});
})

app.post("/api/connect/restaurant-pref", async (req,res)=>{
  const requirement = req.body;
  console.log("got message");
  try {
    const prompt = await translateRest(requirement);
    console.log(prompt)
    console.log("");
    const RestInfo = await run(prompt);
    // console.log("RestInfo:::::::::::",RestInfo.name)
    console.log("RestInfo:----",RestInfo)
    console.log("requirement:----",requirement)


    if (requirement.username !== "Guest"){
      console.log("RestInfo:----",RestInfo.name)
      await addVisitedRestaurant (requirement.username, RestInfo.name);
      await addRestaurant(RestInfo);
    }
    res.json({"RestaurantInfo":RestInfo});
  } catch(err) {
    console.log(err);
    res.json({"message": err.message ?? 'Generate Restaurant unsuccessful'}); 
  }
})

app.get("/api/connect/recipe-pref", (req,res)=>{
  console.log(req.body);
  res.json({"message":"recipe-pref get method"});
})

app.post("/api/connect/recipe-pref", async (req,res)=>{
  const requirement = req.body;
  // console.log("got message");
  try {
    const prompt = await translateRec(requirement);
    console.log("promptkjdslf",prompt)
    // console.log("");
    const RecipeInfo = await runRecipe(prompt);
    console.log("RecipeInfo:::::::::::pref",RecipeInfo)
    if (requirement.username !== "Guest"){
      await addCookedRecipe (requirement.username, RecipeInfo.recipeName);
      await addRecipe(RecipeInfo);
    }
    res.json({"RecipeInfo":RecipeInfo});
  } catch(err) {
    console.log(err);
    res.json({"message": err.message ?? 'Generate Recipe unsuccessful'}); 
  }
})

app.get("/api/connect/home", (req,res)=>{
  console.log(req.body);
  res.json({"message":"restaurant-pref get method"});
})

app.post("/api/connect/home", async (req,res)=>{
  const requirement = req.body;
  console.log("got message");
  try {
    let prompt = "";

    if (requirement.type === "restaurant"){
      prompt = await translateRest(requirement).then((res)=> (res));

      const RestInfo = await run(prompt);
      console.log("RestInfo:::::::::::",RestInfo.name)
      console.log("Username:::::::::::",requirement)
  
      if (requirement.username !== "Guest" && requirement.type === "restaurant"){
        await addVisitedRestaurant (requirement.username, RestInfo.name);
        await addRestaurant(RestInfo);
      }

      res.json({"RestaurantInfo":RestInfo});
    }else if (requirement.type === "recipe"){

      prompt = await translateRec(requirement).then((res)=> (res));

      console.log("prompt::inrec:::",prompt)
      console.log("requiment::inrec:::",requirement)

      const RecipeInfo = await runRecipe(prompt);

      console.log("RecInfo:::::::::::",RecipeInfo)
      console.log("Username:::::::::::",requirement.username)

      if (requirement.username !== "Guest" && requirement.type === "recipe"){
        await addCookedRecipe (requirement.username, RecipeInfo.recipeName);
        await addRecipe(RecipeInfo);
      }
      res.json({"RecipeInfo":RecipeInfo});
    }    
  } catch(err) {
    console.log(err);
    res.json({"message": err.message ?? 'Generate Restaurant unsuccessful'}); 
  }

})

app.get("/api/connect/about", async (req,res)=>{
  console.log(req.body);
  // res.json({"message":"get Submitted"});
  const restNum = await getNumInFileRestaurants().then((res)=> (res));
  const recipeNum = await getNumInFileRecipes().then((res)=> (res));
  const userNum = await getNumInFileUsers();


  console.log("restNum", typeof restNum);
  console.log("recipeNum", typeof recipeNum);
  console.log("userNum", typeof userNum);

  res.json({"stats": {restNum:restNum, recipeNum:recipeNum, userNum:userNum}});
})





app.listen(process.env.BACKEND_PORT ?? 3000, () => console.log("Starting server in "+process.env.BACKEND_PORT));
