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
  Button,
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
  const [modalOpen, setModalOpen] = React.useState(false);

  const submitRequest = () => {
    dispatch(
      AddPhysicalInfo({ Age, Weight, MedicalHistory, MedicalHistoryDes })
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
  return (
    <Container>
      {modalOpen && (
        <ConfirmationModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          submitPlan={submitRequest}
        />
      )}
      <Typography>Enter Physical Information</Typography>
      <Box>
        <FormControl>
          <TextField
            className="ageInput"
            name="Age"
            type="number"
            label="Enter Age"
            onChange={(e) => setAge(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">Years</InputAdornment>
              ),
            }}
          />
          <TextField
            className="weightInput"
            name="Weight"
            type="number"
            label="Enter Weight"
            onChange={(e) => setWeight(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
            }}
          />
          <Box>
            <FormLabel>Any Allergies or Medical History</FormLabel>
            <RadioGroup
              defaultValue={MedicalHistory}
              value={MedicalHistory}
              onChange={() => setMedicalHistory(!MedicalHistory)}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
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
          <Button onClick={handleSubmit}>Submit</Button>
        </FormControl>
      </Box>
    </Container>
  );
};
export default DietPlanForm;
