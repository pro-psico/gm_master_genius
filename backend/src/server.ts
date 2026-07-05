import cors from "cors";
import dotenv from "dotenv";
import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { openingsRouter } from "./routes/openings.routes.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 4000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    app: "GM Combat Master Genius API",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/openings", openingsRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found."
  });
});

app.use(
  (error: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(error);

    res.status(500).json({
      message: "Internal server error."
    });
  }
);

app.listen(PORT, () => {
  console.log(`GM Combat Master Genius API running on http://localhost:${PORT}`);
});