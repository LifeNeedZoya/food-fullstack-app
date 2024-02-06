import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

const instanceAxios = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
});

export default instanceAxios;
