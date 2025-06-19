import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import usersRouter from "./routes/users.routes";
import chatRouter from "./routes/chat.routes";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

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
app.use("/api/chat", chatRouter);
connectDB();

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL!,
    credentials: true,
  },
});

// Socket.IO chat logic
io.on("connection", (socket) => {
  // Join a room for tenant-landlord chat (roomId = chatId or user pair)
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  // Handle sending messages
  socket.on("chatMessage", ({ roomId, message, sender, timestamp }) => {
    io.to(roomId).emit("chatMessage", { message, sender, timestamp });
  });

  // Typing indicator
  socket.on("typing", ({ roomId, sender }) => {
    socket.to(roomId).emit("typing", { sender });
  });

  socket.on("stopTyping", ({ roomId, sender }) => {
    socket.to(roomId).emit("stopTyping", { sender });
  });

  socket.on("disconnect", () => {
    // Handle disconnect logic if needed
  });
});

server.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
