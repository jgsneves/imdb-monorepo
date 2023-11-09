import axios from "axios";
import { store } from "../store";

export class BasePrivateService {
  public static BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  public static async fetcher(input: RequestInfo, init?: RequestInit) {
    const { auth } = store.getState();

    const res = await fetch(input, {
      ...init,
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });

    return res.json();
  }

  protected static buildAxiosInstance() {
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
