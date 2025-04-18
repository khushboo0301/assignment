import { RequestHandler } from "express";
import { AppDataSource } from "../config/db";
import { Event } from "../entities/Event";
import { User } from "../entities/User";
import { CreateEventDto } from "../dtos/event.dto";
import { successResponse, errorResponse } from "../utils/apiResponse";

interface CustomError extends Error {
  statusCode?: number;
  errors?: unknown;
}

export type CreateEventResponse =
  | {
      success: true;
      message: string;
      data: {
        event: Event;
      };
    }
  | {
      success: false;
      message: string;
      errors: unknown;
    };
export type GetEventByIdResponse =
  | {
      success: true;
      message: string;
      data: {
        event: Event;
      };
    }
  | {
      success: false;
      message: string;
      errors: unknown;
    };

export type GetAllEventsResponse =
  | {
      success: true;
      message: string;
      data: {
        events: Event[];
        total: number;
      };
    }
  | {
      success: false;
      message: string;
      errors: unknown;
    };

export const createEvent: RequestHandler<
  {}, // req.params
  CreateEventResponse, // res body
  CreateEventDto // req.body
> = async (req, res, next) => {
  try {
    const user = req.user as User;
    const { title, description, date } = req.body;

    const eventRepo = AppDataSource.getRepository(Event);
    const event = eventRepo.create({
      title,
      description,
      date: new Date(date),
      created_by: user,
    });

    await eventRepo.save(event);

    res
      .status(201)
      .json(successResponse({ event }, "Event created successfully"));
  } catch (err) {
    const error = err as CustomError;
    res
      .status(error.statusCode || 500)
      .json(errorResponse(error.message, error.errors));
  }
};

export const getEventById: RequestHandler<
  {
    id: string;
  },
  GetEventByIdResponse,
  never
> = async (req, res, next) => {
  try {
    const eventRepo = AppDataSource.getRepository(Event);
    const { id } = req.params;

    const event = await eventRepo.findOne({
      where: { id },
      relations: ["created_by"],
    });

    if (!event) {
      const error = new Error("Event not found") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    // Send the response, but no need to return the response
    res.status(200).json(successResponse({ event }));
  } catch (err) {
    next(err); // Forward to error handling middleware
  }
};

export const getAllEvents: RequestHandler<
  {},
  GetAllEventsResponse,
  never,
  { limit?: string; offset?: string }
> = async (req, res) => {
  try {
    const eventRepo = AppDataSource.getRepository(Event);

    const limit = parseInt(req.query.limit || "10", 10);
    const offset = parseInt(req.query.offset || "0", 10);

    const [events, total] = await eventRepo.findAndCount({
      skip: offset,
      take: limit,
      relations: ["created_by"],
    });

    res
      .status(200)
      .json(successResponse({ events, total }, "Events fetched successfully"));
  } catch (err) {
    const error = err as CustomError;
    res
      .status(error.statusCode || 500)
      .json(errorResponse(error.message, error.errors));
  }
};
