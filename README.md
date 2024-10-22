# AiContentGenerator

The `AiContentGenerator` package leverages OpenAI's API to generate AI-driven content, offering customizable options for integrating text-based generation capabilities into your application. This guide will walk you through the setup and usage of the content generator within your application.

## Installation

To install the package, run the following command:

```bash
npm install aicontentgenerator

Usage

// lib/contentGenerator.ts


import { OpenAI } from "aicontentgenerator";

/**
 * Define a set of tools (functions) to extend OpenAI's content generation capabilities.
 * Each tool represents a custom function with parameters and a trigger for execution.
 */
const tools = [
  {
    name: "generateBlogPost", // The name of the content generation function
    description: "Generates a blog post based on a given topic", // Description of the function
    parameters: {
      topic: "string", // Input parameters expected (e.g., topic for the blog post)
    },
    /**
     * Trigger the content generation function with specified arguments or OpenAI response.
     * @param {object} data - Contains arguments from the client or response from OpenAI.
     * @param {any} data.args - Additional arguments passed from the client.
     * @param {any} data.response - The response received from OpenAI's API.
     */
    trigger: async (data: { args?: any; response?: any } | void) => {
      // Function implementation logic for generating content
    },
  },
];

/**
 * Initialize and configure OpenAI with custom functions defined in the `tools` array.
 * The AI object contains all custom-defined tools that can be used to generate content.
 */
export const {
  openai, // The base OpenAI object configured with API key and options
  ...AI // A spread of all the custom-defined tools
} = OpenAI({
  configure: {
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!, // Set your OpenAI API key from the environment
    dangerouslyAllowBrowser: true, // Enable usage in browser environments
  },
  functions: tools, // Register the defined tools (custom content generation functions)
});

// components/contentGenerator.tsx
"use client";

import { useEffect, useState } from "react";
import { useContentGenerator } from "aicontentgenerator";
import { AI } from "@/lib/contentGenerator";

/**
 * ContentGenerator Component
 * This component enables a content generation interface allowing users to interact with the AI and generate text-based content.
 */
export function ContentGenerator() {
  const [topic, setTopic] = useState(""); // Input state for topic
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const { generatedContent, updateContent, clearContent } = useContentGenerator("generatedContent");

  /**
   * Form submission handler
   * This function handles the submission of the content generation request to the AI using the `AI.callContentGenerator` function.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    if (!topic.trim()) return; // Prevent sending empty topic

    setLoading(true); // Start loading state during API call

    // Call OpenAI API to generate content based on the topic
    const content = await AI.callContentGenerator({
      userMessage: topic, // The topic provided by the user
      args: { topic }, // Additional arguments such as the topic for the content
    });

    if (content) {
      updateContent(content); // Update the state with the generated content
      setTopic(""); // Clear the input after the topic is submitted
    }

    setLoading(false); // End loading state after the API call
  };

  return (
    <div>
      <h1>Generate AI Content</h1>

      {/* Display the generated content */}
      <div className="container h-60 w-full overflow-y-auto border py-4">
        {generatedContent ? (
          <div>
            <p>{generatedContent}</p>
          </div>
        ) : (
          <div className="flex h-full flex-1 items-center justify-center">
            <p>No Content Generated Yet</p>
          </div>
        )}
      </div>

      {/* Input for topic and controls */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)} // Update topic state
          placeholder="Enter topic..."
          disabled={loading} // Disable the input if loading
          className="min-h-20 w-full"
        />
        <div>
          <button
            type="button"
            onClick={clearContent}
            disabled={loading}
          >
            Clear Content
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Content"}
          </button>
        </div>
      </form>
    </div>
  );
}

GitHub: AndullahHassan ("https://github.com/abdallahelkhteeb")
Email: abdullahhassan1342002@gmail.com