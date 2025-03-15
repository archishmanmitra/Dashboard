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
          }/5)\nReview: "${review.text ?? "no text available"}"\n`
      )
      .join("\n");
    // Create prompt
    const prompt = `
      You are a sentiment analysis AI. Analyze the following reviews all together, along with a brief analysis. Explain in no more than 80 words.Do not mention any particular author and give a detailed overall analysis of the sentiments of the customers of a restaurant in one paragraph:${formattedReviews} 
      An example of the response i expect from you : The reviews express overwhelmingly positive sentiments towards the restaurant. Customers highlight the good taste, reasonable prices, and positive staff interactions. The brevity and high ratings suggest a strong sense of satisfaction. Though some lack detailed explanations, the overall impression indicates a well-received dining experience 
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
