import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setWorkoutPlanUpdateRequestsLength } from "../../context/CheckForNewPlanRequests";
import ConfirmationModal from "../confirmation-model/ConfirmationModal";
import { NavLink, useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import {
  WorkoutNameValidation,
  UpdateExcerciseNameValidation,
  UpdateExcerciseSetsValidation,
  UpdateExcerciseRepsValidation,
  UpdateExcerciseDemoLinkValidation,
} from "../../Validations/WorkOutPlanValidations";
import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";

const UpdateWorkoutPlan = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [Flag, setFlag] = useState(false);
  const FetchedPlan = useSelector(
    (state) => state.UpdatePlan.WorkoutPlanToUpdate
  );
  const [singleDayPlan, setSingleDayPlan] = useState(
    FetchedPlan.Plan.WorkoutPlan
  );
  const CurrentWorkoutPlanUpdateRequestsLength = useSelector(
    (state) => state.CheckForNewPlanRequests.WorkoutPlanUpdateRequestsLength
  );
  const [PlanLength, setPlanLength] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    toast.error(
      WorkoutNameValidation(singleDayPlan[counter1][counter].BodyPart)
    );
    toast.error(
      UpdateExcerciseNameValidation(singleDayPlan[counter1][counter].Excercise)
    );
    toast.error(
      UpdateExcerciseSetsValidation(singleDayPlan[counter1][counter].Excercise)
    );
    toast.error(
      UpdateExcerciseRepsValidation(singleDayPlan[counter1][counter].Excercise)
    );
    toast.error(
      UpdateExcerciseDemoLinkValidation(
        singleDayPlan[counter1][counter].Excercise
      )
    );

    if (
      !WorkoutNameValidation(singleDayPlan[counter1][counter].BodyPart) &&
      !UpdateExcerciseNameValidation(
        singleDayPlan[counter1][counter].Excercise
      ) &&
      !UpdateExcerciseRepsValidation(
        singleDayPlan[counter1][counter].Excercise
      ) &&
      !UpdateExcerciseSetsValidation(
        singleDayPlan[counter1][counter].Excercise
      ) &&
      !UpdateExcerciseDemoLinkValidation(
        singleDayPlan[counter1][counter].Excercise
      )
    ) {
      setPlanLength(singleDayPlan.length);
      if (counter2 !== 6) setCounter(counter + 1);
      if (counter2 === 6) {
        setFlag(true);
        setCounter2(0);
      } else setCounter2(counter2 + 1);
    }
  };

  const handleNext = () => {
    if (Flag) {
      if (counter >= 6) {
        setFlag(false);
        setCounter(0);
        setCounter1(counter1 + 1);
      }
    }
  };
  function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  const handleBodyPart = (e) => {
    const updatedSingleDayPlan = deepCopy(singleDayPlan);
    updatedSingleDayPlan[counter1][counter].BodyPart = e.target.value;
    setSingleDayPlan(updatedSingleDayPlan);
  };

  const handleSubmit = () => {
    toast.error(
      WorkoutNameValidation(singleDayPlan[counter1][counter].BodyPart)
    );
    toast.error(
      UpdateExcerciseNameValidation(singleDayPlan[counter1][counter].Excercise)
    );
    toast.error(
      UpdateExcerciseSetsValidation(singleDayPlan[counter1][counter].Excercise)
    );
    toast.error(
      UpdateExcerciseRepsValidation(singleDayPlan[counter1][counter].Excercise)
    );
    toast.error(
      UpdateExcerciseDemoLinkValidation(
        singleDayPlan[counter1][counter].Excercise
      )
    );

    if (
      !WorkoutNameValidation(singleDayPlan[counter1][counter].BodyPart) &&
      !UpdateExcerciseNameValidation(
        singleDayPlan[counter1][counter].Excercise
      ) &&
      !UpdateExcerciseRepsValidation(
        singleDayPlan[counter1][counter].Excercise
      ) &&
      !UpdateExcerciseSetsValidation(
        singleDayPlan[counter1][counter].Excercise
      ) &&
      !UpdateExcerciseDemoLinkValidation(
        singleDayPlan[counter1][counter].Excercise
      )
    )
      setModalOpen(true);
  };
  const SubmitUpdatedPlan = () => {
    let id = FetchedPlan.Plan._id;
    axios
      .post("workout/update-workout-plan/" + id, {
        singleDayPlan,
      })
      .then((res) => {
        toast.success("PLAN UPDATED SUCCESSFULLY");
        axios
          .delete("workout/workout-update-request/" + FetchedPlan._id)
          .then(
            () =>
              dispatch(
                setWorkoutPlanUpdateRequestsLength(
                  CurrentWorkoutPlanUpdateRequestsLength - 1
                )
              ),
            navigate("/trainer")
          );
      })
      .catch("THERE WAS ERROR UPDATING");
  };
  useEffect(handleNext, [counter, Flag]);
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
        <NavLink to={"/workout-plan-update-req"}>
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
        Update Workout Plan Request Form
      </Typography>
      {modalOpen && (
        <ConfirmationModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          submitPlan={SubmitUpdatedPlan}
        />
      )}
      <Typography
        color={"white"}
        fontFamily={"Comme, sans-serif"}
        fontSize={"1.7vw"}
        fontWeight={800}
        textAlign={"center"}
        my={2}
      >
        Week {singleDayPlan[counter1][counter].Week}
      </Typography>
      <Typography
        color={"white"}
        fontFamily={"Comme, sans-serif"}
        fontSize={"1.7vw"}
        fontWeight={800}
        textAlign={"center"}
        my={2}
      >
        Day {singleDayPlan[counter1][counter].Day}
      </Typography>
      <FormControl
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <TextField
          placeholder="Workout Name"
          value={singleDayPlan[counter1][counter].BodyPart}
          onChange={handleBodyPart}
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
        {singleDayPlan[counter1][counter].Excercise.map((i, index) => (
          <>
            <Typography
              color={"white"}
              fontFamily={"Comme, sans-serif"}
              fontSize={"1.7vw"}
              fontWeight={800}
              textAlign={"center"}
              my={2}
            >
              Excercise: {index + 1}
            </Typography>

            <TextField
              placeholder="Excercise Name"
              value={i.Name}
              onChange={(e) => {
                singleDayPlan[counter1][counter].Excercise[index].Name =
                  e.target.value;
                setSingleDayPlan([...singleDayPlan]);
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

            <TextField
              placeholder="Sets"
              type="number"
              value={i.Sets}
              onChange={(e) => {
                singleDayPlan[counter1][counter].Excercise[index].Sets =
                  e.target.value;
                setSingleDayPlan([...singleDayPlan]);
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

            <TextField
              placeholder="Repetitions"
              type="number"
              value={i.Reps}
              onChange={(e) => {
                singleDayPlan[counter1][counter].Excercise[index].Reps =
                  e.target.value;
                setSingleDayPlan([...singleDayPlan]);
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

            <TextField
              placeholder="Video Link For Demo"
              type="url"
              value={i.DemoLink}
              onChange={(e) => {
                singleDayPlan[counter1][counter].Excercise[index].DemoLink =
                  e.target.value;
                setSingleDayPlan([...singleDayPlan]);
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
          </>
        ))}
        {counter1 >= PlanLength - 1 && counter === 6 ? (
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
              Submit
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
    </Container>
  );
};

export default UpdateWorkoutPlan;
