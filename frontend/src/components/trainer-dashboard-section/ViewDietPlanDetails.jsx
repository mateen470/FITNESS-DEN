import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const ViewDietPlanDetails = () => {
  const Details = useSelector((state) => state.DietPlanDetails.DietPlanDetails);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/all-diet-plan-req"}>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            sx={{ display: "flex", alignItems: "center", fontSize: "1.7vw" }}
          >
            <KeyboardDoubleArrowLeftIcon /> Back
          </Typography>
        </NavLink>
      </Box>
      <Typography
        fontSize={"4.5vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        my={4}
      >
        Diet Plan Request Form
      </Typography>
      <Box
        sx={{
          p: 3,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
          zIndex: 10,
          p: 3,
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "1.2rem",
            fontFamily: "Comme, sans-serif",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          Plan Title:
          <Typography
            sx={{
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            {Details.Title}
          </Typography>
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: "1.2rem",
            fontFamily: "Comme, sans-serif",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          User Age:
          <Typography
            sx={{
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            {Details.Age}
          </Typography>
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: "1.2rem",
            fontFamily: "Comme, sans-serif",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          User Wight:
          <Typography
            sx={{
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            {Details.Weight}
          </Typography>
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: "1.2rem",
            fontFamily: "Comme, sans-serif",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          Allergies or Medical History:
          <Typography
            sx={{
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            {Details.MedicalHistory ? "Yes" : "No"}
          </Typography>
        </Typography>
        {Details.MedicalHistory && (
          <Typography
            sx={{
              color: "white",
              fontSize: "1.2rem",
              fontFamily: "Comme, sans-serif",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            Details of Allergies or Medical History:
            <Typography
              sx={{
                color: "white",
                fontSize: "1.1rem",
                fontFamily: "Comme, sans-serif",
              }}
            >
              {Details.MedicalHistoryDes}
            </Typography>
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 10,
        }}
      >
        <Box
          sx={{
            border: "2px solid white",
            p: 1,
            px: 2,
            mt: 3,
            height: "4vw",
            width: "13.5vw",
            cursor: "pointer",
          }}
        >
          <NavLink to="/create-diet-plan">
            <Typography
              color={"black"}
              fontFamily={"Comme, sans-serif"}
              sx={{
                background: "white",
                fontSize: "1.7vw",
                height: "3.8vw",
                width: "14vw",
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
              Create Plan
            </Typography>
          </NavLink>
        </Box>
      </Box>
    </Container>
  );
};

export default ViewDietPlanDetails;
