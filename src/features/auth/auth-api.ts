import { apiClient } from "@/lib/api-client";
import type {
  AuthResponse,
  LoginInput,
  RegisterInput,
} from "./auth-types";

export function loginUser(payload: LoginInput) {
  return apiClient<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function registerUser(payload: RegisterInput) {
  return apiClient<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}