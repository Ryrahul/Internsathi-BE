import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import { EmployeeRequestBody } from "../types/types";

export const profileDetails = async (req: Request, res: Response) => {
  const id = req?.user?.id;
  const data: EmployeeRequestBody = req.body;
  const existingUser = await prisma.employee.findUnique({
    where: {
      id,
    },
  });
  if (!existingUser) {
    return res.status(400).json({
      message: "No user found",
    });
  }
  const updatedUser = await prisma.employee.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  return res.status(200).json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
};
