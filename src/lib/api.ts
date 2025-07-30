import axios from "axios";
import { API_BASEURL } from "./config/config";

export const api = axios.create({
  baseURL: API_BASEURL,
  withCredentials: true,
});
