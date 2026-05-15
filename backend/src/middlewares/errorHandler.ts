import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

// Global error handler middleware
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === "PrismaClientKnownRequestError") {
    // Handle specific Prisma errors (e.g. duplicate key)
    statusCode = 400;
    const prismaErr = err as any;
    if (prismaErr.code === 'P2002') {
      message = `Dữ liệu bị trùng lặp: ${prismaErr.meta?.target}`;
    } else {
      message = `Lỗi Database (${prismaErr.code}): ${prismaErr.message.split('\n').pop()}`;
    }
    console.error("❌ [Prisma Error]:", err);
  } else {
    // Log unexpected errors
    console.error("❌ [Server Error]:", err);
    // TRICK: Always return the real error to the frontend for debugging!
    message = err.message || "Lỗi không xác định ở Server";
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    stack: err.stack // Send stack trace to frontend for easy debugging
  });
};
