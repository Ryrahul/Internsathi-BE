import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types/user";

export const jwtAuth = (req: any, res: Response, next: NextFunction) => {
  try {
    const token: any = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as User;
    req.user = decodedToken;
    next();
  } catch (e: any) {
    return res.json({ error: e.message });
  }
};
