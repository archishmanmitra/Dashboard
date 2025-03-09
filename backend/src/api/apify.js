import { ApifyClient } from "apify-client";

const getReviews = async (req, res) => {
  try {
    const { url, reviewsStartDate } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }
    const client = new ApifyClient({
      token: process.env.APIFY_TOKEN,
    });

    const input = {
      startUrls: [
        {
          url: url || process.env.URL,
          method: "GET",
        },
      ],
      reviewsStartDate: reviewsStartDate || "2024-01-05",
      language: "en",
      personalData: true,
      reviewsSort: "newest",
    };

    // Run the actor
    const run = await client
      .actor("compass/google-maps-reviews-scraper")
      .call(input);

    // Get the data
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    // Process data for frontend
    const simplifiedReviews = items.map((item) => {
      // For place data
      if (item) {
        return {
          type: "placeInfo",
          name: item.name,
          title: item.title,
          totalScore: item.totalScore,
          reviewsCount: item.reviewsCount,
          address: item.address,
          author: item.author,
          stars: item.stars,
          text: item.text,
          publishedAtDate: item.publishedAtDate,
          publishAt: item.publishAt,
          reviewUrl: item.re,
        };
      }

      return item;
    });
    const reviewsByMonth = items.reduce((acc, item) => {
      if (item.publishedAtDate) {
        const days = item.publishedAtDate.substring(0, 10); // Extract "YYYY-MM-DD"
        acc[days] = (acc[days] || 0) + 1;
      }
      return acc;
    }, {});
    const reviewsChartData = Object.keys(reviewsByMonth).map((day) => ({
      day,
      reviews: reviewsByMonth[day],
    }));
    res.json({ simplifiedReviews, reviewsChartData });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

export { getReviews };
