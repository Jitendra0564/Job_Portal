import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../Redux/feature/alertslice";
import axios from "axios";
import { setUser } from "../../Redux/feature/auth/authsilce";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "/api/v1/user/get-user",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (data.success) {
        dispatch(setUser(data.data));
      } else {
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  });

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
