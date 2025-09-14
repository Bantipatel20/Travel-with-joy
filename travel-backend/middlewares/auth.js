// Fix your middlewares/auth.js:
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

export const auth = async (req, res, next) => {
  try {
    // Fix: Use req.headers instead of req.header
    const authheader = req.headers.authorization || req.headers.Authorization;

    if (!authheader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: No token provided"
      });
    }

    const token = authheader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token format"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fix: Use decoded.id instead of decoded._id
    req.user = { id: decoded.id, role: decoded.role };
    
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(403).json({
      message: "Invalid or expired token"
    });
  }
};

export const adminonly = async (req, res, next) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: Admin access required"
      });
    }
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({
      message: "Server error in admin check"
    });
  }
};
