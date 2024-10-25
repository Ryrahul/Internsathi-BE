import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import {
  EducationType,
  EmployeeRequestBody,
  ExperienceType,
} from "../types/types";

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
export const educationDetail = async (req: Request, res: Response) => {
  const data: EducationType = req.body;
  const id = req?.user?.id;
  const existingUser = await prisma.employee.findUnique({
    where: {
      id,
    },
  });
  if (!existingUser) {
    return res.status(400).json({
      message: "No LoggedIn User",
    });
  }

  const newEducation = await prisma.education.create({
    data: {
      type: data.type,
      city: data.city,
      start_date: data.start_date,
      end_date: data.end_date,
      studying_here: data.studying_here,
      name: data.name,
      degree_name: data.degree_name,
      country: data.country,
      employeeId: existingUser.id,
    },
  });
  return res.status(200).json(newEducation);
};

export const workExperience = async (req: Request, res: Response) => {
  const data: ExperienceType = req.body;
  const id = req?.user?.id;
  const existingUser = await prisma.employee.findUnique({
    where: {
      id,
    },
  });
  if (!existingUser) {
    return res.status(400).json({
      message: "No LoggedIn User",
    });
  }

  const newExperience = await prisma.experience.create({
    data: {
      company_name: data.company_name,
      start_date: data.start_date,
      end_date: data.end_date,
      designation: data.designation,
      job_description: data.job_description,
      employeeId: existingUser.id,
    },
  });
  return res.status(200).json(newExperience);
};
export const details = async (req: Request, res: Response) => {
  const id = req?.user?.id;
  const existingUser = await prisma.employee.findUnique({
    where: {
      id,
    },
  });
  if (!existingUser) {
    return res.status(400).json({
      message: "No LoggedIn User",
    });
  }
  console.log("hereee");
  return res.status(200).send({
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    profile_picture: existingUser.profile_picture,
  });
};
