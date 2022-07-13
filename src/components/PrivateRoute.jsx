import { CircularProgress } from "@material-ui/core";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "./hooks/useAuthStatus";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return (
      <CircularProgress
        style={{ display: "block", margin: "100px auto" }}
        color="secondary"
        className="progress"
      />
    );
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
