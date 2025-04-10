import { z } from 'zod';

export const createLinkSchema = z.object({
  longUrl: z.string().url('Invalid URL format'),
  customAlias: z.string()
    .min(3, 'Alias must be at least 3 characters')
    .max(20, 'Alias must be less than 20 characters')
    .optional(),
  expirationDate: z.string().optional()
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;