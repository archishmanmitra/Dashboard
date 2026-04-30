import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateSentimentAnalysis = async (reviews) => {
  try {
    if (!reviews?.length) {
      throw new Error("No reviews provided for analysis");
    }

    // Cap at 25 reviews to stay within free-tier token limits
    const sample = reviews.slice(0, 25);

    const formattedReviews = sample
      .map(
        (review) =>
          `Rating: ${review.stars}/5\nReview: "${review.text ?? "no text available"}"\n`
      )
      .join("\n");

    const prompt = `You are a sentiment analysis AI. Analyze the following reviews all together. Explain in no more than 80 words. Do not mention any particular author and give a detailed overall analysis of the sentiments of the customers in one paragraph:\n\n${formattedReviews}\n\nExample response: The reviews express overwhelmingly positive sentiments. Customers highlight the good taste, reasonable prices, and positive staff interactions. The brevity and high ratings suggest a strong sense of satisfaction. Though some lack detailed explanations, the overall impression indicates a well-received dining experience.`;

    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    const analysis = response.text;

    if (!analysis) {
      throw new Error("No analysis returned from API");
    }

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