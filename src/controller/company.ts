import { Prisma } from "@prisma/client";
import prisma from "../../prisma/prismaClient";
import { CompanySignUp, Login } from "../types/types";
import { Request, Response } from "express";
import { createRefreshToken, createToken } from "../middleware/createToken";
import bcrypt from "bcryptjs";

export const createCompany = async (req: Request, res: Response) => {
  const data: CompanySignUp = req.body;
  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    const newCompany = await prisma.company.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    const payload = { id: newCompany.id, email: newCompany.email };
    const access_token = await createRefreshToken(payload);
    const refresh_token = await createRefreshToken(payload);
    return res.status(200).json({
      access_token,
      refresh_token,
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({
          message: `Company  with email ${data.email} already exists.`,
        });
      }
    }
    return res.status(500).json({
      message: e.message,
    });
  }
};
export const companyLogin = async (req: Request, res: Response) => {
  const data: Login = req.body;
  const existingCompany = await prisma.company.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!existingCompany) {
    return res.status(404).json({
      message: `No company  with email ${data.email}`,
    });
  }
  const pwMatch = await bcrypt.compare(data.password, existingCompany.password);
  if (!pwMatch) {
    return res.status(401).json({
      message: `Invalid Password `,
    });
  }

  const payload = { id: existingCompany.id, email: existingCompany.email };
  const access_token = await createToken(payload);
  const refresh_token = await createRefreshToken(payload);
  await prisma.company.update({
    where: {
      email: data.email,
    },
    data: {
      access_token,
      refresh_token,
    },
  });

  return res.status(200).json({ access_token, refresh_token });
};
