import Axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";
const instance = Axios.create({ baseURL: BASE_URL });

export const ReqLogin = async (username_para, password) => {
  try {
    const res = await instance.post("/api/login", {
      username: username_para,
      password,
    });
    const { id, token, username } = res.data;

    if (res.status === 200) {
      localStorage.setItem("id", id);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
    }

    return {
      username: username || "",
      token: token || "",
      statusCode: res.status,
    };
  } catch (error) {
    return { status: false, statusCode: 401 };
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

    return {
      statusCode: res.status,
    };
  } catch (error) {
    return { statusCode: 500 };
  }
};

export const ReqPostBin = async (bin, privateBin = false) => {
  try {
    const data =
      localStorage.getItem("id") === null
        ? {
            data: bin,
            private: privateBin,
          }
        : {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            data: bin,
            private: privateBin,
          };
    const res = await instance.post("/api/bin", data);
    return res;
  } catch (error) {
    return { status: 500 };
  }
};

export const ReqBin = async (binId) => {
  const reqData =
    localStorage.getItem("id") === null
      ? {}
      : {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          owner_id: localStorage.getItem("id"),
        };
  try {
    const res = await instance.get(`/api/bin/${binId}`, { headers: reqData });
    if (res.status === 200) {
      const { data } = res.data;
      if (res.data) {
        return { data };
      }
    } else if (res.status === 400) return { error: false, notfound: true };
    else {
      return { error: false, notfound: true };
    }
  } catch (error) {
    return { error: true };
  }
};

export const ReqAllBin = async () => {
  try {
    const res = await instance.get("/api/bin", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.status === 200) {
      const data = res.data;
      if (data) {
        return { data };
      }
    } else if (res.status === 400) return { error: false, notfound: true };

    return { error: false, notfound: true };
  } catch (error) {
    return { error: true };
  }
};

export const DeleteBin = async (binId) => {
  try {
    const data = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      binId,
    };
    const res = await instance.delete("/api/bin", { data });
    return res.status;
  } catch (error) {
    return 500;
  }
};

export const UpdateBin = async (bin) => {
  try {
    const data = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      binId: bin._id,
      private: bin.private,
      data: bin.data,
    };
    const res = await instance.put("/api/bin", data);
    return res.status;
  } catch (error) {
    return 500;
  }
};

export const ReqPasswordResetToken = async (username, email, phoneno) => {
  try {
    const data = {
      username,
      email,
      phoneno,
    };
    const res = await instance.post("/api/requestpasswordreset", data);
    if (res.status === 200)
      return {
        status: res.status,
        passwordresettoken: res.data.passwordresettoken,
      };
    return {
      status: res.status,
    };
  } catch (error) {
    return {
      status: 500,
    };
  }
};
export const ReqPasswordReset = async (password, passwordresettoken) => {
  try {
    const data = {
      password,
      passwordresettoken,
    };
    const res = await instance.post("/api/forgotpassword", data);
    return { status: res.status };
  } catch (error) {
    return {
      status: 500,
    };
  }
};
