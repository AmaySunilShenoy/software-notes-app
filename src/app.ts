import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import noteRoutes from "./routes/note.routes";
import healthRoutes from "./routes/health.routes";

const app = express();

// Load environment variables
import config from "./config";
const { MONGO_URI } = config;

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(helmet());

// Routes
app.use("/health", healthRoutes);
app.use("/note", noteRoutes);

// connect to the database
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

export default app;
