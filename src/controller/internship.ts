import prisma from "../../prisma/prismaClient";
import { Internship } from "../types/types";
import { Request, Response } from "express";

export const createInternship = async (req: Request, res: Response) => {
  const data: Internship = req.body;
  const company = await prisma.company.findUnique({
    where: {
      email: req.user?.email,
    },
  });
  //    this should not happen
  if (!company || !company.id) {
    return res.status(400).json({
      message: "Failed to fetch linked Company Details",
    });
  }
  const newInternship = await prisma.internship.create({
    data: {
      ...data,
      companyId: company.id,
    },
  });
  res.status(200).send({
    data: newInternship,
    message: "Internship Posted Successfully",
  });
};

export const getInternships = async (req: Request, res: Response) => {
  const internships = await prisma.internship.findMany({
    include: {
      company: true,
    },
  });
  return res.status(200).json({
    data: internships,
  });
};

export const appliedUsers = async (req: Request, res: Response) => {
  const intershipId = req.params.id;
  const applications = await prisma.internship.findFirst({
    where: {
      id: +intershipId,
    },
    select: {
      Application: {
        include: {
          employee: true,
        },
      },
    },
  });
  return res.status(200).send({
    data: {
      applications,
    },
  });
};
