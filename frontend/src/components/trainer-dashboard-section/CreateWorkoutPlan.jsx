import React, { useState, useEffect } from "react";
import Plan from "./WorkoutPlanFormat";
import { EmptyExcercise } from "../../context/Excercise";
import { useDispatch, useSelector } from "react-redux";
import { setWorkoutPlanRequestsLength } from "../../context/CheckForNewPlanRequests";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../confirmation-model/ConfirmationModal";
import { DurationValidation } from "../../Validations/DurationValidation";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
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
  const CurrentWorkoutPlanRequestsLength = useSelector(
    (state) => state.CheckForNewPlanRequests.WorkoutPlanRequestsLength
  );
  const [duration, setDuration] = useState();
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [BodyPart, setBodyPart] = useState("");
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => console.log(Request));
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
    dispatch(
      SubmitPlan({
        IDofCurrentUser: Request.IDofCurrentUser,
        PlanName: Request.title,
      })
    );
    axios
      .delete("workout/workout-request/" + Request._id)
      .then(() =>
        dispatch(
          setWorkoutPlanRequestsLength(CurrentWorkoutPlanRequestsLength - 1)
        )
      );
    navigate("/trainer");
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
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/view-workout-plan-details"}>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            sx={{ display: "flex", alignItems: "center", fontSize: "1.7vw" }}
          >
            <KeyboardDoubleArrowLeftIcon /> Back
          </Typography>
        </NavLink>
      </Box>
      <Typography
        fontSize={"4vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        my={4}
      >
        Workout Plan Creation Form
      </Typography>
      {modalOpen && (
        <ConfirmationModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          submitPlan={submitPlan}
        />
      )}
      {!flag1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            placeholder="Select Duration"
            type="number"
            onChange={(e) => setDuration(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography
                    color={"white"}
                    fontFamily={"Comme, sans-serif"}
                    fontWeight={800}
                  >
                    Weeks
                  </Typography>
                </InputAdornment>
              ),
            }}
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
          <Button
            sx={{ textTransform: "none", background: "white" }}
            onClick={fixDuration}
          >
            <Typography
              color={"black"}
              fontFamily={"Comme, sans-serif"}
              fontSize={"1.7vw"}
              fontWeight={800}
            >
              Set Duration
            </Typography>
          </Button>
        </Box>
      )}
      {flag1 && (
        <>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            fontSize={"1.5rem"}
            fontWeight={800}
          >
            Week {currentWeek}
          </Typography>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            fontSize={"1.5rem"}
            my={1}
            fontWeight={800}
          >
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
            placeholder="Workout Name"
            value={BodyPart}
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
            onChange={(e) => setBodyPart(e.target.value)}
          />

          <Plan />
          {flag ? (
            <Button
              sx={{ textTransform: "none", background: "white", mb: 10 }}
              onClick={handleSubmit}
            >
              <Typography
                color={"black"}
                fontFamily={"Comme, sans-serif"}
                fontSize={"1.5vw"}
                fontWeight={800}
              >
                Submit Plan
              </Typography>
            </Button>
          ) : (
            <Button
              sx={{ textTransform: "none", background: "white", mb: 10 }}
              onClick={handleClick}
            >
              <Typography
                color={"black"}
                fontFamily={"Comme, sans-serif"}
                fontSize={"1.5vw"}
                fontWeight={800}
              >
                Next
              </Typography>
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

export default CreateWorkoutPlan;
