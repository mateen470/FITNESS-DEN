import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
const ForgotPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Send formData to backend
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography fontSize={"7vw"} color={"white"}>
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
            backgroundColor: "transparent",
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
          Submit
        </Typography>
      </Box>
    </Container>
  );
};

export default ForgotPasswordForm;
