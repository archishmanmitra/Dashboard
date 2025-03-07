import express from "express";
import { ApifyClient } from "apify-client";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/dbConfig.js";
dotenv.config({});
const app = express();
const port = process.env.PORT||3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Create the API endpoint
app.get("/api/reviews", async (req, res) => {
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
      reviewsStartDate: reviewsStartDate || '2024-01-05',
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
          reviewUrl: item.re
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
});

// API to log a scan
app.post('/api/log-scan', async (req, res) => {
  try {
    // Find the document or create it if it doesn't exist
    let scanData = await ScanModel.findOne();
    if (!scanData) {
      scanData = new ScanModel();
    }
    scanData.scans += 1; // Increment scan count
    await scanData.save();
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// API to log a button click
app.post('/api/log-button-click', async (req, res) => {
  try {
    let scanData = await ScanModel.findOne();
    if (!scanData) {
      scanData = new ScanModel();
    }
    scanData.buttonClicks += 1; // Increment button click count
    await scanData.save();
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// API to get scan and button click counts
app.get('/api/get-counts', async (req, res) => {
  try {
    let scanData = await ScanModel.findOne();
    if (!scanData) {
      scanData = { scans: 0, buttonClicks: 0 }; // Default values if no data exists
    }
    res.send({ scanCount: scanData.scans, buttonClickCount: scanData.buttonClicks });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// Database connection Here: 

connectDB()
.then(() => {
  console.log("Database connection established");
  app.listen(port, () => {  console.log(`Server running on port ${port}`);});
})
.catch((err) => {
  console.error("Error connecting to database: ", err);
});