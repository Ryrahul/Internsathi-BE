import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

const GenderEnum = z.enum(["Male", "Female"]);

const TrainingSchema = z.object({
  course_name: z.string(),
  institution: z.string(),
  start_date: z.string(),
  end_date: z.string().optional(),
});

export const ExperienceSchema = z.object({
  designation: z.string(),
  company_name: z.string(),
  start_date: z.date(),
  end_date: z.date(),
  job_description: z.string(),
});

export const DocumentsSchema = z.object({
  type: z.string(),
  file_key: z.string(),
  file_url: z.string().url(),
});

export const EducationSchema = z.object({
  type: z.string(),
  name: z.string(),
  degree_name: z.string(),
  start_date: z.date(),
  studying_here: z.boolean(),
  country: z.string(),
  city: z.string(),
  end_date: z.date(),
  job_description: z.string(),
});

export const EmployeeSchema = z.object({
  phone: z.string().optional(),
  gender: GenderEnum.optional(),
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  city: z.string().optional(),
  dob: z.string().optional(),
  designation: z.string().optional(),
  address: z.string().optional(),
  fb_link: z.string().url().optional(),
  portfolio_link: z.string().url().optional(),
  job_preference: z.array(z.string()).optional(),

  training: TrainingSchema.or(z.array(TrainingSchema)).optional(),
});
