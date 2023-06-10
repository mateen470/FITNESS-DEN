import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const ForgotPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { email } = formData;
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const forgotPasswordRequest = await axios.post("forgotPassword", {
        email,
      });
      if (forgotPasswordRequest.data && forgotPasswordRequest.data.success) {
        toast.success(forgotPasswordRequest.data.message);
      }
      if (
        forgotPasswordRequest.response &&
        forgotPasswordRequest.response.data &&
        forgotPasswordRequest.response.data.message
      ) {
        toast.error(forgotPasswordRequest.response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        fontSize={windowWidth < 400 ? "1.9rem" : "7vw"}
        color={"white"}
        fontWeight={800}
      >
        Forgot Password
      </Typography>
      <Box
        sx={{
          mt: 3,
          minWidth: "50%",
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid white",
        }}
      >
        <input
          type="email"
          placeholder="please provide your Email"
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
            fontSize: windowWidth < 700 ? "1.1rem" : "1.8vw",
          }}
        />
      </Box>
      {windowWidth < 700 ? (
        <Button
          sx={{
            textTransform: "none",
            background: "white",
            color: "black",
            fontSize: windowWidth < 400 ? "1rem" : "1.4rem",
            my: 2,
          }}
          onClick={handleFormSubmit}
        >
          {" "}
          Submit
        </Button>
      ) : (
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
            Submit
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ForgotPasswordForm;
