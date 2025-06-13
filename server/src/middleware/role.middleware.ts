import { Request, Response, NextFunction, RequestHandler } from "express";

export const requireRole = (roles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Assume req.user is set after authentication (e.g., by a JWT middleware)
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }
    if (!roles.includes(user.role)) {
      res.status(403).json({ message: "Forbidden: Insufficient role" });
      return;
    }
    next();
  };
};
