import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/express";

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "No token" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };

    req.user = decoded;

    next();
  } catch (err) {
    console.log("JWT ERROR:", err);
    return res.status(401).json({ msg: "Invalid token" });
  }
};