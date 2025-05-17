import axios from "../services/api.helper";

export const loginAPI = async (username: string, password: string) => {
  try {
    const res = await axios.post("/auth/signin", {
      username,
      password,
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};