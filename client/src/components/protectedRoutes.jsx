import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element, user, redirect, updateOrignalPath }) => {
  const orignalPath = useLocation().pathname;
  useEffect(() => {
    updateOrignalPath(orignalPath);
  }, []);

  const redirectWithMessage = () => {
    toast.error("You need to login First", { autoClose: 2000 });
    return <Navigate to={redirect} />;
  };
  return (user.username && element) || redirectWithMessage();
};

export default ProtectedRoute;
