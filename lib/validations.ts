import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const templateSchema = z.object({
  specialization: z.string().min(1, 'Specialization is required'),
  workStyle: z.enum(['Remote', 'Hybrid', 'On-site'], {
    errorMap: () => ({ message: 'Please select a work style' }),
  }),
  defaultSections: z.string().min(1, 'Default sections are required'),
});

export const clientSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  projectSummary: z.string().min(1, 'Project summary is required'),
  goals: z.string().min(1, 'Goals are required'),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type TemplateInput = z.infer<typeof templateSchema>;
export type ClientInput = z.infer<typeof clientSchema>;
