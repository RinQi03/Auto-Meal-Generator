import {getVisitedRestaurants,getCookedRecipe} from './mongodbHelper.js'

export async function translateRest(prompt){
    let visitedRestaurants = await getVisitedRestaurants (prompt.username).then((restaurants) => {
        return (restaurants);
    });
    // let visitedRestaurants = "";

    if (prompt.randomize === true){
        return (String(
            "Hi Gemini, I don't know what to eat for my next meal. Please pick a restaurant in Manhattan for me!"
            + "I've been to these restaurants, please don't recommand them again:" + visitedRestaurants
            +`Please generate the text using this JSON schema:
    
                Info = {'restaurantName': string, "Area" : string, "latitudeOfArea" : number, "longtitudeOfArea" : number, "phoneNumber": string, "operatingHours": string, "tags": array}
                Return: Info`
    
            +"in which tags are the tags people use to recognize the restaurant (e.g. vegan, pet-friendly, Japanese etc.) "
            +"If you cannot find a restaurant that matches all my preference, then just find one that is close. You must replied in JSON format. Thanks!")
        )
    }
    else{
        const pref = prompt.preference;
        const location = (prompt.location === undefined)? "The location of the restaurant must be in Manhattan." : "I want to eat at any of these locations in Manhattan, New York: "+ prompt.location + ".";
        const note = prompt.note;
        const type = "I am looking for a restaurant to have my next meal."
        let cost = ""
        if (prompt.cost === 0){
            cost = "";
        }else if (prompt.cost === 200){
            cost = "The cost per person should be more than $200.";
        }else{
            cost = "The cost per person should be around $"+ prompt.cost + ".";
        }
    
        return (
            "Hi Gemini, "+type+" "+location+" "+note+" "+cost +" These are my preference: "+ pref + ". Please choose a restaurant for me!"
            + "I've been to these restaurants, please don't recommand them again:" + visitedRestaurants
            +`Please generate the text using this JSON schema:
    
                Info = {'restaurantName': string, "Area" : string, "latitudeOfArea" : number, "longtitudeOfArea" : number, "phoneNumber": string, "operatingHours": string, "tags": array}
                Return: Info`
    
            +"in which tags are the tags people use to recognize the restaurant (e.g. vegan, pet-friendly, Japanese etc.) "
            +"If you cannot find a restaurant that matches all my preference, then just find one that is close. You must replied in JSON format. Thanks!"
        )
    }
    

}

export async function translateRec(prompt){
    let cookedRecipes = await getCookedRecipe (prompt.username).then((recipes) => {
        return (recipes);
    });
    // let visitedRestaurants = "";

    if (prompt.randomize === true){
        return (String(
            "Hi Gemini, I don't know what to eat for my next meal. Please pick a recipe for me!"
            + "I've cooked these recipes, please don't recommand them again: One-Pan Lemon Herb Roasted Chicken and Vegetables, Shrimp Scampi with Zucchini Noodles" + cookedRecipes
            +`Please generate the text using this JSON schema:
    
                Info = {'recipeName': string, "tags": array, "ingredients": object, "stepsToCook": string}
                Return: Info`
    
            +"in which tags are the tags people use to recognize the recipe (e.g. vegan, Korean, Japanese etc.) "
            // +"and linksOfRecipe is a array of several URL links to the recipe"
            +"and please divide the ingredients into three parts: vegetable, meat, and others. give them to me as a array. For example: ingredients: {vegetable: [corn, carrots,...], meat: [pork loin, chicken thighs,...], others: [white miso paste, sake, ginger, garlic,...]}. I do not need the quantity of each ingredient. please reply with only the name of it."
            +"If you cannot find a recipe that matches all my preference, then just find one that is close. You must replied in JSON format. Thanks!")
        )
    }
    else{
        const pref = prompt.preference;
        const ingredients = (prompt.ingredients === undefined)? "" : "The ingredients of this recipe should include: "+ prompt.ingredients + ".";
        const note = prompt.note;
        const type = "I am looking for a recipe to cook for my next meal."
        let cost = ""
        if (prompt.cost === 0){
            cost = "";
        }else if (prompt.cost === 100){
            cost = "The cost per person should be more than $100.";
        }else{
            cost = "The cost per person should be around $"+ prompt.cost + ".";
        }
    
        return (
            "Hi Gemini, "+type+" "+note+" "+cost +" These are my preference: "+ pref + ". "+ingredients+ " Please choose a recipe for me!"
            + "I've cooked these recipes, please don't recommand them again: One-Pan Lemon Herb Roasted Chicken and Vegetables," + cookedRecipes
            +`Please generate the text using this JSON schema:
    
                Info = {'recipeName': string, "tags": array, "ingredients": object, "stepsToCook": string}
                Return: Info`
    
            +"in which tags are the tags people use to recognize the recipe (e.g. vegan, Korean, Japanese etc.) "
            +"and please divide the ingredients into three parts: vegetable, meat, and others. give them to me as a array. For example: ingredients: {vegetable: [corn, carrots,...], meat: [pork loin, chicken thighs,...], others: [white miso paste, sake, ginger, garlic,...]}. I do not need the quantity of each ingredient. please reply with only the name of it."
            // +"and linksOfRecipe is a array of several URL links to the recipe"
            +"If you cannot find a recipe that matches all my preference, then just find one that is close. You must replied in JSON format. Thanks!"
        )
            
    }
    

}