import { z } from 'zod';

export const CreateLinkSchema = z.object({
  longUrl: z.string().url(),
  customAlias: z.string().optional(),
  expirationDate: z.coerce.date().optional()
});

export type CreateLinkInput = z.infer<typeof CreateLinkSchema>;