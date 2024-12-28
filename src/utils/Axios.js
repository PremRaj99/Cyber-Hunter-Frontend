import axios from "axios";

const token = localStorage.getItem("accessToken");
console.log(token);

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: "Bearer " + token } : {}),
  },
});

export default Axios;