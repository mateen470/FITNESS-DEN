import React, { useState } from "react";
import Plan from "./WorkoutPlanFormat";
import { EmptyExcercise } from "../../context/Excercise";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../confirmation-model/ConfirmationModal";
import { DurationValidation } from "../../Validations/DurationValidation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AddPlan,
  AddWeeklyPlan,
  EmptyWeeklyPlan,
  SubmitPlan,
} from "../../context/Plan";
import {
  WorkoutNameValidation,
  ExcerciseValidation,
} from "../../Validations/WorkOutPlanValidations";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

const CreateWorkoutPlan = () => {
  const dispatch = useDispatch();
  const Excercise = useSelector((state) => state.Excercise.Excercise);
  const Request = useSelector(
    (state) => state.WorkoutPlanDetails.WorkoutPlanDetails
  );
  const [duration, setDuration] = useState();
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [BodyPart, setBodyPart] = useState("");
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const addWeeklyPlan = () => {
    dispatch(
      AddWeeklyPlan({
        Week: currentWeek,
        Day: currentDay,
        BodyPart: BodyPart,
        Excercise,
      })
    );
  };
  async function handleClick(e) {
    e.preventDefault();
    toast.error(WorkoutNameValidation(BodyPart));
    toast.error(ExcerciseValidation(Excercise));
    if (!WorkoutNameValidation(BodyPart) && !ExcerciseValidation(Excercise)) {
      addWeeklyPlan();
      if (currentDay > 5) {
        if (currentWeek >= duration) {
          setFlag(true);
        }
      }
      setCurrentDay(currentDay + 1);
      if (currentDay === 7) {
        dispatch(AddPlan());
        dispatch(EmptyWeeklyPlan());
        setCurrentWeek(currentWeek + 1);
        setCurrentDay(1);
      }
      dispatch(EmptyExcercise());
      setBodyPart("");
    }
  }
  const submitPlan = () => {
    addWeeklyPlan();
    dispatch(AddPlan());
    dispatch(EmptyExcercise());
    dispatch(SubmitPlan());
    axios
      .delete("workout/workout-request/" + Request._id)
      .then((res) => console.log(res));
    navigate("/all-workout-plan-req");
  };

  const handleSubmit = () => {
    toast.error(WorkoutNameValidation(BodyPart));
    toast.error(ExcerciseValidation(Excercise));
    if (!WorkoutNameValidation(BodyPart) && !ExcerciseValidation(Excercise)) {
      setModalOpen(!modalOpen);
    }
  };

  const fixDuration = () => {
    toast.error(DurationValidation(duration));
    if (!DurationValidation(duration)) setFlag1(true);
  };

  return (
    <Container>
      {modalOpen && (
        <ConfirmationModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          submitPlan={submitPlan}
        />
      )}
      {!flag1 && (
        <Box>
          <TextField
            label="Select Duration"
            type="number"
            onChange={(e) => setDuration(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">Weeks</InputAdornment>
              ),
            }}
          />
          <Button onClick={fixDuration}>Set Duration</Button>
        </Box>
      )}
      {flag1 && (
        <>
          <Typography>Week {currentWeek}</Typography>
          <Typography>
            {currentDay === 1
              ? "Monday"
              : currentDay === 2
              ? "Tuesday"
              : currentDay === 3
              ? "Wednesday"
              : currentDay === 4
              ? "Thursday"
              : currentDay === 5
              ? "Friday"
              : currentDay === 6
              ? "Saturday"
              : currentDay === 7
              ? "Sunday"
              : ""}
          </Typography>

          <TextField
            label="Workout Name"
            value={BodyPart}
            onChange={(e) => setBodyPart(e.target.value)}
          />

          <Plan />
          {flag ? (
            <Button onClick={handleSubmit}>Submit Plan</Button>
          ) : (
            <Button onClick={handleClick}>Next</Button>
          )}
        </>
      )}
    </Container>
  );
};

export default CreateWorkoutPlan;
