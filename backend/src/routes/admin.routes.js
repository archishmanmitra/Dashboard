import express from "express";
import { Admin } from "../models/admin.models.js"; // Adjust the path as needed

const router = express.Router();

// Get milestone for specific place
router.get('/:placeId', async (req, res) => {
  try {
    const admin = await Admin.findOne({ role: 'admin' });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const placeData = admin.milestones.get(req.params.placeId) || {
      current: "Beginner",
      previous: null
    };

    res.status(200).json(placeData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch milestone' });
  }
});

// Update milestone for specific place
router.post('/:placeId', async (req, res) => {
  try {
    const { newMilestone } = req.body;
    const admin = await Admin.findOne({ role: 'admin' });
    
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const currentData = admin.milestones.get(req.params.placeId) || {
      current: "Beginner",
      previous: null
    };

    // Only update if milestone changes
    if (newMilestone !== currentData.current) {
      admin.milestones.set(req.params.placeId, {
        current: newMilestone,
        previous: currentData.current
      });
      await admin.save();
    }

    res.status(200).json(admin.milestones.get(req.params.placeId));
  } catch (error) {
    res.status(500).json({ error: 'Failed to update milestone' });
  }
});

export default router;