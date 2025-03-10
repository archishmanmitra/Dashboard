import express from 'express';
import { Admin } from '../models/admin.models.js'; // Adjust the path as needed

const router = express.Router();

// Fetch milestone
router.get('/get-milestone', async (req, res) => {
  try {
    const admin = await Admin.findOne({ role: 'admin' });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json({ milestone: admin.milestone });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch milestone' });
  }
});

// Update milestone
router.post('/update-milestone', async (req, res) => {
  const { milestone } = req.body;
  try {
    const admin = await Admin.findOneAndUpdate(
      { role: 'admin' },
      { milestone },
      { new: true }
    );
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json({ milestone: admin.milestone });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update milestone' });
  }
});

export default router;