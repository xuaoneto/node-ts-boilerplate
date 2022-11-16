import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function JWTGuard(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"] as string;
  const SECRET = process.env.SECRET as string;
  jwt.verify(token.replace("Bearer ", ""), SECRET, (err, deconded) => {
    if (err) return res.status(401).end();
    next();
  });
}
