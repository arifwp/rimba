import fs from "fs";
import { Request, Response, NextFunction } from "express";

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const logEntry = `[${new Date().toISOString()}] ${req.method} ${
    req.originalUrl
  }\n`;

  fs.appendFile("log.txt", logEntry, (err) => {
    if (err) {
      console.error("Gagal mencatat log:", err);
    }
  });

  next();
};
