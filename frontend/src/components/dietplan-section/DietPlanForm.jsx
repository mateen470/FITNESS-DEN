import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../confirmation-model/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { AddPhysicalInfo } from "../../context/PhysicalInfo";
import { useNavigate } from "react-router-dom";
import {
  AgeValidation,
  WeightValidation,
  AllergiesValidation,
  AllergiesDesValidation,
} from "../../Validations/DietPhysicalInfoValidation";
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";

const DietPlanForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Age, setAge] = useState();
  const [Weight, setWeight] = useState();
  const [MedicalHistory, setMedicalHistory] = useState(false);
  const [MedicalHistoryDes, setMedicalHistoryDes] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const IDofCurrentUser = useSelector(
    (state) => state.CurrentUser.CurrentUserID
  );

  const submitRequest = () => {
    dispatch(
      AddPhysicalInfo({
        IDofCurrentUser,
        Age,
        Weight,
        MedicalHistory,
        MedicalHistoryDes,
      })
    );
    navigate("/payment");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.error(AgeValidation(Age));
    toast.error(WeightValidation(Weight));
    toast.error(AllergiesValidation(MedicalHistory));
    toast.error(AllergiesDesValidation(MedicalHistory, MedicalHistoryDes));
    if (
      !AgeValidation(Age) &&
      !WeightValidation(Weight) &&
      !AllergiesValidation(MedicalHistory) &&
      !AllergiesDesValidation(MedicalHistory, MedicalHistoryDes)
    )
      setModalOpen(true);
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
      "& .MuiInputLabel-root.Mui-focused": { color: "white" },

      "& .MuiTypography-root": {
        color: "white",
      },
    },
    Radio: {
      "& .MuiSvgIcon-root": {
        color: "white",
      },
      "& .MuiTypography-root": {
        color: "white",
      },
    },
    radioLabel: {
      "&.MuiFormLabel-root.Mui-focused": {
        color: "white",
      },
      "&.MuiFormLabel-root ": {
        color: "white",
      },
    },
  };
  return (
    <Container
      sx={{
        my: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {modalOpen && (
        <ConfirmationModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          submitPlan={submitRequest}
        />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" color={"white"} fontWeight={800}>
          Enter Physical Information
        </Typography>
        <FormControl sx={{ gap: "2rem" }}>
          <TextField
            sx={styles.textfield}
            className="ageInput"
            name="Age"
            type="number"
            inputProps={{ min: 0 }}
            variant="standard"
            label="Enter Age"
            onChange={(e) => setAge(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">Years</InputAdornment>
              ),
            }}
          />
          <TextField
            sx={styles.textfield}
            className="weightInput"
            name="Weight"
            type="number"
            inputProps={{ min: 0 }}
            variant="standard"
            label="Enter Weight"
            onChange={(e) => setWeight(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
            }}
          />
          <Box>
            <FormLabel sx={styles.radioLabel}>
              Any Allergies or Medical History
            </FormLabel>
            <RadioGroup
              defaultValue={MedicalHistory}
              value={MedicalHistory}
              onChange={() => setMedicalHistory(!MedicalHistory)}
            >
              <FormControlLabel
                sx={styles.Radio}
                value={true}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                sx={styles.Radio}
                value={false}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </Box>
          {MedicalHistory && (
            <TextareaAutosize
              minRows={4}
              name="AlleryorMedicalHistoryDescription"
              placeholder="Details of Allergies or Medical History"
              onChange={(e) => setMedicalHistoryDes(e.target.value)}
            />
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 4,
              mt: -2,
            }}
          >
            <Box
              sx={{
                border: "2px solid white",
                p: 1,
                px: 2,
                mt: 3,
                height: "3.6vw",
                width: "8vw",
                cursor: "pointer",
              }}
              onClick={handleSubmit}
            >
              <Typography
                color={"black"}
                fontFamily={"Comme, sans-serif"}
                sx={{
                  background: "white",
                  fontSize: "1.4vw",
                  height: "3.4vw",
                  width: "8.6vw",
                  ml: -4.5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "scale 0.3s ease-in-out",
                  fontWeight: "bold",
                  "&:hover": {
                    scale: "0.95 !important",
                  },
                }}
              >
                Submit
              </Typography>
            </Box>
          </Box>
        </FormControl>
      </Box>
    </Container>
  );
};
export default DietPlanForm;
