import axios from "axios";
import { useLoggedIn } from "../stores/logged-in";

const API_BASE_URL = "https://66ffcf424da5bd2375520fca.mockapi.io";

export const register = async (username, password, avatar) => {
  try {
    try {
    const existingUsersResponse = await axios.get(`${API_BASE_URL}/accounts?username=${username}`, {

      });

    if (existingUsersResponse.data.length > 0) {
      throw new Error("USERNAME_ALREADY_EXISTS");
    }
    } catch (error) {
    }
    const response = await axios.post(`${API_BASE_URL}/accounts`, {
      username,
      password,
      avatar,
    });
    localStorage.setItem("user", JSON.stringify(response.data));
    useLoggedIn.setState({ user: response.data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (username, password) => {
  const response = await axios.get(`${API_BASE_URL}/accounts`);
  const users = response.data;
  const user = users.find((u) =>
    u.username === username && u.password === password
  );
  localStorage.setItem("user", JSON.stringify(user));
  useLoggedIn.setState({ user });
  return user || null;
};

export const fetchAccounts = async () => {
  const response = await axios.get(`${API_BASE_URL}/accounts`);
  return response.data;
};

export const getAccountDetails = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/accounts?id=${userId}`);
  return response.data[0];
};
