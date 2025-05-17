import axios from "./api.helper";

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

export const registerAPI = async (
  username: string,
  password: string,
  role: string,
  name: string,
  email: string,
  description: string
) => {
  try {
    const res = await axios.post("/auth/signup", {
      username,
      password,
      role,
      name,
      email,
      description,
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}