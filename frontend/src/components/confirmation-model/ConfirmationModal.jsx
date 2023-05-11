import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

const ConfirmationModal = ({ modalOpen, setModalOpen, submitPlan }) => {
  const handleClick = () => {
    setModalOpen(!modalOpen);
    submitPlan();
  };
  return (
    <Container
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
          bgcolor: "grey",
          height: "30%",
          width: "30%",
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
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography sx={{ color: "white" }}>Are You Sure?</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button sx={{ bgcolor: "Green" }} onClick={handleClick}>
            Yes
          </Button>
          <Button
            sx={{ bgcolor: "Red" }}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            No
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ConfirmationModal;
