import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(name, email, password);
      const registerRequest = await axios.post(
        "http://localhost:5000/fitness-den/signup",
        {
          name,
          email,
          password,
        }
      );
      console.log(registerRequest.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography fontSize={"7vw"} color={"white"}>
        Be a Member!
      </Typography>
      <Box
        sx={{
          mt: 3,
          minWidth: "70%",
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid white",
        }}
      >
        <input
          type="string"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          style={{
            minWidth: "100%",
            padding: "10px",
            color: "white",
            backgroundColor: "none",
            outline: "none",
            border: "none",
            fontSize: "1.7vw",
          }}
        />
      </Box>
      <Box
        sx={{
          mt: 3,
          minWidth: "70%",
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid white",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={{
            minWidth: "100%",
            padding: "10px",
            color: "white",
            backgroundColor: "none",
            outline: "none",
            border: "none",
            fontSize: "1.7vw",
          }}
        />
      </Box>
      <Box
        sx={{
          mt: 3,
          minWidth: "70%",
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid white",
        }}
      >
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          style={{
            minWidth: "100%",
            padding: "10px",
            color: "white",
            backgroundColor: "none",
            outline: "none",
            border: "none",
            fontSize: "1.7vw",
          }}
        />
      </Box>
      <Box
        sx={{
          border: "2px solid white",
          p: 1,
          px: 2,
          mt: 3,
          height: "4vw",
          width: "8.5vw",
          cursor: "pointer",
        }}
        onClick={handleFormSubmit}
      >
        <Typography
          color={"black"}
          fontFamily={"Comme, sans-serif"}
          sx={{
            background: "white",
            fontSize: "1.7vw",
            height: "3.8vw",
            width: "9vw",
            ml: -4.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "scale 0.3s ease-in-out",
            fontWeight: "bold",
            "&:hover": {
              scale: "0.95 !important",
            },
          }}
        >
          Join
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography
          fontFamily={"Comme, sans-serif"}
          color={"white"}
          sx={{ fontSize: "1.5vw" }}
        >
          already have an account?
          <NavLink
            to={"/login"}
            style={{ borderBottom: "2px solid white", fontSize: "1.5vw" }}
          >
            LogIn
          </NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpForm;
