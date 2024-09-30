import express, { Express } from "express";
import { validateData } from "../middleware/validationMiddleware";
import { EmployeeSchema } from "../schemas/userSchema";
import { profileDetails } from "../controller";
import { jwtAuth } from "../middleware/verifyToken";
export const userRouter = express.Router();
userRouter.post(
  "/details",
  jwtAuth,
  validateData(EmployeeSchema),
  profileDetails
);
