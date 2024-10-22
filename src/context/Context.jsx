import React, { createContext, useState } from "react";
import run from "../config/Gemini"; // Assuming run is your Gemini API integration

// Create the context
const Context = createContext();

const ContextProvider = ({ children }) => {
  // State management
  const [input, setInput] = useState(""); // Current input from user
  const [recentPrompt, setRecentPrompt] = useState(""); // Last prompt sent
  const [prevPrompts, setPrevPrompts] = useState([]); // History of prompts
  const [showResult, setShowResult] = useState(false); // Whether to show the result
  const [loading, setLoading] = useState(false); // Loading state
  const [resultData, setResultData] = useState(""); // Data returned from the API
  const [errorMessage, setErrorMessage] = useState(null); // Error message state

  // Function to handle sending the input to the Gemini API
  const onSent = async (input) => {
    // Guard clause for empty input
    if (!input.trim()) {
      setErrorMessage("Please enter a prompt.");
      return;
    }

    // Reset states before making API call
    setLoading(true);
    setShowResult(false);
    setErrorMessage(null);
    setInput(""); // Clear the input field

    try {
      // Make the API call
      const result = await run(input);

      // Inspect the API response
      console.log("API Response:", result);

      // Build formatted response
      let formattedResponse = result || "No data available";

      // If result contains '**', format bold text and replace '*' with <br />
      formattedResponse = formattedResponse
        .split("**")
        .reduce((acc, curr, index) => acc + (index % 2 === 0 ? curr : `<b>${curr}</b>`), "")
        .split("*")
        .join("<br />");

      setResultData(formattedResponse); // Set the formatted response
      setShowResult(true); // Show the result

      // Append the current input to the history of previous prompts, avoiding duplicates
      if (!prevPrompts.includes(input)) {
        setPrevPrompts((prev) => [...prev, input]);
      }
      setRecentPrompt(input); // Set the recent prompt

    } catch (error) {
      console.error("Error fetching data from Gemini API:", error);
      setErrorMessage("There was an issue fetching the data. Please try again.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Function to handle starting a new chat
  const newChat = () => {
    setLoading(false); // Stops any loading state
    setShowResult(false); // Hides the result view
    setInput(""); // Clear the input field
    setResultData(""); // Clear the result data
    setErrorMessage(null); // Clear any previous error messages
  };

  // Context value object provided to consumers
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    errorMessage,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

// Export both the context and the provider
export { Context, ContextProvider };
