import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../confirmation-model/ConfirmationModal";
import {
  BreakFastValidation,
  LunchValidation,
  DinnerValidation,
} from "../../Validations/DietPlanValidations";
import {
  Button,
  Container,
  FormControl,
  TextareaAutosize,
  Typography,
} from "@mui/material";

const UpdateDietPlan = () => {
  const PlanToUpdateID = useSelector((state) => state.UpdatePlan.DietPlanId);
  const [PlanToUpdate, setPlanToUpdate] = useState([]);
  const [Counter, setCounter] = useState(0);
  const [Counter1, setCounter1] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const Ids = JSON.parse(PlanToUpdateID);
  const PlanID = Ids.PlanId;
  const ReqId = Ids.ReqId;
  const FetchPlanToUpdate = () => {
    axios
      .get("diet/diet-update-request/" + PlanID)
      .then((res) => setPlanToUpdate(res.data.data));
  };

  useEffect(FetchPlanToUpdate, []);

  const handleNext = (e) => {
    e.preventDefault();
    toast.error(
      BreakFastValidation(PlanToUpdate.DietPlan[Counter1][Counter].BreakFast)
    );
    toast.error(
      LunchValidation(PlanToUpdate.DietPlan[Counter1][Counter].Lunch)
    );
    toast.error(
      DinnerValidation(PlanToUpdate.DietPlan[Counter1][Counter].Dinner)
    );
    if (
      !BreakFastValidation(
        PlanToUpdate.DietPlan[Counter1][Counter].BreakFast
      ) &&
      !LunchValidation(PlanToUpdate.DietPlan[Counter1][Counter].Lunch) &&
      !DinnerValidation(PlanToUpdate.DietPlan[Counter1][Counter].Dinner)
    ) {
      if (Counter === 6) {
        setCounter(0);
        setCounter1(Counter1 + 1);
      } else setCounter(Counter + 1);
    }
  };

  const SubmitUpdatedPlan = () => {
    axios.post("diet/update-diet-plan/" + PlanID, PlanToUpdate).then((res) => {
      console.log(res.data.data);
      toast.success("PLAN UPDATED SUCCESSFULLY");
      axios
        .delete("diet/diet-update-request/" + ReqId)
        .then((res) => console.log(res.data.data));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.error(
      BreakFastValidation(PlanToUpdate.DietPlan[Counter1][Counter].BreakFast)
    );
    toast.error(
      LunchValidation(PlanToUpdate.DietPlan[Counter1][Counter].Lunch)
    );
    toast.error(
      DinnerValidation(PlanToUpdate.DietPlan[Counter1][Counter].Dinner)
    );
    if (
      !BreakFastValidation(
        PlanToUpdate.DietPlan[Counter1][Counter].BreakFast
      ) &&
      !LunchValidation(PlanToUpdate.DietPlan[Counter1][Counter].Lunch) &&
      !DinnerValidation(PlanToUpdate.DietPlan[Counter1][Counter].Dinner)
    )
      setModalOpen(true);
  };

  const handleDay = () => {
    switch (Counter) {
      case 0:
        return <Typography>Monday</Typography>;
      case 1:
        return <Typography>Tuesday</Typography>;
      case 2:
        return <Typography>Wednesday</Typography>;
      case 3:
        return <Typography>Thursday</Typography>;
      case 4:
        return <Typography>Friday</Typography>;
      case 5:
        return <Typography>Saturday</Typography>;
      case 6:
        return <Typography>Sunday</Typography>;
      default:
        return <Typography> </Typography>;
    }
  };

  return (
    PlanToUpdate.length !== 0 && (
      <Container>
        {modalOpen && (
          <ConfirmationModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            submitPlan={SubmitUpdatedPlan}
          />
        )}
        <Typography>Week {Counter1 + 1}</Typography>
        {handleDay()}
        <FormControl>
          <Typography>BreakFast</Typography>
          <TextareaAutosize
            minRows={4}
            name="BreakFast"
            value={PlanToUpdate.DietPlan[Counter1][Counter].BreakFast}
            onChange={(e) => {
              PlanToUpdate.DietPlan[Counter1][Counter].BreakFast =
                e.target.value;
              setPlanToUpdate({ ...PlanToUpdate });
            }}
          />
          <Typography>Lunch</Typography>
          <TextareaAutosize
            minRows={4}
            name="Lunch"
            value={PlanToUpdate.DietPlan[Counter1][Counter].Lunch}
            onChange={(e) => {
              PlanToUpdate.DietPlan[Counter1][Counter].Lunch = e.target.value;
              setPlanToUpdate({ ...PlanToUpdate });
            }}
          />
          <Typography>Dinner</Typography>
          <TextareaAutosize
            minRows={4}
            name="Dinner"
            value={PlanToUpdate.DietPlan[Counter1][Counter].Dinner}
            onChange={(e) => {
              PlanToUpdate.DietPlan[Counter1][Counter].Dinner = e.target.value;
              setPlanToUpdate({ ...PlanToUpdate });
            }}
          />

          {Counter === 6 && Counter1 === PlanToUpdate.DietPlan.length - 1 ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </FormControl>
      </Container>
    )
  );
};
export default UpdateDietPlan;
