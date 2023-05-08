import React from "react";
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
    <Container>
      <Box>
        <form onSubmit={handleClick}>
          <FormControl>
            <TextField
              label="ExcerciseName"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Sets"
              value={Sets}
              type="number"
              onChange={(e) => setSets(e.target.value)}
            />

            <TextField
              value={Reps}
              label="Reps"
              type="number"
              onChange={(e) => setReps(e.target.value)}
            />

            <TextField
              value={DemoLink}
              label="Video Link For Demo"
              type="url"
              onChange={(e) => setDemoLink(e.target.value)}
            />
          </FormControl>
          <Button type="submit">Add Excercise</Button>
        </form>
      </Box>
      <Typography>Added Excercises</Typography>
      {Excercise.map((item, index) => {
        return (
          <>
            <Typography key={index}>
              Name:{item.Name} Number of Sets:{item.Sets} Number of repetetions:
              {item.Reps} Video Link For Demo:{item.DemoLink}
            </Typography>
          </>
        );
      })}
    </Container>
  );
};

export default WorkoutPlanFormat;
