import { Request, Response, NextFunction } from "express";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Example: Log request method and URL
  console.log(`[UserMiddleware] ${req.method} ${req.originalUrl}`);
  next();
};
