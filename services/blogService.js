import { BASE_API_URL } from "~/utils/constants";
import axios from "axios";

export const addBlogs = async (data) => {
  const token = useCookie("token").value;

  try {
    const res = await axios.post(`${BASE_API_URL}/blogs`, data, {
      headers: { Authorization: "Bearer " + token },
    });

    return res;    
  } catch (error) {
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const res = await axios.get(`${BASE_API_URL}/blogs`);

    return res;    
  } catch (error) {
    throw error;
  }
};

export const getBlogsSlug = async (slug) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/blogs/${slug}`);

    return res;    
  } catch (error) {
    throw error;
  }
};

export const updateBlogs = async (id, data) => {
  const token = useCookie("token").value;

  try {
    const res = await axios.put(`${BASE_API_URL}/blogs/${id}`, data,{
      headers: { Authorization: "Bearer " + token },
    });

    return res;    
  } catch (error) {
    throw error;
  }
};

export const delBlogs = async (id) => {
  const token = useCookie("token").value;

  try {
    const res = await axios.delete(`${BASE_API_URL}/blogs/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });

    return res;    
  } catch (error) {
    throw error;
  }
};