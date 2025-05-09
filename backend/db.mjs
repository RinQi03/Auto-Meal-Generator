import './config.mjs';
import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

mongoose.connect(process.env.DSN);

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  visitedRestaurants: {type:Object},
  cookedRecipe:{type:Object}
});

const RestaurantSchema = new mongoose.Schema({
  name: {type: String, required: true},
  placeId: {type: String, required: true},
  tags: {type: Object},
  phone: {type: String},
  website: {type: String},
  operationTime: {type:Object},
  rating: {type: Number},
  address: {type: String},
  photo_references_list: {type: Object},

});

const RecipeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  tags: {type: Object},
  ingredients: {type: Object},
  youtubeVideoId: {type:String},
  instructions: {type:Object}
});


UserSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=username%>'});
RestaurantSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=name%>'});
RecipeSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=name%>'});


mongoose.model('User', UserSchema);
mongoose.model('Restaurant', RestaurantSchema);
mongoose.model('Recipe', RecipeSchema);