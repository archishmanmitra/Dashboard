import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.models.js";

export const authenticateAdmin = async (req, res, next) => {
  const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authorization required'
    });
  }
    console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded._id).select('-password');

    if (!admin || admin.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin privileges required'
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};