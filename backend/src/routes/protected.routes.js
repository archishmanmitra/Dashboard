import express from 'express';
import { authenticateAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected home page route
router.get('/protected', authenticateAdmin, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the protected home page!',
    user: {
      id: req.admin._id,
      username: req.admin.username
    }
  });
});

export default router;