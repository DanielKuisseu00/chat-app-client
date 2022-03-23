import axios from "axios";
import { host } from "./routes";

export const axiosInstance = axios.create({
  baseURL: `${host}`,
  "Content-Type": "application/json",
});

export const axiosUpload = axios.create({
  baseURL: `${host}`,
  "Content-Type": "multipart/form-data",
});
