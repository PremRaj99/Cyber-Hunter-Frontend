import axios from "axios";

const axios = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
  },
});

export default axios;