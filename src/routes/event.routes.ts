import { Router } from "express";
import {
  createEvent,
  getEventById,
  getAllEvents,
} from "../controllers/event.controller";
import { validate } from "../middlewares/validate.middleware";
import { CreateEventSchema } from "../dtos/event.dto";
import { mockAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", mockAuth, validate(CreateEventSchema), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);

export default router;
