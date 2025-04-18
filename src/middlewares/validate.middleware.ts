import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body); // we use safeParse so that we dont need try/catch

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.errors,
      });
      return; // This is important to satisfy the expected return type
    }

    req.body = result.data;
    next();
  };
};

