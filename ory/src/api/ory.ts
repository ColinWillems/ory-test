import axios from "axios";
import * as SecureStore from "expo-secure-store";

const ORY_BASE_URL = "https://strange-rosalind-5d5i92hr7h.projects.oryapis.com";

const api = axios.create({
  baseURL: ORY_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

// REGISTER
export async function register(email: string, password: string) {
  
  const { data: flow } = await api.get("/self-service/registration/api");

  const res = await api.post(`/self-service/registration?flow=${flow.id}`, {
    method: "password",
    traits: { email },
    password,
  });

  return res.data;
}

// LOGIN
export async function login(email: string, password: string) {
  const { data: flow } = await api.get("/self-service/login/api");

  const res = await api.post(`/self-service/login?flow=${flow.id}`, {
    method: "password",
    identifier: email,
    password,
  });

  const token = res.data.session_token;
  if (token) await SecureStore.setItemAsync("kratos_session_token", token);

  return res.data;
}

// SESSION
export async function getSession() {
  const token = await SecureStore.getItemAsync("kratos_session_token");
  if (!token) return null;
  try {
    const res = await api.get("/sessions/whoami", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch {
    return null;
  }
}

// LOGOUT
export async function logout() {
  await SecureStore.deleteItemAsync("kratos_session_token");
}
