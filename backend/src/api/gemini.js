export const generateSentimentAnalysis = (reviews) => {
  if (!reviews?.length) {
    return { success: false, error: "No reviews provided" };
  }

  const total = reviews.length;
  const positive = reviews.filter((r) => r.stars >= 4).length;
  const neutral = reviews.filter((r) => r.stars === 3).length;
  const negative = reviews.filter((r) => r.stars <= 2).length;

  const avgStars = (
    reviews.reduce((sum, r) => sum + (r.stars || 0), 0) / total
  ).toFixed(1);

  const posPercent = Math.round((positive / total) * 100);
  const negPercent = Math.round((negative / total) * 100);
  const neuPercent = Math.round((neutral / total) * 100);

  let tone;
  if (posPercent >= 70) tone = "overwhelmingly positive";
  else if (posPercent >= 50) tone = "generally positive";
  else if (negPercent >= 50) tone = "predominantly negative";
  else tone = "mixed";

  let closing;
  if (posPercent >= 70)
    closing = "a well-received experience with strong customer loyalty potential";
  else if (posPercent >= 50)
    closing = "a satisfactory experience with clear room for improvement";
  else
    closing = "significant areas requiring attention to improve customer satisfaction";

  const neutralClause = neuPercent > 0 ? `, and ${neuPercent}% were neutral with 3 stars` : "";

  const rawAnalysis = `Based on ${total} reviews with an average rating of ${avgStars}/5, overall customer sentiment is ${tone}. ${posPercent}% of customers gave 4–5 stars reflecting strong satisfaction, while ${negPercent}% expressed dissatisfaction with 1–2 stars${neutralClause}. The rating distribution suggests ${closing}.`;

  return { success: true, rawAnalysis };
};
