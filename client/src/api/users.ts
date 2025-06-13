import axios from "axios";

export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}

export async function getAllUsers(): Promise<User[]> {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL!;
  try {
    const response = await axios.get<User[]>(`${BASE_URL}/api/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL!;
  try {
    const response = await axios.post<User>(`${BASE_URL}/api/users`, user);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
