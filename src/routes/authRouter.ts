import express, { Express } from "express";
import { login, signup } from "../controller";
import { validateData } from "../middleware/validationMiddleware";
import { userLoginSchema, userRegistrationSchema } from "../schemas/userSchema";
export const userRouter = express.Router();
userRouter.post("/signup", validateData(userRegistrationSchema), signup);
userRouter.post("/login", validateData(userLoginSchema), login);
