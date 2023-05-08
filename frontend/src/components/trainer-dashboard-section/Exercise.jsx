import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Exercise = () => {
  const Exercise = useSelector((state) => state.Excercise.SingleExcercise);

  return (
    <Container>
      {Exercise.map((i) => (
        <Box>
          <Typography>{i.Name}</Typography>
          <Typography>{i.Sets}</Typography>
          <Typography>{i.Reps}</Typography>
          <Link>{i.DemoLink}</Link>
        </Box>
      ))}
    </Container>
  );
};

export default Exercise