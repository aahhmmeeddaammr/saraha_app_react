import { AuthContext } from "@/context/AuthContextProvider";
import { API_BASEURL, providerEnum } from "@/lib/config/config";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [activeTab, setActiveTab] = useState("signin");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      login({ provider: "system", values });
    },
  });

  const login = ({ provider, idToken, values }: { provider: string; idToken?: string; values?: typeof initialValues }) => {
    setIsLoading(true);
    const payload = provider == providerEnum.google ? { idToken } : values;
    axios
      .post(provider == providerEnum.google ? `${API_BASEURL}/auth/singup/gmail` : `${API_BASEURL}/auth/login`, payload)
      .then(({ data }) => {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        authContext.setAuth({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          userId: jwtDecode<{ userId: string }>(data.data.accessToken).userId,
        });
        toast.success("login successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log("Error in signup", error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const registerInitialValues = {
    fullName: "",
    email: "",
    password: "",
    phone: "",
  };

  const registerFormik = useFormik({
    initialValues: registerInitialValues,
    onSubmit: (values) => {
      axios
        .post("http://localhost:3001/auth/singup", values)
        .then(({ data }) => {
          toast.success("Signup complete. A confirmation link has been sent to your email.");
          setActiveTab("signin");
          console.log(data);
        })
        .catch((error) => {
          setSignUpError(error.response.data.message);
          console.log("Fail to login", error.response.data.message);
        });
    },
  });

  const logOut = () => {
    localStorage.clear();
    authContext.setAuth({
      accessToken: null,
      refreshToken: null,
      userId: null,
    });
    navigate("/auth");
  };
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const { data } = await axios.get(`${API_BASEURL}/user/refresh-token`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      localStorage.setItem("accessToken", data.data.accessToken);
      const newData = {
        userId: authContext.userId,
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      };
      authContext.setAuth(newData);
      return data.data.accessToken;
    } catch (error) {
      console.error("Failed to refresh token", error);
      logOut();
      return null;
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      refreshAccessToken();
    }, 50 * 60 * 1000);

    return () => clearTimeout(timeout);
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
  };
}
