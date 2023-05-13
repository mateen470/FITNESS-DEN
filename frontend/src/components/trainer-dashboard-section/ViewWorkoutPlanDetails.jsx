import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const ViewWorkoutPlanDetails = () => {
  const Details = useSelector(
    (state) => state.WorkoutPlanDetails.WorkoutPlanDetails
  );
  console.log(Details);
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
        <NavLink to={"/all-workout-plan-req"}>
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
        Workout Plan Request Form
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
            {Details.title}
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
            {Details.age}
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
          User Height:
          <Typography
            sx={{
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            {Details.height}
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
          User Weight:
          <Typography
            sx={{
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            {Details.weight}
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
          Injuries:
          <Typography
            sx={{
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            {Details.injury ? "Yes" : "No"}
          </Typography>
        </Typography>
        {Details.injury && (
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
            Details of Injury:
            <Typography
              sx={{
                color: "white",
                fontSize: "1.1rem",
                fontFamily: "Comme, sans-serif",
              }}
            >
              {Details.injuryDes}
            </Typography>
          </Typography>
        )}
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
          Surgeries:
          <Typography
            sx={{
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            {Details.surgery ? "Yes" : "No"}
          </Typography>
        </Typography>
        {Details.surgery && (
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
            Details of Surgery:
            <Typography
              sx={{
                color: "white",
                fontSize: "1.1rem",
                fontFamily: "Comme, sans-serif",
              }}
            >
              {Details.surgeryDes}
            </Typography>
          </Typography>
        )}
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
          Gym Equipments Available:
          <Typography
            sx={{
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            {Details.equipments ? "Yes" : "No"}
          </Typography>
        </Typography>
        {Details.equipments && (
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
            Details of Available Equipments:
            <Typography
              sx={{
                color: "white",
                fontSize: "1.1rem",
                fontFamily: "Comme, sans-serif",
              }}
            >
              {Details.equipmentsDes}
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
          <NavLink to="/create-workout-plan">
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
export default ViewWorkoutPlanDetails;
