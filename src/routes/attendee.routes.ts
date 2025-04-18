import { Router } from "express";
import {
  joinEvent,
  listEventAttendees,
} from "../controllers/attendee.controller";
import { mockAuth } from "../middlewares/auth.middleware";

const router = Router();
router.post("/:eventId/join", mockAuth, joinEvent);
router.get("/:eventId/attendees", listEventAttendees);

export default router;
