import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ViewWorkoutPlanDetails = () => {
  const Details = useSelector(
    (state) => state.WorkoutPlanDetails.WorkoutPlanDetails
  );
  console.log(Details);
  return (
    <Container sx={{ textAlign: "justify" }}>
      <Typography>Request Id: {Details._id}</Typography>
      <Typography>Plan Title: {Details.title}</Typography>
      <Typography>User Age: {Details.age}</Typography>
      <Typography>User Height: {Details.height}</Typography>
      <Typography>User Wight: {Details.weight}</Typography>
      <Typography>Injuries: {Details.injury ? "Yes" : "No"}</Typography>
      {Details.injury && (
        <Typography>Details of Injury: {Details.injuryDes}</Typography>
      )}
      <Typography>Surgeries: {Details.surgery ? "Yes" : "No"}</Typography>
      {Details.surgery && (
        <Typography>Details of Surgery: {Details.surgeryDes}</Typography>
      )}
      <Typography>
        Gym Equipments Available: {Details.equipments ? "Yes" : "No"}
      </Typography>
      {Details.equipments && (
        <Typography>
          Details of Available Equipments: {Details.equipmentsDes}
        </Typography>
      )}
      <Button>
        <Link to="/create-workout-plan">Create Plan</Link>
      </Button>
    </Container>
  );
};
export default ViewWorkoutPlanDetails;
