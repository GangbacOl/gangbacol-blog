import axios from "../utils/axios";
import { LOGIN_URL, REGISTER_URL } from "../constants/baseUrl";

export const login = async (data: { account: string; password: string }) =>
    await axios.post(`${LOGIN_URL}`, data);

export const register = async (data: { username: string; account: string; password: string }) =>
    await axios.post(`${REGISTER_URL}`, data);