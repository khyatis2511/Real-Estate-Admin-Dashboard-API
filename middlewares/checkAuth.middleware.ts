/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import jwtService from "../services/jwt.service";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header is missing' });
  }

  const token = authHeader?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Token is missing' });
  }

  try {
    const decoded = token && jwtService.verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error: any) {
    if (error.message === 'Token expired') {
      res.status(401).json({ error: 'Token has expired' });
    }
    res.status(401).json({ error: 'Invalid token' });
  }
};
