import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AddCurrentUserId } from "../../context/CurrentUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  setIsAdmin,
  setIsTrainer,
  setIsUser,
} from "../../context/CheckForUserType";

const UserDashboardSection = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { isAdmin, isUser, isTrainer } = useSelector(
    (state) => state.CheckForUserType
  );

  const LogOut = async () => {
    try {
      const logOutResponse = await axios.post("logout");
      if (logOutResponse.data && logOutResponse.data.success) {
        toast.success(logOutResponse.data.message);
        dispatch(setIsUser(false));
        navigate("/");
      }
      if (
        logOutResponse.response &&
        logOutResponse.response.data &&
        logOutResponse.response.data.message
      ) {
        toast.error(logOutResponse.response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const getUser = await axios.get("auth-user");
        dispatch(AddCurrentUserId(getUser.data.data._doc._id));
        setName(getUser.data.data._doc.name);
        setEmail(getUser.data.data._doc.email);
        if (getUser.data.data._doc.role === 1) {
          dispatch(setIsAdmin(true));
          navigate("/admin");
        } else if (getUser.data.data._doc.role === 2) {
          dispatch(setIsTrainer(true));
          navigate("/trainer");
        } else {
          dispatch(setIsUser(true));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [navigate]);
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ position: "absolute", top: 0, right: 5 }}>
        <Typography
          color={"white"}
          fontFamily={"Comme, sans-serif"}
          onClick={LogOut}
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.7vw",
            cursor: "pointer",
          }}
        >
          <LogoutIcon /> LogOut
        </Typography>
      </Box>
      <Box
        sx={{
          minHeight: "60vh",
          minWidth: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
          zIndex: 10,
        }}
      >
        <Typography
          color={"white"}
          fontSize={"5.5vh"}
          fontFamily={"Comme, sans-serif"}
          fontWeight={800}
        >
          {name}
        </Typography>
        <Typography
          color={"white"}
          fontSize={"5.5vh"}
          fontFamily={"Comme, sans-serif"}
          fontWeight={800}
        >
          {email}
        </Typography>
        <Typography
          color={"white"}
          fontSize={"4.5vh"}
          fontFamily={"Comme, sans-serif"}
          borderBottom={"0.5px solid white"}
        >
          <NavLink to={"/view-diet-plan"}>ViewDietPlan</NavLink>
        </Typography>
        <Typography
          color={"white"}
          fontSize={"4.5vh"}
          fontFamily={"Comme, sans-serif"}
          borderBottom={"0.5px solid white"}
        >
          <NavLink to={"/view-workout-plan"}>ViewWorkoutPlan</NavLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default UserDashboardSection;
