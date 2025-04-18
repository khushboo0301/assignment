import { RequestHandler } from "express";
import { AppDataSource } from "../config/db";
import { Attendee } from "../entities/Attendee";
import { Event } from "../entities/Event";
import { User } from "../entities/User";
import { successResponse, errorResponse } from "../utils/apiResponse";

interface CustomError extends Error {
  statusCode?: number;
  errors?: unknown;
}

export const joinEvent: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as User;
    const { eventId } = req.params;

    const eventRepo = AppDataSource.getRepository(Event);
    const attendeeRepo = AppDataSource.getRepository(Attendee);

    const event = await eventRepo.findOneBy({ id: eventId });
    if (!event) {
      const error: CustomError = new Error("Event not found");
      error.statusCode = 404;
      throw error;
    }

    const existing = await attendeeRepo.findOne({
      where: { event: { id: eventId }, user: { id: user.id } },
      relations: ["user", "event"],
    });

    if (existing) {
      const error: CustomError = new Error("You already joined this event");
      error.statusCode = 400;
      throw error;
    }

    const attendee = attendeeRepo.create({ user, event });
    await attendeeRepo.save(attendee);

    // Use the successResponse utility function
    res.status(201).json(successResponse({ message: "Joined event successfully" }));
  } catch (err) {
    next(err);
  }
};

export const listEventAttendees: RequestHandler = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const attendeeRepo = AppDataSource.getRepository(Attendee);

    const attendees = await attendeeRepo.find({
      where: { event: { id: eventId } },
      relations: ["user"],
    });

    const formatted = attendees.map((attendee) => ({
      id: attendee.user.id,
      name: attendee.user.name,
      email: attendee.user.email,
    }));

    // Use the successResponse utility function
    res.status(200).json(successResponse({ attendees: formatted }));
  } catch (err) {
    next(err);
  }
};
