import axios from "axios";

const token = localStorage.getItem("accessToken");
console.log(token);

const Axios = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": "Bearer " + token } : {}),
  },
});

export default Axios;