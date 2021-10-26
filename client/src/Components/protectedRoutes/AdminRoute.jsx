/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../LoadingToRedirect";

const AdminRoute = ({ children, ...rest }) => {
  const [admin, setAdmin] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const checkAdmin = async (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    return await axios.post("/api/user/isAdmin", {}, config);
  };

  useEffect(() => {
    if (userInfo && userInfo.token) {
      checkAdmin(userInfo.token)
        .then(() => setAdmin(true))
        .catch((error) => {
          setAdmin(false);
          console.error(error);
        });
    }
  }, [userInfo]);

  return admin ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
