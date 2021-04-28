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

export const ReqSignup = async (username_para, email, password, phoneno) => {
  try {
    const res = await instance.post("/api/signup", {
      username: username_para,
      email,
      password,
      phoneno,
    });
    const { id, token, username } = res.data;

    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    return {
      status: true,
      error: false,
      username,
      token,
      statusCode: res.status,
    };
  } catch (error) {
    return { status: false, error: true, statusCode: error.response.status };
  }
};

export const ReqPostBin = async (bin, privateBin = false) => {
  try {
    const res = await instance.post("/api/bin", {
      data: bin,
      private: privateBin,
    });
    if (res.status === 200) {
      const { binId } = res.data;
      if (res.data.binId) {
        return { id: binId };
      }
    }
    return { error: true };
  } catch (error) {}
};

export const ReqBin = async (binId) => {
  const reqData = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    owner_id: localStorage.getItem("id"),
  };
  try {
    const res = await instance.get(`/api/bin/${binId}`, reqData);
    if (res.status === 200) {
      const { data } = res.data;
      if (res.data) {
        return { data };
      }
    } else if (res.status === 403) return { error: true };
  } catch (error) {
    return { error: true };
  }
};
