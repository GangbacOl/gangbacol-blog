import axios from "../utils/axios";
import { LOGIN_URL, REGISTER_URL, TOKEN_VERIFY_URL } from "../constants/baseUrl";

export const login = async (data: { account: string; password: string }) => {
  const response = await axios.post(`${LOGIN_URL}`, data);
  return response;
};

export const register = async (data: { username: string; account: string; password: string }) => {
  const response = await axios.post(`${REGISTER_URL}`, data);
  return response;
};

export const verifyToken = async (token: string) => {
  const response = await axios.post(`${TOKEN_VERIFY_URL}`, { data: { token } });
  return response;
};
