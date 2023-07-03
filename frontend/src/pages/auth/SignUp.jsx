import React, { useEffect, useState } from "react";
import SignUpForm from "../../components/signup-sections/SignUpForm";
import { Box, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
const SignUp = () => {
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
    <>
      {windowWidth < 1100 && windowHeight > 1000 ? (
        <Box>
          <Box sx={{ position: "absolute", top: 0, left: 5 }}>
            <NavLink to={"/"}>
              <Typography
                color={"white"}
                fontFamily={"Comme, sans-serif"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "2vh",
                }}
              >
                <KeyboardDoubleArrowLeftIcon /> Home
              </Typography>
            </NavLink>
          </Box>
          <SignUpForm />
        </Box>
      ) : windowWidth < 1000 ? (
        <Box>
          <Box sx={{ position: "absolute", top: 0, left: 5 }}>
            <NavLink to={"/"}>
              <Typography
                color={"white"}
                fontFamily={"Comme, sans-serif"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.2rem",
                }}
              >
                <KeyboardDoubleArrowLeftIcon /> Home
              </Typography>
            </NavLink>
          </Box>
          <SignUpForm />
        </Box>
      ) : (
        <Grid container sx={{ maxHeight: "100vh" }}>
          <Box sx={{ position: "absolute", top: 0, left: 5 }}>
            <NavLink to={"/"}>
              <Typography
                color={"white"}
                fontFamily={"Comme, sans-serif"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.7vw",
                }}
              >
                <KeyboardDoubleArrowLeftIcon /> Home
              </Typography>
            </NavLink>
          </Box>
          <Grid
            xs={7}
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SignUpForm />
          </Grid>
          <Grid xs={5} item>
            <img
              src={
                "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779083/signUpPage_xzu6kd.svg"
              }
              alt="HERO"
              style={{
                height: "99vh",
                width:
                  windowWidth < 1200 && windowHeight > 700 ? "50vw" : "auto",
                marginLeft: windowWidth > 1400 ? "-17vw" : "-12vw",
              }}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SignUp;
