import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
const UserDashboardSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const getUser = await axios.get("auth-user");
        setName(getUser.data.data._doc.name);
        setEmail(getUser.data.data._doc.email);
        if (getUser.data.data._doc.role === 1) {
          navigate("/admin");
        } else if (getUser.data.data._doc.role === 2) {
          navigate("/trainer");
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
      <Box
        sx={{
          minHeight: "60vh",
          minWidth: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 3,
          // backgroundImage: 'url("https://your-cdn-url.com/path-to-your/rough-texture.png")', // replace this with your CDN URL
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
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
