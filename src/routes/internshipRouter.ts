import express, { Express } from "express";
import {
  appliedUsers,
  createInternship,
  getInternshipsDetails,
  myInternship,
} from "../controller";
import { validateData } from "../middleware/validationMiddleware";
import { companyAuth } from "../middleware/company";
import { applyForInternship } from "../controller/internshipApply";
import { jwtAuth } from "../middleware/verifyToken";
import InternshipSchema from "../schemas/internshipSchema";

export const internshipRouter = express.Router();
internshipRouter.post(
  "/post",
  companyAuth,
  validateData(InternshipSchema),
  createInternship
);
internshipRouter.post("/apply/:id", jwtAuth, applyForInternship);
internshipRouter.get("", jwtAuth, getInternshipsDetails);
internshipRouter.get("/applicants/:id", companyAuth, appliedUsers);
internshipRouter.get("/my-postings", companyAuth, myInternship);
