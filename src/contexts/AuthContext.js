import { createContext, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginService, signupService } from "../services/AuthService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const initialAuthState = {
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("token")),
  };

  const authReducer = (state, action) => {
    switch (action.type) {
      case "setUser":
        return { ...state, user: action.payload };
      case "setToken":
        return { ...state, token: action.payload };
      default:
        return state;
    }
  };

  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleUserLogin = async (username, password) => {
    try {
      const res = await loginService(username, password);
      const resJson = await res?.json();
      console.log(resJson);
      const { foundUser, encodedToken } = resJson;
      if (res?.status === 200) {
        localStorage.setItem("user", JSON.stringify(foundUser));
        authDispatch({ type: "setUser", payload: foundUser });
        localStorage.setItem("token", JSON.stringify(encodedToken));
        authDispatch({ type: "setToken", payload: encodedToken });
        navigate(
          location?.state?.from?.pathname
            ? location?.state?.from?.pathname
            : "/"
        );
      } else {
        setLoginError("The username you entered is not registered.");
      }
    } catch (error) {
      console.error(error.message);
      setLoginError(error.response.data.errors[0]);
    }
  };

  const handleUserSignup = async (formData) => {
    try {
      if (formData?.password === formData?.confirmPassword) {
        const res = await signupService(formData);
        const resJson = await res.json();
        const { createdUser, encodedToken } = resJson;
        if (res?.status === 201) {
          localStorage.setItem("user", JSON.stringify(createdUser));
          authDispatch({ type: "setUser", payload: createdUser });
          localStorage.setItem("token", JSON.stringify(encodedToken));
          authDispatch({ type: "setToken", payload: encodedToken });
          navigate(
            location?.state?.from?.pathname
              ? location?.state?.from?.pathname
              : "/"
          );
        }
      } else {
        setSignupError("Password and Confirm Password do not match");
      }
    } catch (error) {
      console.error(error.message);
      setSignupError(error.response.data.errors[0]);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    authDispatch({ type: "setUser", payload: {} });
    authDispatch({ type: "setToken", payload: "" });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        loginError,
        signupError,
        setSignupError,
        authDispatch,
        handleUserLogin,
        handleUserSignup,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
