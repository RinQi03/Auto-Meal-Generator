import {DynamicRetrievalMode,GoogleGenerativeAI} from "@google/generative-ai";
import './config.mjs';
import getRestDetails from './extractRestDetails.js'
import { youtubeExtractor } from "./youtubeExtractor.js";

function extractJsonContent(input) {
    const jsonMatch = input.match(/```json([\s\S]*?)```/);
    
    if (jsonMatch && jsonMatch[1]) {
        try {
            const jsonData = JSON.parse(jsonMatch[1].trim());
            return jsonData;
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
        }
    } else {
        console.error("No JSON content found.");
        return null;
    }
}


export async function run(prompt){
  console.log(process.env.GEMINI_API_KEY);
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel(
    {
      model: "models/gemini-1.5-flash",
      // tools: [
      //   {
      //     googleSearchRetrieval: {
      //       dynamicRetrievalConfig: {
      //         mode: DynamicRetrievalMode.MODE_DYNAMIC,
      //         dynamicThreshold: 0.4,
      //       },
      //     },
      //   },
      // ],
    },
    { apiVersion: "v1beta" },
  );

  try{
    const result = await model.generateContent(prompt);
    // console.log(result.response.candidates[0].groundingMetadata);
    // console.log("body:", result.response.candidates[0].content)
    // console.log(result.response.text());

    const JSONResult = extractJsonContent(result.response.text());
    // console.log("JSONResult: ",JSONResult);
    const tags = JSONResult.tags;

    const details = await getRestDetails(JSONResult.restaurantName, JSON.latitudeOfArea, JSON.longtitudeOfArea);
    details.tags = tags;

    console.log("______________")
    return(details);

  }catch (error){
    console.log("error in Gen AI", error);
  }
//   console.log(result.response.candidates[0].groundingMetadata);
}

export async function runRecipe(prompt){
  
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel(
    {
      model: "models/gemini-1.5-flash",
      // tools: [
      //   {
      //     googleSearchRetrieval: {
      //       dynamicRetrievalConfig: {
      //         mode: DynamicRetrievalMode.MODE_DYNAMIC,
      //         dynamicThreshold: 1,
      //       },
      //     },
      //   },
      // ],
    },
    { apiVersion: "v1beta" },
  );

  try{
    const result = await model.generateContent(prompt);
    // console.log(result.response.candidates[0]);
    // console.log("body:", result.response.candidates[0].content)
    console.log(result.response.text());

    let JSONResult = extractJsonContent(result.response.text());
      if (JSONResult["Info"]!== undefined){
        JSONResult = JSONResult["Info"];
      }
    console.log("JSONResult: ",JSONResult);


    const youtubeId = await youtubeExtractor(JSONResult.recipeName);
    JSONResult.youtubeVideoId = youtubeId;

    console.log("______________")
    return(JSONResult);

  }catch (error){
    console.log("error in Gen AI", error);
  }
//   console.log(result.response.candidates[0].groundingMetadata);
}



