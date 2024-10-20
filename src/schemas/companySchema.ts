import { z } from "zod";

export const CompanySchema = z.object({
  about: z.string().min(1, "About field is required"),
  category: z.string().min(1, "Category is required"),
  company: z.string().min(1, "Company name is required"),
  founded: z.string(),
  location: z.string().min(1, "Location is required"),
  address: z.string().min(1, "Address is required"),
  website: z.string().url("Invalid URL for website"),
  fb_link: z.string().url("Invalid URL for Facebook link"),
  insta_link: z.string().url("Invalid URL for Instagram link"),
  image_url: z.array(z.string().url("Invalid URL for image")),
  image_keys: z.array(z.string().min(1, "Image key is required")),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
