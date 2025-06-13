import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import usersRouter from "./routes/users.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: process.env.CLIENT_URL!,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    if (error instanceof Error) {
      if (error.message === "Only image files are allowed!") {
        res.status(400).json({ message: "Only image files are allowed" });
        return;
      }
      if (error.message.includes("File too large")) {
        res
          .status(400)
          .json({ message: "File size too large. Maximum 5MB allowed" });
        return;
      }
    }
    next(error);
  }
);

app.use("/api/users", usersRouter);
connectDB();

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
