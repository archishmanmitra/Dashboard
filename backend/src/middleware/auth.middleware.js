import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.models.js";

export const authenticateAdmin = async (req, res, next) => {
  try {
    // 1. Token extraction improvements
    const token = req.cookies.token || (
      req.headers.authorization 
        ? req.headers.authorization.replace('Bearer ', '')
        : null
    );

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // 2. Verify token with error handling
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Database lookup with proper error handling
    const admin = await Admin.findById(decoded._id)
      .select('-password')
      .lean();

    if (!admin) {
      return res.status(403).json({
        success: false,
        message: 'Admin account not found'
      });
    }

    // 4. Role validation
    if (admin.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Insufficient privileges'
      });
    }

    // 5. Attach user to request
    req.admin = admin;
    next();

  } catch (error) {
    // 6. Enhanced error handling
    let message = 'Invalid token';
    
    if (error instanceof jwt.TokenExpiredError) {
      message = 'Session expired';
    } else if (error instanceof jwt.JsonWebTokenError) {
      message = 'Invalid token format';
    }

    return res.status(401).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};