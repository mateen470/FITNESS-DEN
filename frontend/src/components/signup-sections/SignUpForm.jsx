import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [eyeIcon, setEyeIcon] = useState(false);

  const { name, email, password } = formData;
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const registerRequest = await axios.post("signup", {
        name,
        email,
        password,
      });
      if (registerRequest.data && registerRequest.data.success) {
        toast.success(registerRequest.data.message);
      }
      if (
        registerRequest.response &&
        registerRequest.response.data &&
        registerRequest.response.data.message
      ) {
        toast.error(registerRequest.response.data.message);
      }
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
      <Typography fontSize={"7vw"} color={"white"} fontWeight={800}>
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
