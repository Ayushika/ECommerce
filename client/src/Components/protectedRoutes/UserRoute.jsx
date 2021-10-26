/** @format */

import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import LoadingToRedirect from "../LoadingToRedirect";

const UserRoute = ({ children, ...rest }) => {
  const [ok, setOk] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const checkIsValid = async (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    return await axios.post("/api/user/isValid", {}, config);
  };

  useEffect(() => {
    if (userInfo && userInfo.token) {
      checkIsValid(userInfo.token)
        .then(() => setOk(true))
        .catch((error) => {
          setOk(false);
          console.error(error);
        });
    }
  }, [userInfo]);
  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
