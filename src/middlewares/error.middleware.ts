import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  errors?: unknown;
}

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const errors = err.errors || null;

  res.status(status).json({
    success: false,
    message,
    errors,
  });
};

export default errorMiddleware;
