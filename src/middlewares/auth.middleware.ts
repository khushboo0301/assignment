import { Request, Response, NextFunction } from "express";

// assumes user ID is sent in headers
export const mockAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId = req.header("user-id");

  if (!userId || typeof userId !== "string") {
    res.status(401).json({ message: "Unauthorized: Missing user-id header" });
    return;
  }

  req.user = { id: userId }; // define the type in custom.d.ts file
  next();
};
