import axios from "axios";
import userInstance from "../api/userInstance";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const userSignUp = async (userData) => {
  const res = await axios.post(`${BASE_URL}/users`, userData);
  return res.data;
};
export const userLogin = async ({ email, password }) => {
  const response = await userInstance.get(`?email=${email}`);
  const matchedUser = response.data.find(user => user.password === password);

  if (matchedUser) {
    return matchedUser;
  } else {
    throw new Error("Incorrect email or password");
  }
}
export const updateUser = async (userId, userData) => {
  const response = await userInstance.put(`/${userId}`, userData);
  return response.data;
};
