import express from "express";
import { json } from "body-parser";
import { AppDataSource } from "./config/db";
import userRoutes from "./routes/user.routes";
import eventRoutes from "./routes/event.routes";
import attendeeRoutes from "./routes/attendee.routes";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();
app.use(json());

app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/events", attendeeRoutes);

app.use(errorMiddleware);

AppDataSource.initialize()
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB error:", err));

export default app;
