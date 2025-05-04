import { BASE_API_URL } from "~/utils/constants";
import axios from "axios";

export const logout = async () => {
  const token = useCookie("token").value;

  
  try {
    const res = await axios.get(`${BASE_API_URL}/logout`, {
      headers: { Authorization: "Bearer " + token },
    });
    
    useCookie("token").value = null;
    useCookie("user").value = null;
    
    return res
  } catch (error) {    
    throw error;
  }
};
