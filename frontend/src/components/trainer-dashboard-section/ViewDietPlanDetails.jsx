import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ViewDietPlanDetails = () => {
  const Details = useSelector((state) => state.DietPlanDetails.DietPlanDetails);

  return (
    <Container>
      <Typography>Request Id: {Details._id}</Typography>
      <Typography>Plan Title: {Details.Title}</Typography>
      <Typography>User Age: {Details.Age}</Typography>
      <Typography>User Wight: {Details.Weight}</Typography>
      <Typography>
        Allergies or Medical History: {Details.MedicalHistory ? "Yes" : "No"}
      </Typography>
      {Details.MedicalHistory && (
        <Typography>
          Details of Allergies or Medical History: {Details.MedicalHistoryDes}
        </Typography>
      )}
      <Button>
        <Link to="/create-diet-plan">Create Plan</Link>
      </Button>
    </Container>
  );
};

export default ViewDietPlanDetails;
