import express, { Express } from "express";
import { appliedUsers, createInternship, getInternships } from "../controller";
import { validateData } from "../middleware/validationMiddleware";
import { companyAuth } from "../middleware/company";
import { applyForInternship } from "../controller/internshipApply";
import { jwtAuth } from "../middleware/verifyToken";

export const internshipRouter = express.Router();
internshipRouter.post("/post", companyAuth, createInternship);
internshipRouter.post("/apply/:id", jwtAuth, applyForInternship);
internshipRouter.get("", jwtAuth, getInternships);
internshipRouter.get("/applicants/:id", companyAuth, appliedUsers);
