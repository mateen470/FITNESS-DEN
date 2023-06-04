import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setDietPlanUpdateRequestsLength } from "../../context/CheckForNewPlanRequests";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../confirmation-model/ConfirmationModal";
import { NavLink, useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import {
  BreakFastValidation,
  LunchValidation,
  DinnerValidation,
} from "../../Validations/DietPlanValidations";
import {
  Button,
  Box,
  Container,
  FormControl,
  Typography,
  TextField,
} from "@mui/material";

const UpdateDietPlan = () => {
  const navigate = useNavigate();
  const PlanToUpdateID = useSelector((state) => state.UpdatePlan.DietPlanId);
  const CurrentDietPlanUpdateRequestsLength = useSelector(
    (state) => state.CheckForNewPlanRequests.DietPlanUpdateRequestsLength
  );
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

  const dispatch = useDispatch();
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
      toast.success("PLAN UPDATED SUCCESSFULLY");
      axios
        .delete("diet/diet-update-request/" + ReqId)
        .then(
          () =>
            dispatch(
              setDietPlanUpdateRequestsLength(
                CurrentDietPlanUpdateRequestsLength - 1
              )
            ),
          navigate("/trainer")
        );
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
        return (
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            fontSize={"1.5rem"}
            mt={1}
            mb={3}
            fontWeight={800}
          >
            Monday
          </Typography>
        );
      case 1:
        return (
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            fontSize={"1.5rem"}
            mt={1}
            mb={3}
            fontWeight={800}
          >
            Tuesday
          </Typography>
        );
      case 2:
        return (
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            fontSize={"1.5rem"}
            mt={1}
            mb={3}
            fontWeight={800}
          >
            Wednesday
          </Typography>
        );
      case 3:
        return (
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            fontSize={"1.5rem"}
            mt={1}
            mb={3}
            fontWeight={800}
          >
            Thursday
          </Typography>
        );
      case 4:
        return (
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            fontSize={"1.5rem"}
            mt={1}
            mb={3}
            fontWeight={800}
          >
            Friday
          </Typography>
        );
      case 5:
        return (
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            fontSize={"1.5rem"}
            mt={1}
            mb={3}
            fontWeight={800}
          >
            Saturday
          </Typography>
        );
      case 6:
        return (
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            fontSize={"1.5rem"}
            mt={1}
            mb={3}
            fontWeight={800}
          >
            Sunday
          </Typography>
        );
      default:
        return <Typography> </Typography>;
    }
  };

  return (
    PlanToUpdate.length !== 0 && (
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
          <NavLink to={"/diet-plan-update-req"}>
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
          Update Diet Plan Request Form
        </Typography>
        {modalOpen && (
          <ConfirmationModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            submitPlan={SubmitUpdatedPlan}
          />
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            fontSize={"1.7vw"}
            fontWeight={800}
          >
            Week {Counter1 + 1}
          </Typography>
        </Box>

        {handleDay()}
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
            fontSize={"1.5vw"}
            fontWeight={800}
          >
            BreakFast
          </Typography>
          <TextField
            name="BreakFast"
            value={PlanToUpdate.DietPlan[Counter1][Counter].BreakFast}
            onChange={(e) => {
              PlanToUpdate.DietPlan[Counter1][Counter].BreakFast =
                e.target.value;
              setPlanToUpdate({ ...PlanToUpdate });
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
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            fontSize={"1.5vw"}
            fontWeight={800}
          >
            Lunch
          </Typography>
          <TextField
            name="Lunch"
            value={PlanToUpdate.DietPlan[Counter1][Counter].Lunch}
            onChange={(e) => {
              PlanToUpdate.DietPlan[Counter1][Counter].Lunch = e.target.value;
              setPlanToUpdate({ ...PlanToUpdate });
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
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            fontSize={"1.5vw"}
            fontWeight={800}
          >
            Dinner
          </Typography>
          <TextField
            name="Dinner"
            value={PlanToUpdate.DietPlan[Counter1][Counter].Dinner}
            onChange={(e) => {
              PlanToUpdate.DietPlan[Counter1][Counter].Dinner = e.target.value;
              setPlanToUpdate({ ...PlanToUpdate });
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

          {Counter === 6 && Counter1 === PlanToUpdate.DietPlan.length - 1 ? (
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
              onClick={handleNext}
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
    )
  );
};
export default UpdateDietPlan;
