// Import the necessary dependencies
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

// Access the API key from environment variables
const apiKey = import.meta.env.VITE_API_KEY;

// Initialize the generative AI with the API key
const genAI = new GoogleGenerativeAI(apiKey);

// Get the generative model
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

// Configuration for generation
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    // Start a chat session with the model
    const chatSession = model.startChat({
        generationConfig,
        history: [],  // You may want to manage chat history if needed
    });

    try {
        // Send the message and wait for a response
        const result = await chatSession.sendMessage(prompt);
        
        // Log the response text to the console
        console.log(result.response.text());

        // Return the response text
        return result.response.text();  // Ensure you access the text correctly
    } catch (error) {
        console.error("Error in sending message to the model:", error);
        throw error;  // Rethrow the error to be handled in the calling function
    }
}

export default run;
