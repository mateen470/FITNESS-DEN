import React, { useEffect } from "react";
import {
  setIsAdmin,
  setIsTrainer,
  setIsUser,
} from "../../context/CheckForUserType";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Logout } = useSelector((state) => state.CheckForUserType);
  useEffect(() => {
    Logout && dispatch(setIsTrainer(false));
    Logout && dispatch(setIsUser(false));
    Logout && dispatch(setIsAdmin(false));
    navigate("/");
  }, [Logout]);
  return <div></div>;
};

export default LogOut;
