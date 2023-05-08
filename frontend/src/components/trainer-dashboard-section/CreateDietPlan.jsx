import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../confirmation-model/ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
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
  Button,
  Card,
  Container,
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
  TextareaAutosize,
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
    dispatch(SubmitDietPlan());
    axios
      .delete("http://localhost:8000/dietplans/" + Request._id)
      .then((res) => console.log(res));
    navigate("/allDietPlanRequest");
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

  const styles = {
    textfield: {
      "& .MuiInput-underline::before": {
        borderBottom: " 1px solid white",
      },
      "& .MuiInput-underline::after": {
        borderBottom: " 2px solid white",
      },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottomColor: "white",
      },

      "& .MuiInput-input": { color: "white" },
      "& .MuiInputLabel-root": {
        color: "white",
      },

      "& .MuiTypography-root": {
        color: "white",
      },
    },
  };

  return (
    <Container>
      <ToastContainer position="top-center" />
      {modalOpen && (
        <ConfirmationModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          submitPlan={submitPlan}
        />
      )}
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "black",
        }}
      >
        {!flag1 && (
          <>
            <TextField
              type="number"
              sx={styles.textfield}
              inputProps={{ min: 0 }}
              variant="standard"
              className="durationInput"
              name="Duration"
              label="Select Plan Duration"
              onChange={(e) => {
                setDuration(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Weeks</InputAdornment>
                ),
              }}
            />
            <Button variant="contained" size="small" onClick={fixDuration}>
              Set Duration
            </Button>
          </>
        )}

        {flag1 && (
          <FormControl sx={{ gap: "2rem", width: "70%" }}>
            <Typography sx={{ color: "white" }} variant="h4">
              Week {currentWeek}
            </Typography>
            <Typography variant="h5" sx={{ color: "white" }}>
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
            <FormLabel sx={{ color: "white" }}>BreakFast</FormLabel>
            <TextareaAutosize
              minRows={4}
              onChange={(e) => setBreakFast(e.target.value)}
            />

            <FormLabel sx={{ color: "white" }}>Lunch</FormLabel>
            <TextareaAutosize
              minRows={4}
              onChange={(e) => setLunch(e.target.value)}
            />

            <FormLabel sx={{ color: "white" }}>Dinner</FormLabel>
            <TextareaAutosize
              minRows={4}
              onChange={(e) => setDinner(e.target.value)}
            />

            {flag ? (
              <Button variant="contained" onClick={handleSubmit}>
                Submit Plan
              </Button>
            ) : (
              <Button variant="contained" onClick={handleClick}>
                Next
              </Button>
            )}
          </FormControl>
        )}
      </Card>
    </Container>
  );
};

export default CreateDietPlan;
