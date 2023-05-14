import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
const ActivationPageComponent = () => {
  const { activationToken } = useParams();
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (activationToken) {
      const activateEmail = async () => {
        try {
          await axios.post("activation", {
            activationToken,
          });
          setActive(true);
        } catch (error) {
          setActive(false);
        }
      };
      activateEmail();
    }
  }, [activationToken]);
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ display: active ? "block" : "none" }}>
        <Typography fontSize={"6vh"}>ACTIVATED!!</Typography>
      </Box>
      <Box sx={{ display: !active ? "block" : "none" }}>
        <Typography fontSize={"6vh"}>There was an Error!</Typography>
        <Typography fontSize={"5vh"}>Please SignUp again</Typography>
      </Box>
    </Container>
  );
};

export default ActivationPageComponent;
