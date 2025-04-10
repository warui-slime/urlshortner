import { UserPayload } from './user.ts';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export interface UserPayload {
  id: string;
  email: string;
}