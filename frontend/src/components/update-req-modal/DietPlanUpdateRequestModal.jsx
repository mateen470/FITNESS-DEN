import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateRequestValidation } from "../../Validations/UpdateRequestValidation";

const DietPlanUpdateRequestModal = ({ modalOpen, setModalOpen, Plan }) => {
  const [UpdateDescription, setUpdateDescription] = useState("");
  console.log(Plan);
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
  const handleClick = () => {
    toast.error(UpdateRequestValidation(UpdateDescription));
    if (!UpdateRequestValidation(UpdateDescription)) {
      setModalOpen(!modalOpen);
      const PlanId = Plan._id;
      axios
        .post("diet/diet-update-request", {
          PlanId,
          UpdateDescription,
        })
        .then((res) => toast.success(res.data.message));
    }
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
      }}
      onClick={() => setModalOpen(false)}
    >
      <ToastContainer position="top-center" />
      <Box
        sx={{
          background: "#29084d",
          height:
            windowWidth < 330
              ? "75vw"
              : windowWidth < 510
              ? "60vw"
              : windowWidth < 880
              ? "35vw"
              : "25vw",
          width:
            windowWidth < 330
              ? "75vw"
              : windowWidth < 510
              ? "60vw"
              : windowWidth < 880
              ? "50vw"
              : "30vw",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          borderRadius: "10px",
          margin: "auto",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          zIndex: "3000000",
          p: 2,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <TextField
          multiline
          rows={4}
          placeholder="kindly describe the required changes"
          sx={{
            minWidth: "25vw",
            minHeight: "3vw",
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
            color: "white",
            fontWeight: "bold",
            "& .MuiOutlinedInput-root": {
              fontSize: "1.2rem",
              "& fieldset": {
                borderWidth: "0",
              },
              "&:hover fieldset": {
                borderWidth: "0",
              },
              "&.Mui-focused fieldset": {
                borderWidth: "0",
              },
              "& .MuiOutlinedInput-input": {
                overflow: "auto",
                color: "white",
              },
            },
          }}
          onChange={(e) => setUpdateDescription(e.target.value)}
        />
        <Button
          sx={{ bgcolor: "white", mx: 1, textTransform: "none" }}
          onClick={handleClick}
        >
          <Typography
            color={"black"}
            fontSize={"1.2rem"}
            fontFamily={"Comme, sans-serif"}
            fontWeight={800}
          >
            Submit
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default DietPlanUpdateRequestModal;