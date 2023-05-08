import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, TextareaAutosize } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateRequestValidation } from "../../Validations/UpdateRequestValidation";

const WorkoutUpdateRequestModal = ({ modalOpen, setModalOpen, Plan }) => {
  const [Description, setDescription] = useState("");
  console.log(Plan);
  const handleClick = () => {
    toast.error(UpdateRequestValidation(Description));
    if (!UpdateRequestValidation(Description)) {
      setModalOpen(!modalOpen);
      axios
        .post("workout/workout-update-request", {
          Description: Description,
          Plan: Plan,
        })
        .then((res) => console.log(res.data.data));
    }
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
      }}
      onClick={() => setModalOpen(false)}
    >
      <ToastContainer position="top-center" />
      <Box
        sx={{
          bgcolor: "grey",
          height: "30%",
          width: "30%",
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          borderRadius: "10px",
          margin: "auto",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          p: 5,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Describe Changes You Want"
          minRows={4}
          sx={{ width: 200 }}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleClick}>Submit</Button>
      </Box>
    </Container>
  );
};

export default WorkoutUpdateRequestModal;
