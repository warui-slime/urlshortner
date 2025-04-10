import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { UserSchema } from '@repo/shared/UserSchema';
import { ApiResponse } from '../utils/ApiResponse.js';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.me = this.me.bind(this);
    this.logout = this.logout.bind(this);
  }

  async signup(req: Request, res: Response) {
    try {
      const validatedData = UserSchema.parse(req.body);
      const user = await this.authService.signup(validatedData);
      ApiResponse.success(res, 201, "User created", user);
    } catch (error: any) {


      ApiResponse.error(res, 400, error.message);
    }
  }

  async login(req: Request, res: Response) {
    try {

      const validatedData = UserSchema.parse(req.body);


      const { user, token } = await this.authService.login(validatedData);
      res.cookie("token", token, { httpOnly: true, secure: true });
      ApiResponse.success(res, 200, "Login successful", { user, token });
    } catch (error: any) {
      ApiResponse.error(res, 401, error.message);
    }
  }


  async me(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        res.status(401).json({ message: 'Authorization header missing' });
        return;
      }
  
      const token = authHeader.split(' ')[1];
  
      if (!token) {
        res.status(401).json({ message: 'Malformed authorization header' });
        return;
      }
  
      res.json({
        user: req.user,
        token: token
      });
  
    } catch (error) {
      console.error('Error in /me endpoint:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  async logout(_req: Request, res: Response) {
    res.clearCookie("token");
    ApiResponse.success(res, 200, "Logout successful");
  }
}