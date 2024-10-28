import express, { Express } from "express";
import { createCompany, companyLogin, companyDetails } from "../controller";
import { validateData } from "../middleware/validationMiddleware";
import { CompanySchema } from "../schemas/companySchema";
import { userLoginSchema } from "../schemas/userSchema";
import { jwtAuth } from "../middleware/verifyToken";

export const companyRouter = express.Router();
companyRouter.post("/signup", validateData(CompanySchema), createCompany);
companyRouter.post("/login", validateData(userLoginSchema), companyLogin);
companyRouter.get("/details", jwtAuth, companyDetails);
