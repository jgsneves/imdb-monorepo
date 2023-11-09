import axios from "axios";
import { store } from "../store";

export interface User extends CreateUserRequest {
  createdAt: string;
  updatedAt: string;
  id: string;
  isActive: boolean;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export class UserService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  public static createUser(data: CreateUserRequest) {
    return this.buildAxiosInstance().post<User>("/users", data);
  }

  private static buildAxiosInstance() {
    if (!this.BASE_URL) throw new Error("API_URL env variable is not defined");

    const { auth } = store.getState();

    return axios.create({
      baseURL: this.BASE_URL,
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
  }
}
