import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types/types";
import prisma from "../../prisma/prismaClient";

export const companyAuth = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as User;
    const existingCompany = await prisma.company.findUnique({
      where: {
        id: decodedToken.id,
      },
    });
    if (!existingCompany) {
      res.status(401).json({
        error:
          "No company linked with the account, Need to have a registered Company to add internships",
      });
    }
    req.user = decodedToken;
    next();
  } catch (e: any) {
    return res.json({ error: e.message });
  }
};
