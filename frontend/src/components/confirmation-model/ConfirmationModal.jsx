import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const ConfirmationModal = ({ modalOpen, setModalOpen, submitPlan }) => {
  const handleClick = () => {
    setModalOpen(!modalOpen);
    submitPlan();
  };
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        bgcolor: "rgba(189,189,189,0.9)",
        zIndex: "2",
      }}
      onClick={() => {
        setModalOpen(false);
      }}
    >
      <Box
        sx={{
          background: "#29084d",
          height:
            windowWidth < 330
              ? "40vw"
              : windowWidth < 510
              ? "30vw"
              : windowWidth < 880
              ? "20vw"
              : "12vw",
          width:
            windowWidth < 330
              ? "60vw"
              : windowWidth < 510
              ? "50vw"
              : windowWidth < 880
              ? "30vw"
              : "25vw",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: "10px",
          margin: "auto",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          zIndex: "3",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography
          fontSize={windowWidth < 880 ? "1rem" : "1.7rem"}
          color={"white"}
          textAlign={"center"}
          fontFamily={"Comme, sans-serif"}
        >
          Are You Sure?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ bgcolor: "white", mx: 1, textTransform: "none" }}
            onClick={handleClick}
          >
            <Typography
              color={"black"}
              fontSize={
                windowWidth < 330
                  ? "0.5rem"
                  : windowWidth < 880
                  ? "0.8rem"
                  : "1.2rem"
              }
              fontFamily={"Comme, sans-serif"}
              fontWeight={800}
            >
              Yes
            </Typography>
          </Button>
          <Button
            sx={{ bgcolor: "white", mx: 1 }}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <Typography
              color={"black"}
              fontSize={
                windowWidth < 330
                  ? "0.5rem"
                  : windowWidth < 880
                  ? "0.8rem"
                  : "1.2rem"
              }
              fontFamily={"Comme, sans-serif"}
              fontWeight={800}
            >
              No
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmationModal;
