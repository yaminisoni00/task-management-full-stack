import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import { ERROR_TYPES } from "../error";
import { User } from "../models/user.model";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    // ATTACHING USER DETAILS TO THE REQUEST OBJECT
    req.user = { ...decodedToken, role: user.role, id: user._id, teamId: user.teamId};
  console.log('req.user: ', req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export const allowRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!roles.includes(userRole)) {
      return res.status(ERROR_TYPES.ACCESS_DENIED.code).json({ message: ERROR_TYPES.ACCESS_DENIED.message });
    }
    next();
  };
};