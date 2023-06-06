import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [eyeIcon, setEyeIcon] = useState(false);

  const navigate = useNavigate();
  const { email, password } = formData;
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginRequest = await axios.post(
        "login",
        { email, password },
        { withCredentials: true }
      );
      if (loginRequest.data && loginRequest.data.success) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${loginRequest.data.data}`;
        toast.success(loginRequest.data.message);
        navigate("/route-check");
      }
      if (
        loginRequest.response &&
        loginRequest.response.data &&
        loginRequest.response.data.message
      ) {
        toast.error(loginRequest.response.data.message);
      }
    } catch (error) {
      console.log(error.message);
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
      <Typography fontSize={"7vw"} color={"white"} fontWeight={800}>
        Welcome Back!
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
          justifyContent: "space-between",
          borderBottom: "2px solid white",
          pr: 3,
        }}
      >
        <input
          type={eyeIcon ? "text" : "password"}
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
        <button
          style={{
            cursor: "pointer",
            background: "none",
            border: "none",
            outline: "none",
          }}
          onClick={() => setEyeIcon(!eyeIcon)}
        >
          {eyeIcon ? (
            <RemoveRedEyeIcon sx={{ color: "white", fontSize: "2.5vw" }} />
          ) : (
            <VisibilityOffIcon sx={{ color: "white", fontSize: "2.5vw" }} />
          )}
        </button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <NavLink to={"/forgot"}>
          <Typography
            fontFamily={"Comme, sans-serif"}
            color={"white"}
            sx={{
              borderBottom: "2px solid white",
              fontSize: "1.5vw",
            }}
          >
            Forgot Password?
          </Typography>
        </NavLink>
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
          SignIn
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography
          fontFamily={"Comme, sans-serif"}
          color={"white"}
          sx={{ fontSize: "1.5vw" }}
        >
          Don't have an account?
          <NavLink
            to={"/signup"}
            style={{ borderBottom: "2px solid white", fontSize: "1.5vw" }}
          >
            Sign Up
          </NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
