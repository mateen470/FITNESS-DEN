import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import bmiImage from "../../assets/BMI.svg";
const BMI = () => {
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [bmi, setBmi] = useState();

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const calculatedBMI = weight / (heightInMeters * heightInMeters);
    setBmi(calculatedBMI);
  };

  return (
    <Box
      sx={{
        mt: 10,
        position: "relative",
        backgroundImage: `url(${bmiImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minWidth: "100%",
        minHeight: `30vw`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        color={"white"}
        variant="h2"
        textAlign={"center"}
        sx={{ display: "flex", alignItems: "center" }}
      >
        BMI
        {bmi > 0 ? (
          <Typography color={"white"} variant="h2" textAlign={"center"}>
            : {bmi.toFixed(1)}
          </Typography>
        ) : (
          <Typography color={"white"} variant="h2" textAlign={"center"} ml={1}>
            Calculator
          </Typography>
        )}
      </Typography>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <Box sx={{ borderBottom: "2px solid white" }}>
          <input
            placeholder="Height (cm)"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={{
              minWidth: "80%",
              background: "none",
              color: "white",
              outline: "none",
              border: "none",
              fontSize: "1.7vw",
              paddingBottom: "5px",
            }}
          />
        </Box>
        <Box sx={{ borderBottom: "2px solid white" }}>
          <input
            placeholder="Weight (kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={{
              minWidth: "80%",
              background: "none",
              color: "white",
              outline: "none",
              border: "none",
              fontSize: "1.7vw",
              paddingBottom: "5px",
            }}
          />
        </Box>
      </Container>
      <Box
        sx={{
          border: "2px solid black",
          p: 1,
          px: 2,
          mt: 3,
          height: "3.5vw",
          width: "9.5vw",
          cursor: "pointer",
        }}
      >
        <Typography
          color={"white"}
          fontFamily={"Rubik, sans-serif"}
          fontWeight={600}
          sx={{
            background: " black",
            fontSize: "1.3vw",
            height: "3.5vw",
            width: "10vw",
            ml: -4.3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "scale 0.3s ease-in-out",
            "&:hover": {
              scale: "0.95 !important",
            },
          }}
          onClick={calculateBMI}
        >
          Calculate BMI
        </Typography>
      </Box>
    </Box>
  );
};

export default BMI;
