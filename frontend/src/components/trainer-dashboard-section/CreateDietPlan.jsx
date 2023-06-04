import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDietPlanRequestsLength } from "../../context/CheckForNewPlanRequests";
import ConfirmationModal from "../confirmation-model/ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import axios from "axios";
import {
  AddDietPlan,
  AddWeeklyDietPlan,
  EmptyWeeklyDietPlan,
  SubmitDietPlan,
} from "../../context/DietPlan";
import {
  BreakFastValidation,
  LunchValidation,
  DinnerValidation,
} from "../../Validations/DietPlanValidations";
import { DurationValidation } from "../../Validations/DurationValidation";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

const CreateDietPlan = () => {
  const dispatch = useDispatch();

  const weeklyDietPlan = useSelector((state) => state.DietPlan.WeeklyDietPlan);
  const Request = useSelector((state) => state.DietPlanDetails.DietPlanDetails);
  const [duration, setDuration] = useState();
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [BreakFast, setBreakFast] = useState("");
  const [Lunch, setLunch] = useState("");
  const [Dinner, setDinner] = useState("");
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const CurrentDietPlanRequestsLength = useSelector(
    (state) => state.CheckForNewPlanRequests.DietPlanRequestsLength
  );
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    toast.error(BreakFastValidation(BreakFast));
    toast.error(LunchValidation(Lunch));
    toast.error(DinnerValidation(Dinner));
    if (
      !BreakFastValidation(BreakFast) &&
      !LunchValidation(Lunch) &&
      !DinnerValidation(Dinner)
    ) {
      dispatch(AddWeeklyDietPlan({ BreakFast, Lunch, Dinner }));
      if (currentDay > 5) {
        if (currentWeek >= duration) {
          setFlag(true);
        }
      }
      setCurrentDay(currentDay + 1);
      if (currentDay === 7) {
        dispatch(AddDietPlan(weeklyDietPlan));
        dispatch(EmptyWeeklyDietPlan());
        setCurrentWeek(currentWeek + 1);
        setCurrentDay(1);
      }
    }
  }

  const submitPlan = () => {
    dispatch(AddWeeklyDietPlan({ BreakFast, Lunch, Dinner }));
    dispatch(AddDietPlan(weeklyDietPlan));
    dispatch(
      SubmitDietPlan({
        IDofCurrentUser: Request.IDofCurrentUser,
        PlanName: Request.Title,
      })
    );
    axios
      .delete("diet/diet-request/" + Request._id)
      .then(() =>
        dispatch(setDietPlanRequestsLength(CurrentDietPlanRequestsLength - 1))
      );
    navigate("/trainer");
  };

  const handleSubmit = () => {
    toast.error(BreakFastValidation(BreakFast));
    toast.error(LunchValidation(Lunch));
    toast.error(DinnerValidation(Dinner));
    if (
      !BreakFastValidation(BreakFast) &&
      !LunchValidation(Lunch) &&
      !DinnerValidation(Dinner)
    )
      setModalOpen(!modalOpen);
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
        <NavLink to={"/view-diet-plan-details"}>
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
        Diet Plan Creation Form
      </Typography>
      <ToastContainer position="top-center" />
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
            type="number"
            inputProps={{ min: 0 }}
            className="durationInput"
            name="Duration"
            placeholder="Select Plan Duration"
            onChange={(e) => {
              setDuration(e.target.value);
            }}
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
        <FormControl
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
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
            placeholder="BreakFast"
            onChange={(e) => setBreakFast(e.target.value)}
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
            placeholder="Lunch"
            onChange={(e) => setLunch(e.target.value)}
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
            placeholder="Dinner"
            onChange={(e) => setDinner(e.target.value)}
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
          {flag ? (
            <Button
              sx={{ textTransform: "none", background: "white", mb: 10, mt: 5 }}
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
              sx={{ textTransform: "none", background: "white", mb: 10, mt: 5 }}
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
        </FormControl>
      )}
    </Container>
  );
};

export default CreateDietPlan;
