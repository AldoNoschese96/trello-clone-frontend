import axios from "axios";

const BASE_URL = "https://react-trello-node.herokuapp.com/api";
const token = localStorage.getItem("token") || "";

const axiosClient = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosClient;
