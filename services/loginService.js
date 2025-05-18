import { BASE_API_URL } from "~/utils/constants";
import axios from "axios";

export const login = async (data) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/login`, data);

    const token = res.data?.access_token;
    const user = res.data?.user;

    useCookie("token").value = token;
    useCookie("user").value = JSON.stringify(user);

    return res;
  } catch (error) {
    console.error(error);
    return {
      status: error.status,
      data: error.response.data
    };
  }
};

export const register = async (data) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/register`, data);

    return res;
  } catch (error) {
    console.error(error);
  }
};
