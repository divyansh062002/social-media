import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function RequiresAuth({ children }) {
  const location = useLocation();
  const {
    authState: { token },
  } = useContext(AuthContext);

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
}

export default RequiresAuth;
