"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use((error, req, res, next) => {
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
});
app.use("/api/users", users_routes_1.default);
app.use("/api/chat", chat_routes_1.default);
(0, db_1.connectDB)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
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
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on http://localhost:${PORT}`);
}));
