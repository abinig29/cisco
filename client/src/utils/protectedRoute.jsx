import React from "react";
import { useSelector } from "react-redux";
import { selectRole } from "../features/auth/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PotectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const role = useSelector(selectRole);

  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PotectedRoute;
