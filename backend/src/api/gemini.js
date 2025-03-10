import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateSentimentAnalysis = async (reviews) => {
  try {
    // Validate input
    if (!reviews?.length) {
      throw new Error("No reviews provided for analysis");
    }
    // Default options
    // Format reviews
    const formattedReviews = reviews
      .map(
        (review) =>
          `Author: ${review.name}\nRating: ${"⭐".repeat(review.stars)} (${
            review.rating
          }/5)\nReview: "${review.text?? 'no text available'}"\n`
      ).join("\n");
    // Create prompt
    const prompt = `
      You are a sentiment analysis AI. Analyze the following reviews all together, along with a brief analysis.\n Explain in no more than 80 words.\nDo not mention any particular author give a detailed overall analysis of the sentiments of the customers of a restaurant:\n\n${formattedReviews};
    `;

    // Generate analysis
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const analysis = await result.response.text();

    return {
      success: true,
      rawAnalysis: analysis,
    };
  } catch (error) {
    console.error("Sentiment analysis failed:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
