import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddExcercise } from "../../context/Excercise";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ExcerciseNameValidation,
  RepsValidation,
  SetsValidation,
  DemoLinkValidation,
} from "../../Validations/WorkOutPlanValidations";
import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";

const WorkoutPlanFormat = () => {
  const dispatch = useDispatch();
  const Excercise = useSelector((state) => state.Excercise.Excercise);
  const [Name, setName] = useState("");
  const [Sets, setSets] = useState();
  const [Reps, setReps] = useState();
  const [DemoLink, setDemoLink] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    toast.error(ExcerciseNameValidation(Name));
    toast.error(SetsValidation(Sets));
    toast.error(RepsValidation(Reps));
    toast.error(DemoLinkValidation(DemoLink));
    if (
      !ExcerciseNameValidation(Name) &&
      !SetsValidation(Sets) &&
      !RepsValidation(Reps) &&
      !DemoLinkValidation(DemoLink)
    ) {
      dispatch(AddExcercise({ Name, Sets, Reps, DemoLink }));
      setSets("");

      setName("");
      setReps("");
      setDemoLink("");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mb: 2,
      }}
    >
      <Box>
        <form onSubmit={handleClick}>
          <FormControl
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              placeholder="ExcerciseName"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                background: "none",
                color: "white",
                borderBottom: "1px solid white",
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
            />

            <TextField
              placeholder="Sets"
              value={Sets}
              type="number"
              onChange={(e) => setSets(e.target.value)}
              sx={{
                background: "none",
                color: "white",
                borderBottom: "1px solid white",
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
            />

            <TextField
              value={Reps}
              placeholder="Reps"
              type="number"
              onChange={(e) => setReps(e.target.value)}
              sx={{
                background: "none",
                color: "white",
                borderBottom: "1px solid white",
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
            />

            <TextField
              value={DemoLink}
              placeholder="Video Link For Demo"
              type="url"
              onChange={(e) => setDemoLink(e.target.value)}
              sx={{
                background: "none",
                color: "white",
                borderBottom: "1px solid white",
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
            />
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 3,
            }}
          >
            <Button
              sx={{ textTransform: "none", background: "white" }}
              type="submit"
            >
              <Typography
                color={"black"}
                fontFamily={"Comme, sans-serif"}
                fontSize={"1.5vw"}
                fontWeight={800}
              >
                Add Excercise
              </Typography>
            </Button>
          </Box>
        </form>
      </Box>
      <Typography
        color={"white"}
        fontFamily={"Comme, sans-serif"}
        fontSize={"1.5vw"}
        fontWeight={800}
        my={2}
        borderBottom={"1px solid white"}
      >
        Added Excercises
      </Typography>
      {Excercise.map((item, index) => {
        return (
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 1,
              p: 3,
              mb: 2,
            }}
          >
            <Typography
              key={index}
              color={"white"}
              fontFamily={"Comme, sans-serif"}
              fontSize={"1.2vw"}
            >
              Name:{item.Name}
            </Typography>
            <Typography
              key={index}
              color={"white"}
              fontFamily={"Comme, sans-serif"}
              fontSize={"1.2vw"}
            >
              Number of Sets:{item.Sets}
            </Typography>
            <Typography
              key={index}
              color={"white"}
              fontFamily={"Comme, sans-serif"}
              fontSize={"1.2vw"}
            >
              Number of repetetions:
              {item.Reps}
            </Typography>
            <Typography
              key={index}
              color={"white"}
              fontFamily={"Comme, sans-serif"}
              fontSize={"1.2vw"}
            >
              Video Link For Demo:{item.DemoLink}
            </Typography>
          </Box>
        );
      })}
    </Container>
  );
};

export default WorkoutPlanFormat;
