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
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoURI = process.env.MONGODB_URI;
        console.log("MongoDB URI exists:", !!mongoURI);
        console.log("MongoDB URI preview:", mongoURI ? mongoURI.substring(0, 20) + "..." : "undefined");
        if (!mongoURI) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }
        // PULL REQUEST
        console.log("Attempting to connect to MongoDB...");
        const conn = yield mongoose_1.default.connect(mongoURI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 30000,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        const err = error;
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
