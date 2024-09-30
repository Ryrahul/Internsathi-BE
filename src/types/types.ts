import { z } from "zod";

import {
  EducationSchema,
  EmployeeSchema,
  ExperienceSchema,
  userLoginSchema,
  userRegistrationSchema,
} from "../schemas/userSchema";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export type Signup = z.infer<typeof userRegistrationSchema>;

export type Login = z.infer<typeof userLoginSchema>;

export interface User {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export type EmployeeRequestBody = z.infer<typeof EmployeeSchema>;
export type ExperienceType = z.infer<typeof ExperienceSchema>;
export type EducationType = z.infer<typeof EducationSchema>;