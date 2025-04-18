import { RequestHandler } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../entities/User";
import { CreateUserDto } from "../dtos/user.dto";
import { successResponse, errorResponse } from "../utils/apiResponse";

interface CustomError extends Error {
  statusCode?: number;
  errors?: unknown;
}

export type CreateUserResponse =
  | {
      success: true;
      message: string;
      data: {
        user: User;
      };
    }
  | {
      success: false;
      message: string;
      errors: unknown;
    };

export type GetUserByIdResponse =
  | {
      success: true;
      data: {
        user: User;
      };
    }
  | {
      success: false;
      message: string;
      errors: unknown;
    };

// POST /users
export const createUser: RequestHandler<
  {},
  CreateUserResponse,
  CreateUserDto
> = async (req, res) => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const { name, email, mobile } = req.body;

    const existing = await userRepo.findOne({ where: { email } });
    if (existing) {
      res.status(400).json(errorResponse("Email already exists", { email }));
      return;
    }

    const user = userRepo.create({ name, email, mobile });
    await userRepo.save(user);

    res
      .status(201)
      .json(successResponse({ user }, "User created successfully"));
  } catch (err) {
    const error = err as CustomError;
    res
      .status(error.statusCode || 500)
      .json(errorResponse(error.message, error.errors));
  }
};

// GET /users/:id
export const getUserById: RequestHandler<
  { id: string },
  GetUserByIdResponse
> = async (req, res) => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const { id } = req.params;

    const user = await userRepo.findOne({ where: { id } });
    if (!user) {
      res.status(404).json(errorResponse("User not found"));
      return;
    }

    res.status(200).json(successResponse({ user }));
  } catch (err) {
    const error = err as CustomError;
    res
      .status(error.statusCode || 500)
      .json(errorResponse(error.message, error.errors));
  }
};
