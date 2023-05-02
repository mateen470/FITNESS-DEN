import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const BMI = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBmi] = useState(0);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const calculatedBMI = weight / (heightInMeters * heightInMeters);
    setBmi(calculatedBMI);
  };

  return (
    <Container sx={{ mb: 10 }}>
      <Typography color={"white"} variant="h2" textAlign={"center"} my={4}>
        BMI Calculator
      </Typography>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box>
          <TextField
            label="Height (cm)"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            sx={{ minWidth: "80vh" }}
          />
        </Box>
        <Box>
          <TextField
            label="Weight (kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            sx={{ minWidth: "80vh" }}
          />
        </Box>
        <Button variant="contained" onClick={calculateBMI}>
          Calculate BMI
        </Button>
      </Container>
      {bmi > 0 && (
        <Typography color={"white"} variant="h5" textAlign={"center"} my={4}>
          Your BMI is: {bmi.toFixed(1)}
        </Typography>
      )}
    </Container>
  );
};

export default BMI;
