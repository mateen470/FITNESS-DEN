import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../confirmation-model/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { AddPhysicalInfo } from "../../context/PhysicalInfo";
import {
  AgeValidation,
  HeightValidation,
  WeightValidation,
  InjuriesValidation,
  SurgeriesValidation,
  AvailableEquipmentsValidation,
  InjuriesDesValidation,
  SurgeriesDesValidation,
  AvailableEquipmentsDesValidation,
} from "../../Validations/WorkoutPhysicalInfoValidation";
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

const WorkoutPlanForm = () => {
  const dispatch = useDispatch();
  const [Age, setAge] = useState();
  const [Weight, setWeight] = useState();
  const [Height, setHeight] = useState();
  const [Injury, setInjury] = useState(false);
  const [InjuryDes, setInjuryDes] = useState("");
  const [Surgery, setSurgery] = useState(false);
  const [SurgeryDes, setSurgeryDes] = useState("");
  const [Equipments, setEquipments] = useState(false);
  const [EquipmentDes, setEquipmentsDes] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const IDofCurrentUser = useSelector(
    (state) => state.CurrentUser.CurrentUserID
  );
  const navigate = useNavigate();

  const submitRequest = () => {
    dispatch(
      AddPhysicalInfo({
        IDofCurrentUser,
        Age,
        Weight,
        Height,
        Injury,
        InjuryDes,
        Surgery,
        SurgeryDes,
        Equipments,
        EquipmentDes,
      })
    );
    navigate("/payment");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.error(AgeValidation(Age));
    toast.error(HeightValidation(Height));
    toast.error(WeightValidation(Weight));
    toast.error(InjuriesValidation(Injury));
    toast.error(SurgeriesValidation(Surgery));
    toast.error(AvailableEquipmentsValidation(Equipments));
    toast.error(InjuriesDesValidation(Injury, InjuryDes));
    toast.error(SurgeriesDesValidation(Surgery, SurgeryDes));
    toast.error(AvailableEquipmentsDesValidation(Equipments, EquipmentDes));

    if (
      !AgeValidation(Age) &&
      !HeightValidation(Height) &&
      !WeightValidation(Weight) &&
      !InjuriesValidation(Injury) &&
      !SurgeriesValidation(Surgery) &&
      !AvailableEquipmentsValidation(Equipments) &&
      !InjuriesDesValidation(Injury, InjuryDes) &&
      !SurgeriesDesValidation(Surgery, SurgeryDes) &&
      !AvailableEquipmentsDesValidation(Equipments, EquipmentDes)
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
            inputProps={{ min: 0 }}
            variant="standard"
            className="ageInput"
            name="Age"
            type="number"
            label="Enter Age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
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
          <TextField
            sx={styles.textfield}
            className="heightInput"
            name="Height"
            inputProps={{ min: 0 }}
            variant="standard"
            type="number"
            label="Enter Height"
            onChange={(e) => setHeight(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
          <Box>
            <FormLabel sx={styles.radioLabel}>Any Injuries</FormLabel>
            <RadioGroup
              defaultValue={Injury}
              value={Injury}
              onChange={() => setInjury(!Injury)}
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
          {Injury && (
            <TextareaAutosize
              minRows={4}
              name="InjuriesDes"
              placeholder="Details of Injury"
              onChange={(e) => setInjuryDes(e.target.value)}
            />
          )}
          <Box>
            <FormLabel sx={styles.radioLabel}>Any Surgeries</FormLabel>
            <RadioGroup
              defaultValue={Surgery}
              value={Surgery}
              onChange={() => setSurgery(!Surgery)}
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
          {Surgery && (
            <TextareaAutosize
              minRows={4}
              name="SurgeryDes"
              placeholder="Details of Surgery"
              onChange={(e) => setSurgeryDes(e.target.value)}
            />
          )}
          <Box>
            <FormLabel sx={styles.radioLabel}>
              Any Gym Equipments Available
            </FormLabel>
            <RadioGroup
              defaultValue={Equipments}
              value={Equipments}
              onChange={() => setEquipments(!Equipments)}
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
          {Equipments && (
            <TextareaAutosize
              minRows={4}
              name="EquipmentsDes"
              placeholder="Details of Equipments Available"
              onChange={(e) => setEquipmentsDes(e.target.value)}
            />
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 4,
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

export default WorkoutPlanForm;
