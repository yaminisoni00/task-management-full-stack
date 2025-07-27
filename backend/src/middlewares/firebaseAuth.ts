import { Request, Response, NextFunction } from "express";
import admin from "../config/firebase";
import { User } from "../models/user.model";

export interface AuthRequest extends Request {
  user?: any;
}

export const firebaseAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: "User not found in system" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Firebase Auth Error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
