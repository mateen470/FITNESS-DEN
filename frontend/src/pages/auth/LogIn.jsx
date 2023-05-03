import React, { useEffect, useState } from "react";
import LoginForm from "../../components/login-sections/LoginForm";
import { Grid } from "@mui/material";
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
      <Grid xs={4}>
        <img
          src={loginImage}
          style={{
            height: "99vh",
            width: windowWidth < 1200 && windowHeight > 700 ? "50vw" : "auto",
            marginLeft: windowWidth > 1200 ? "-9vw" : "-6vw",
          }}
        />
      </Grid>
      <Grid
        xs={8}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default LogIn;
