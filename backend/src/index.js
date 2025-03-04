// server.js
import express from 'express';
import { ApifyClient } from 'apify-client';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Create the API endpoint
app.get('/api/reviews', async (req, res) => {
  try {
    const client = new ApifyClient({
      token: 'apify_api_mYE768NcuWmCx6C8N5YmGegdmgtC630Tlg2u',
    });

    const input = {
      "startUrls": [
        {
          "url": "https://www.google.com/maps/place/S+D+FASHION/@22.6674352,88.3742254,17z/data=!3m1!4b1!4m6!3m5!1s0x39f89dd782b667f5:0x7f3f576143ac63d0!8m2!3d22.6674352!4d88.3742254!16s%2Fg%2F11v1b32_51?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D",
          "method": "GET",
        }
      ],
      "maxReviews": 20,
      "language": "en",
      "personalData": true,
      "reviewsSort": "newest"
    };

    // Run the actor
    const run = await client.actor("compass/google-maps-reviews-scraper").call(input);
    
    // Get the data
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    
    // Process data for frontend
    const simplifiedReviews = items.map(item => {
      // For place data
      if (item) {
        return {
          type: 'placeInfo',
          name: item.name,
          title:item.title,
          totalScore: item.totalScore,
          reviewsCount: item.reviewsCount,
          address: item.address,
          author: item.author,
          stars: item.stars,
          text: item.text,
          publishedAtDate: item.publishedAtDate,
          publishAt: item.publishAt,
        };
      } 
      
      return item;
    });
    
    res.json(simplifiedReviews);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});