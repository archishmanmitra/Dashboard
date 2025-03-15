import express from 'express'
import { Reviews} from '../models/reviews.models.js'
const router=express.Router()
router.get("/replied-reviews", async (req, res) => {
    try {
      const repliedReviews = await Reviews.find({}, "reviewId");
      const repliedReviewIds = repliedReviews.map((review) => review.reviewId);
      res.status(200).json(repliedReviewIds);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch replied reviews", error });
    }
  });
  
  // POST a new replied review ID
  router.post("/replied-reviews", async (req, res) => {
    const { reviewId } = req.body;
  
    try {
      const newRepliedReview = new Reviews({ reviewId });
      await newRepliedReview.save();
      res.status(201).json({ message: "Review marked as replied", reviewId });
    } catch (error) {
      res.status(500).json({ message: "Failed to mark review as replied", error });
    }
  });

  export default router