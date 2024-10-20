import { z } from "zod";

const InternshipSchema = z.object({
  position: z.string().min(1, "Position is required"),
  salary: z.string().min(1, "Salary is required"),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "INTERNSHIP"]),
  openings: z.number().int().min(1, "Openings must be at least 1"),
  level: z.string().min(1, "Level is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  responsibilities: z.array(
    z.string().min(1, "Each responsibility must be a non-empty string")
  ),
  requirements: z.array(
    z.string().min(1, "Each requirement must be a non-empty string")
  ),
  requiredSkills: z.array(
    z.string().min(1, "Each required skill must be a non-empty string")
  ),
  tags: z.array(z.string().min(1, "Each tag must be a non-empty string")),
  applicationEnds: z.date(),
});

export default InternshipSchema;
