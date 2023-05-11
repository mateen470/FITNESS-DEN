import React from "react";
import { Box, Button, Typography } from "@mui/material";

const ConfirmationModal = ({ modalOpen, setModalOpen, submitPlan }) => {
  const handleClick = () => {
    setModalOpen(!modalOpen);
    submitPlan();
  };
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
          height: "12vw",
          width: "25vw",
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
          fontSize={"1.7rem"}
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
          <Button sx={{ bgcolor: "white", mx: 1 }} onClick={handleClick}>
            <Typography
              color={"black"}
              fontSize={"1.2rem"}
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
              fontSize={"1.2rem"}
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
