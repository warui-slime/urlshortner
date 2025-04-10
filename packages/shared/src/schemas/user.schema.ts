import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export type User = z.infer<typeof UserSchema>;