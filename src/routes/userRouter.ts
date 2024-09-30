import express, { Express } from "express";
import { validateData } from "../middleware/validationMiddleware";
import {
  EducationSchema,
  EmployeeSchema,
  ExperienceSchema,
} from "../schemas/userSchema";
import { educationDetail, profileDetails, workExperience } from "../controller";
import { jwtAuth } from "../middleware/verifyToken";
export const userRouter = express.Router();
userRouter.post(
  "/details",
  jwtAuth,
  validateData(EmployeeSchema),
  profileDetails
);
userRouter.post(
  "/education",
  jwtAuth,
  validateData(EducationSchema),
  educationDetail
);

userRouter.post(
  "/work",
  jwtAuth,
  validateData(ExperienceSchema),
  workExperience
);
