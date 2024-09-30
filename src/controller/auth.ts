import { Request, Response } from "express";
import { Login, Signup } from "../types/user";
import { Prisma } from "@prisma/client";
import prisma from "../../prisma/prismaClient";
import bcrypt from "bcryptjs";
import { createToken } from "../middleware/createToken";
export const signup = async (req: Request, res: Response) => {
  const data: Signup = req.body;

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
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

export const login = async (req: Request, res: Response) => {
  const data: Login = req.body;
  const existingUser = await prisma.employee.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!existingUser) {
    return res.status(404).json({
      message: `No user with email ${data.email}`,
    });
  }
  const pwMatch = await bcrypt.compare(data.password, existingUser.password);
  if (!pwMatch) {
    return res.status(401).json({
      message: `Invalid Password `,
    });
  }
  const payload = { id: existingUser.id, email: existingUser.email };
  const token = await createToken(payload);
  await prisma.employee.update({
    where: {
      email: data.email,
    },
    data: {
      access_token: token,
    },
  });

  return res.status(200).json({ token });
};