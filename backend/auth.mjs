import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';


const User = mongoose.model('User');

const register = async (username, email, password) => {
    if (username.length<=2 || password.length<=4){
      throw ({message: "USERNAME OR PASSWORD TOO SHORT"});
    }
    await User.find({username: username})
      .then(foundData => {
        //console.log("foundData:"foundData);
        if (foundData.length!==0){
          throw ({message: 'USERNAME ALREADY EXISTS'});
        }
      });
      
  
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
  
    const newUser = new User({
      username: username, 
      password: hash, 
      email: email, 
      visitedRestaurants: [],
      cookedRecipe:[]
    });
    //console.log("new User Type:", typeof newUser)
    await newUser.save();
    
  
    return newUser;
};
  
const login = async (username, password) => {
    const findingUser = async (name) => {
      const tempFoundUser = await User.find({username:name});
      return tempFoundUser;
    };
  
    const foundUser = await findingUser(username);
  
    if (foundUser.length === 0){
      throw ({message: "USER NOT FOUND"});
    }
  
    //console.log("foundUserpw:",foundUser[0].get("password"));
    
    if (bcrypt.compareSync(password,foundUser[0].get("password"))){
      return foundUser[0];
    }
    else{
      throw ({message: "PASSWORDS DO NOT MATCH"});
    }
};

//code from hw 5
//credit Professor Versora
const startAuthenticatedSession = (req, user) => {
    return new Promise((fulfill, reject) => {
      req.session.regenerate((err) => {
        if (!err) {
          req.session.user = user; 
          fulfill(user);
        } else {
          reject(err);
        }
      });
    });
  };
  
  const endAuthenticatedSession = req => {
    return new Promise((fulfill, reject) => {
      req.session.destroy(err => err ? reject(err) : fulfill(null));
    });
  };


export {
    startAuthenticatedSession,
    endAuthenticatedSession,
    register,
    login
  };