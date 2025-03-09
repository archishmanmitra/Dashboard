import express from "express";
import { authenticateAdmin } from "../middleware/auth.middleware.js";
import EventModel from "../models/event.models.js";

const router = express.Router();

// Protected admin route example
router.get('/stats', authenticateAdmin, async (req, res) => {
  try {
    const stats = {
      totalScans: await EventModel.countDocuments({ type: 'scan' }),
      totalClicks: await EventModel.countDocuments({ type: 'buttonClick' })
    };
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;