import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../contexts/Auth";

export function PrivateRoute() {
  const { user } = useAuth();

  return (
    /* <Route
      {...rest}
      render={(props) => {
        // Renders the page only if `user` is present (user is authenticated)
        // Otherwise, redirect to the login page
        return user ? <Component {...props} /> : <Navigate to="/login" />;
      }}
    ></Route>
    */

    user ? <Outlet /> : <Navigate to="/login" />
  );
}
