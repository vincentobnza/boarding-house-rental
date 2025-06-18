import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import usersRouter from "./routes/users.routes";
import landlordRouter from "./routes/landlord_register.routes"; // <-- landlord routes
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Allow frontend origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routers
app.use("/api/users", usersRouter);
app.use("/api/landlord", landlordRouter);  // <-- Added landlord router here

// Global error handler for uploads (multer errors)
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

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
