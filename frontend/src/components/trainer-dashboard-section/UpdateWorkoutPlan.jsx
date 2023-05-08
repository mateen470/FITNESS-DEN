import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import ConfirmationModal from "../confirmation-model/ConfirmationModal";
import {
  WorkoutNameValidation,
  UpdateExcerciseNameValidation,
  UpdateExcerciseSetsValidation,
  UpdateExcerciseRepsValidation,
  UpdateExcerciseDemoLinkValidation,
} from "../../Validations/WorkOutPlanValidations";
import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";

const UpdateWorkoutPlan = () => {
  const [counter, setCounter] = useState(0);
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [Flag, setFlag] = useState(false);
  const FetchedPlan = useSelector(
    (state) => state.UpdatePlan.WorkoutPlanToUpdate
  );
  const [singleDayPlan, setSingleDayPlan] = useState(FetchedPlan.Plan.Plan);
  const [PlanLength, setPlanLength] = useState();
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleBodyPart = (e) => {
    singleDayPlan[counter1][counter].BodyPart = e.target.value;
    setSingleDayPlan([...singleDayPlan]);
  };

  const handleSubmit = () => {
    console.log(modalOpen);
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
        console.log(res.data.data);
        toast.success("PLAN UPDATED SUCCESSFULLY");
        axios
          .delete("workout/workout-update-request/" + FetchedPlan._id)
          .then((res) => console.log(res.data));
      })
      .catch("THERE WAS ERROR UPDATING");
  };
  useEffect(handleNext, [counter, Flag]);
  return (
    <Container>
      {modalOpen && (
        <ConfirmationModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          submitPlan={SubmitUpdatedPlan}
        />
      )}
      <Typography>Week {singleDayPlan[counter1][counter].Week}</Typography>
      <Typography>Day {singleDayPlan[counter1][counter].Day}</Typography>
      <FormControl>
        <TextField
          label="Workout Name"
          value={singleDayPlan[counter1][counter].BodyPart}
          onChange={handleBodyPart}
        />
        {singleDayPlan[counter1][counter].Excercise.map((i, index) => (
          <>
            <Typography>Excercise: {index + 1}</Typography>

            <TextField
              label="Excercise Name"
              value={i.Name}
              onChange={(e) => {
                singleDayPlan[counter1][counter].Excercise[index].Name =
                  e.target.value;
                setSingleDayPlan([...singleDayPlan]);
              }}
            />

            <TextField
              label="Sets"
              type="number"
              value={i.Sets}
              onChange={(e) => {
                singleDayPlan[counter1][counter].Excercise[index].Sets =
                  e.target.value;
                setSingleDayPlan([...singleDayPlan]);
              }}
            />

            <TextField
              label="Repetitions"
              type="number"
              value={i.Reps}
              onChange={(e) => {
                singleDayPlan[counter1][counter].Excercise[index].Reps =
                  e.target.value;
                setSingleDayPlan([...singleDayPlan]);
              }}
            />

            <TextField
              label="Video Link For Demo"
              type="url"
              value={i.DemoLink}
              onChange={(e) => {
                singleDayPlan[counter1][counter].Excercise[index].DemoLink =
                  e.target.value;
                setSingleDayPlan([...singleDayPlan]);
              }}
            />
          </>
        ))}
        {counter1 >= PlanLength - 1 && counter === 6 ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button onClick={handleClick}>Next</Button>
        )}
      </FormControl>
    </Container>
  );
};

export default UpdateWorkoutPlan;
