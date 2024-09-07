import axios from "axios";
import { API_URL } from "../config";
// authService.ts
export class AuthService {
  private url = API_URL;

   login(email: string, password: string) {
    return axios.post(`${this.url}/auth/login`, {
      email,
      password,
    });
  }

     register(email: string, password: string) {
        return axios.post(`${this.url}/auth/register`, {
        email,
        password,
        });
    }
}
