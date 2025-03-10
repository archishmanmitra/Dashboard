import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Sample reviews data
const reviews = [
  {
    author: "John Doe",
    rating: 5,
    text: "Amazing experience! The food was great and the service was outstanding.",
  },
  {
    author: "Jane Smith",
    rating: 2,
    text: "The place was too crowded, and the service was very slow.",
  },
  {
    author: "Mike Johnson",
    rating: 4,
    text: "Good atmosphere and friendly staff, but the food took a while to arrive.",
  },
];

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Create async function to analyze reviews
async function analyzeSentiments() {
  try {
    // Format reviews
    const formattedReviews = reviews
      .map(
        (review) =>
          `Author: ${review.author}\nRating: ${"⭐".repeat(review.rating)} (${
            review.rating
          }/5)\nReview: "${review.text}"\n`
      )
      .join("\n");

    // Create prompt
    const prompt = `You are a sentiment analysis AI. Analyze the following reviews all together, along with a brief analysis.\n Explain in no more than 80 words.\nDo not mention any particular author give a detailed overall analysis of the sentiments of the customers of a restaurant:\n\n${formattedReviews}`;

    // Get the model (use correct model name)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro", // Updated model name
    });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
}

// Add endpoint
app.get("/analyze", async (req, res) => {
  try {
    const analysis = await analyzeSentiments();
    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ error: "Analysis failed" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
