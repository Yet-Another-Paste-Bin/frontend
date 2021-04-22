import Axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:8000";
const instance = Axios.create({ baseURL: BASE_URL });

export const ReqLogin = async (username_para, password) => {
  try {
    const res = await instance.post("/api/login", {
      username: username_para,
      password,
    });
    if (res.status === 401) {
      return { status: false, error: false };
    }
    const { id, token, username } = res.data;

    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    return { status: true, error: false, username, token };
  } catch (error) {
    return { status: false, error: true };
  }
};
