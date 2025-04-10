import { Response } from "express";

export class ApiResponse {
  static success(
    res: Response,
    statusCode: number,
    message: string,
    data?: any
  ) {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res: Response, statusCode: number, message: string) {
    res.status(statusCode).json({
      success: false,
      message,
    });
  }
}