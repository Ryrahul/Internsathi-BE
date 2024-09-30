import express, { Express } from "express";
import { login, signup } from "../controller";
import { validateData } from "../middleware/validationMiddleware";
import { userLoginSchema, userRegistrationSchema } from "../schemas/userSchema";
export const authRouter = express.Router();
authRouter.post("/signup", validateData(userRegistrationSchema), signup);
authRouter.post("/login", validateData(userLoginSchema), login);
