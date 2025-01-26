import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PrivateRoute = ({ roles, children }) => {
  const { user } = useSelector((state) => state.auth); 

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user && roles && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;