import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddCurrentUserId } from "../context/CurrentUser";
import {
  setIsAdmin,
  setIsTrainer,
  setIsUser,
} from "../context/CheckForUserType";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const getUser = await axios.get("auth-user");
        dispatch(AddCurrentUserId(getUser.data.data._doc._id));
        if (getUser.data.data._doc.role === 1) {
          navigate("/admin");
          dispatch(setIsAdmin(true));
        } else if (getUser.data.data._doc.role === 2) {
          navigate("/trainer");
          dispatch(setIsTrainer(true));
        } else {
          navigate("/user");
          dispatch(setIsUser(true));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [navigate]);

  return <div></div>;
};

export default ProtectedRoute;
