import axios from "axios";

export interface LoginResponse {
  access_token: string;
  expires_in: number;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export class AuthService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  public static login(data: LoginRequestBody) {
    return this.buildAxiosInstance().post<LoginResponse>("auth/login", data);
  }

  private static buildAxiosInstance() {
    if (!this.BASE_URL) throw new Error("API_URL env variable is not defined");

    return axios.create({
      baseURL: this.BASE_URL,
    });
  }
}
