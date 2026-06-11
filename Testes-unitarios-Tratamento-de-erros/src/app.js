import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import produtosRoutes from "./routes/produtos.js";
import authRoutes from "./routes/auth.js";

import { prisma } from "./database/prisma.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: {
    error: "Muitas requisições. Tente novamente em alguns minutos.",
    code: 429,
  },
});

app.use(helmet());
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "API rodando" });
});

app.get("/health", async (req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "ok",
      uptime: process.uptime(),
      db: "connected",
    });
  } catch (error) {
    next(error);
  }
});

app.use("/auth", authRoutes);
app.use("/produtos", authMiddleware, produtosRoutes);

app.use(errorHandler);

export default app;