import { date } from "zod";
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

export const getInternshipsDetails = async (req: Request, res: Response) => {
  const internships = await prisma.internship.findMany({
    include: {
      company: true,
    },
  });
  console.log("hi");
  return res.status(200).json(internships);
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
  if (!applications) {
    return res.status(400).send({
      message: "No applicants for the internship",
    });
  }
  return res.status(200).send({
    data: {
      applications,
    },
  });
};

export const getOneInternship = async (req: Request, res: Response) => {
  const id = req.params.id;
  const detailedInternship = await prisma.internship.findUnique({
    where: {
      id: +id,
    },
    include: {
      company: true,
    },
  });
  if (!detailedInternship) {
    res.status(400).json({
      message: "No details about the Internship ",
      data: null,
    });
  }
  return res.status(200).json({
    data: {
      detailedInternship,
    },
  });
};
