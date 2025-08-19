import { AuthContext } from "@/context/AuthContextProvider";
import { API_BASEURL, providerEnum } from "@/lib/config/config";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { api } from "@/lib/api";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [activeTab, setActiveTab] = useState("signin");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const login = ({
    provider,
    idToken,
    values,
  }: {
    provider: string;
    idToken?: string;
    values?: { email: string; password: string };
  }) => {
    setIsLoading(true);
    const payload = provider === providerEnum.google ? { idToken } : values;
    const url = provider === providerEnum.google ? `${API_BASEURL}/auth/singup/gmail` : `${API_BASEURL}/auth/login`;

    axios
      .post(url, payload, { withCredentials: true })
      .then((res) => {
        const { accessToken, refreshToken } = res.data.data;
        localStorage.setItem("token", accessToken);
        const decoded = jwtDecode<{ userId: string }>(accessToken);
        authContext.setAuth({
          accessToken,
          refreshToken,
          userId: decoded.userId,
        });
        localStorage.setItem("isAuthentecated", "true");
        toast.success("Login successful");
        navigate("/dashboard");
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Login failed";
        setError(message);
        console.error("Login error:", message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const registerFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
    },
    onSubmit: (values) => {
      axios
        .post(`${API_BASEURL}/auth/singup`, values, { withCredentials: true })
        .then(() => {
          toast.success("Signup successful. Check your email.");
          setActiveTab("signin");
        })
        .catch((err) => {
          const message = err?.response?.data?.message || "Signup failed";
          setSignUpError(message);
          console.error("Signup error:", message);
        });
    },
  });

  const refreshAccessToken = async () => {
    return axios
      .get(`${API_BASEURL}/user/refresh-token`, {
        withCredentials: true,
      })
      .then((res) => {
        const { accessToken } = res.data.data;
        const decoded = jwtDecode<{ userId: string }>(accessToken);

        authContext.setAuth({
          accessToken,
          refreshToken: null,
          userId: decoded.userId,
        });

        return accessToken;
      })
      .catch((err) => {
        console.error("Refresh token failed", err);
        logOut();
        return null;
      });
  };

  const logOut = () => {
    api
      .delete(`/auth/logout`, { withCredentials: true })
      .catch((err) => console.error("Logout error", err))
      .finally(() => {
        authContext.setAuth({
          accessToken: null,
          refreshToken: null,
          userId: null,
        });
        localStorage.clear();
        navigate("/auth");
      });
  };

  useLayoutEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      if (authContext.accessToken) {
        config.headers.Authorization = `Bearer ${authContext.accessToken}`;
      }
      config.withCredentials = true;
      return config;
    });

    return () => {
      api.interceptors.request.eject(reqInterceptor);
    };
  }, [authContext.accessToken]);

  useLayoutEffect(() => {
    const resInterceptor = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;
        if (error?.response?.data?.message === "Missing or invalid token" && !originalRequest._retry) {
          originalRequest._retry = true;

          return refreshAccessToken().then((newAccessToken) => {
            if (newAccessToken) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return api(originalRequest);
            }
            return Promise.reject(error);
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(resInterceptor);
    };
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login({ provider: providerEnum.system, values });
    },
  });
  useLayoutEffect(() => {
    if (localStorage.getItem("token")) {
      authContext.setAuth({
        accessToken: localStorage.getItem("token"),
        refreshToken: null,
        userId: jwtDecode<{ userId: string }>(localStorage.getItem("token") as string).userId,
      });
    }
  }, []);
  return {
    isLoading,
    error,
    signUpError,
    activeTab,
    setActiveTab,
    login,
    registerFormik,
    formik,
    ...authContext,
    logOut,
    setError,
    setSignUpError,
  };
}
