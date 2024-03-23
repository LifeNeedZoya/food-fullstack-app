import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_API_URL = "https://food-fullstack-app.vercel.app/";

const instanceAxios = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
});

export default instanceAxios;
