import prisma from "../../prisma/prismaClient";
import { Request, Response } from "express";

export const applyForInternship = async (req: Request, res: Response) => {
  const internshipId = req.params.id;
  const userId = req.user?.id as number;
  const existingApplications = await prisma.application.findFirst({
    where: {
      employeeId: userId,
      internshipId: +internshipId,
    },
  });
  if (existingApplications) {
    return res.status(400).json({
      message: "Already applied for this Internship",
    });
  }
  console.log(existingApplications);
  const applyForInternship = await prisma.application.create({
    data: {
      employeeId: userId,
      internshipId: +internshipId,
    },
  });
  res.status(200).send({
    message: "Applied Successfully",
  });
};
