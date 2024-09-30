import { Request, Response } from "express";
import { Signup } from "../types/user";
import { Prisma } from "@prisma/client";
import prisma from "../../prisma/prismaClient";
import bcrypt from "bcryptjs";
export const signup = async (req: Request, res: Response) => {
  const data: Signup = req.body;

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log(data);
    const newUser = await prisma.employee.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });
    return res.status(200).json({
      message: `User with email ${newUser.email} registered Successfully`,
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({
          message: `User with email ${data.email} already exists.`,
        });
      }
    }
    return res.status(500).json({
      message: e.message,
    });
  }
};
