import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = use(AuthContext);
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }
  if (user && userStatus == "active") {
    return children;
  }
  return <Navigate state={location?.pathname} to="/login"></Navigate>;
};

export default PrivateRoutes;
