import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(120, "Name is too long"),
  description: z.string().max(300, "Description is too long").optional(),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;