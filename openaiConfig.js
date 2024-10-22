// import { GoogleAIClient } from "@google/generative-ai"; // Import the correct class
// const dotenv = require("dotenv");

// // Load the .env file
// dotenv.config({ path: "./config.env" });

// // Initialize the Google AI API client
// const genAI = new GoogleAIClient({
//   apiKey: process.env.API_KEY, // Use the API key from .env
// });

// module.exports = genAI;

const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

// Load the .env file
dotenv.config({ path: "./config.env" });

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports = model;


// const { GoogleGenerativeAI } = require("@google/generative-ai");
// // import  { GoogleGenerativeAI } from "@google/generative-ai";
// const dotenv = require("dotenv");

// // Load the .env file
// dotenv.config({ path: "./config.env" });

// // Initialize the OpenAI API client
// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY, // Use the API key from .env
// // });

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// module.exports = genAI;
