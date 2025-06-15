// src/api/rooms.ts
import axios from "axios";

export interface Room {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  owner: string;
  availableFrom: string;
  availableTo: string;
  images: string[];
  status?: "approved" | "declined" | "pending"; // optional kung may status field ka
  createdAt: string;
  updatedAt: string;
}

const BASE_URL = import.meta.env.VITE_APP_BASE_URL!;

export async function getAllRooms(): Promise<Room[]> {
  try {
    const response = await axios.get<Room[]>(`${BASE_URL}/api/rooms`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
}
