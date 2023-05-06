import React, { useEffect, useState } from "react";
import LoginForm from "../../components/login-sections/LoginForm";
import { Box, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import loginImage from "../../assets/loginPage.svg";
const LogIn = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Grid container sx={{ maxHeight: "100vh" }}>
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/"}>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            sx={{ display: "flex", alignItems: "center", fontSize: "1.7vw" }}
          >
            <KeyboardDoubleArrowLeftIcon /> Home
          </Typography>
        </NavLink>
      </Box>
      <Grid xs={4} item>
        <img
          src={loginImage}
          alt="HERO IMAGE"
          style={{
            height: "99vh",
            width: windowWidth < 1200 && windowHeight > 700 ? "50vw" : "auto",
            marginLeft: windowWidth > 1200 ? "-9vw" : "-6vw",
          }}
        />
      </Grid>
      <Grid
        xs={8}
        item
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default LogIn;
