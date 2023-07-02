import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
const BMI = () => {
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [bmi, setBmi] = useState();

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const calculatedBMI = weight / (heightInMeters * heightInMeters);
    setBmi(calculatedBMI);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <Box
      sx={{
        mt: 10,
        position: "relative",
        backgroundImage:
          "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1685736861/BMI_vthukj.svg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        p: 15,
      }}
    >
      <Typography
        color={"white"}
        fontSize={windowWidth < 500 ? "6vh" : "8vh"}
        textAlign={"center"}
        sx={{ display: "flex", alignItems: "center", fontWeight: 800 }}
      >
        BMI
        {bmi > 0 ? (
          <Typography
            color={"white"}
            fontSize={windowWidth < 500 ? "6vh" : "8vh"}
            textAlign={"center"}
            fontWeight={800}
            ml={2}
          >
            {bmi.toFixed(1)}
          </Typography>
        ) : (
          <Typography
            color={"white"}
            fontSize={windowWidth < 500 ? "6vh" : "8vh"}
            textAlign={"center"}
            ml={1}
            fontWeight={800}
          >
            Calculator
          </Typography>
        )}
      </Typography>

      <Box
        sx={{
          display: windowWidth < 700 ? "block" : "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <Box
          sx={{
            borderBottom: "2px solid white",
            mb: windowWidth < 700 ? 3 : 0,
          }}
        >
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
              fontSize: "150%",
              paddingBottom: "5px",
            }}
          />
        </Box>
        <Box
          sx={{
            borderBottom: "2px solid white",
            mb: windowWidth < 700 ? 3 : 0,
          }}
        >
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
              fontSize: "150%",
              paddingBottom: "5px",
            }}
          />
        </Box>
      </Box>
      {windowWidth > 1000 ? (
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
      ) : (
        <Box mt={5}>
          <Button
            onClick={calculateBMI}
            sx={{
              textTransform: "none",
              color: "white",
              background: "black",
              minWidth: "7rem",
            }}
          >
            Calculate BMI
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BMI;
