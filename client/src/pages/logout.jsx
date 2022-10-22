import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "./../services/user";
import { toast } from "react-toastify";

const Logout = ({ updateUser }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { data } = await logoutUser();
      toast.success(data.message, { autoClose: 2500 });
      updateUser(null);
    } catch (error) {
      toast.error(error.response.data, { autoClose: 2500 });
    }
    navigate("/login");
  };
  return (
    <Link className="nav-link" onClick={handleLogout}>
      Logout
    </Link>
  );
};

export default Logout;
