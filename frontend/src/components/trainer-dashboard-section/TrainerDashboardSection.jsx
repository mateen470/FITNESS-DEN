import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setDietPlanRequestsLength,
  setDietPlanUpdateRequestsLength,
  setIsNewDietPlanRequests,
  setIsNewDietPlanUpdateRequests,
  setIsNewWorkoutPlanRequests,
  setIsNewWorkoutPlanUpdateRequests,
  setWorkoutPlanRequestsLength,
  setWorkoutPlanUpdateRequestsLength,
} from "../../context/CheckForNewPlanRequests";
import { setLogout } from "../../context/CheckForUserType";

const TrainerDashboardSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [AllWorkoutPlanRequestsFromDB, setAllWorkoutPlanRequestsFromDB] =
    useState([]);
  const [AllDietPlanRequestsFromDB, setAllDietPlanRequestsFromDB] = useState(
    []
  );
  const [AllDietPlanUpdateRequestsFromDB, setAllDietPlanUpdateRequestsFromDB] =
    useState([]);
  const [
    AllWorkoutPlanUpdateRequestsFromDB,
    setAllWorkoutPlanUpdateRequestsFromDB,
  ] = useState([]);
  const [temp, setTemp] = useState(0);

  const FetchAllPlanRequests = () => {
    axios
      .get("workout/all-new-workout-requests")
      .then((res) => setAllWorkoutPlanRequestsFromDB(res.data.data));
    axios
      .get("diet/all-new-diet-requests")
      .then((res) => setAllDietPlanRequestsFromDB(res.data.data));
    axios
      .get("workout/all-workout-update-request")
      .then((res) => setAllWorkoutPlanUpdateRequestsFromDB(res.data.data));
    axios
      .get("diet/all-diet-update-request")
      .then((res) => setAllDietPlanUpdateRequestsFromDB(res.data.data));
  };
  const NumberofWorkoutPlanRequest = useSelector(
    (state) => state.CheckForNewPlanRequests.WorkoutPlanRequestsLength
  );
  const isNewWorkoutPlanRequests = useSelector(
    (state) => state.CheckForNewPlanRequests.isNewWorkoutPlanRequests
  );
  const NumberofDietPlanRequest = useSelector(
    (state) => state.CheckForNewPlanRequests.DietPlanRequestsLength
  );
  const isNewDietPlanRequests = useSelector(
    (state) => state.CheckForNewPlanRequests.isNewDietPlanRequests
  );
  const NumberofWorkoutPlanUpdateRequest = useSelector(
    (state) => state.CheckForNewPlanRequests.WorkoutPlanUpdateRequestsLength
  );
  const isNewWorkoutPlanUpdateRequests = useSelector(
    (state) => state.CheckForNewPlanRequests.isNewWorkoutPlanUpdateRequests
  );
  const NumberofDietPlanUpdateRequest = useSelector(
    (state) => state.CheckForNewPlanRequests.DietPlanUpdateRequestsLength
  );
  const isNewDietPlanUpdateRequests = useSelector(
    (state) => state.CheckForNewPlanRequests.isNewDietPlanUpdateRequests
  );

  const LogOut = async () => {
    try {
      const logOutResponse = await axios.post("logout");
      if (logOutResponse.data && logOutResponse.data.success) {
        toast.success(logOutResponse.data.message);
        dispatch(setLogout(true));
        navigate("/logout");
      }
      if (
        logOutResponse.response &&
        logOutResponse.response.data &&
        logOutResponse.response.data.message
      ) {
        toast.error(logOutResponse.response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    FetchAllPlanRequests();
    if (AllWorkoutPlanRequestsFromDB.length > NumberofWorkoutPlanRequest) {
      dispatch(setIsNewWorkoutPlanRequests(true));
      dispatch(
        setWorkoutPlanRequestsLength(AllWorkoutPlanRequestsFromDB.length)
      );
    }
    if (AllDietPlanRequestsFromDB.length > NumberofDietPlanRequest) {
      dispatch(setIsNewDietPlanRequests(true));
      dispatch(setDietPlanRequestsLength(AllDietPlanRequestsFromDB.length));
    }
    if (
      AllWorkoutPlanUpdateRequestsFromDB.length >
      NumberofWorkoutPlanUpdateRequest
    ) {
      dispatch(setIsNewWorkoutPlanUpdateRequests(true));
      dispatch(
        setWorkoutPlanUpdateRequestsLength(
          AllWorkoutPlanUpdateRequestsFromDB.length
        )
      );
    }
    if (
      AllDietPlanUpdateRequestsFromDB.length > NumberofDietPlanUpdateRequest
    ) {
      dispatch(setIsNewDietPlanUpdateRequests(true));
      dispatch(
        setDietPlanUpdateRequestsLength(AllDietPlanUpdateRequestsFromDB.length)
      );
    }
  }, [temp, dispatch]);

  useEffect(() => {
    setInterval(() => setTemp((prevTemp) => prevTemp + 1), 5000);
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        minHeight: "100vh",
      }}
    >
      <Box sx={{ position: "absolute", top: 0, right: 5 }}>
        <Typography
          color={"white"}
          fontFamily={"Comme, sans-serif"}
          onClick={LogOut}
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.7vw",
            cursor: "pointer",
          }}
        >
          <LogoutIcon /> LogOut
        </Typography>
      </Box>
      <Typography
        fontSize={"5vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        mb={4}
      >
        Trainer Dashboard
      </Typography>
      <Box
        sx={{
          minHeight: "60vh",
          minWidth: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
          zIndex: 10,
        }}
      >
        <Box>
          <NavLink to={"/all-workout-plan-req"}>
            <Typography
              color={"white"}
              fontSize={"5vh"}
              fontFamily={"Comme, sans-serif"}
              borderBottom={"0.5px solid white"}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              All WorkoutPlans Requests
              {isNewWorkoutPlanRequests && (
                <Box sx={{ px: 1, background: "white", borderRadius: 5 }}>
                  <Typography
                    color={"black"}
                    fontSize={"1rem"}
                    fontFamily={"Comme, sans-serif"}
                    fontWeight={800}
                  >
                    New
                  </Typography>
                </Box>
              )}
            </Typography>
          </NavLink>
        </Box>
        <Box>
          <NavLink to={"/all-diet-plan-req"}>
            <Typography
              color={"white"}
              fontSize={"5vh"}
              fontFamily={"Comme, sans-serif"}
              borderBottom={"0.5px solid white"}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              All DietPlans Requests
              {isNewDietPlanRequests && (
                <Box
                  sx={{
                    px: 1,
                    background: "white",
                    borderRadius: 5,
                  }}
                >
                  <Typography
                    color={"black"}
                    fontSize={"1rem"}
                    fontFamily={"Comme, sans-serif"}
                    fontWeight={800}
                  >
                    New
                  </Typography>
                </Box>
              )}
            </Typography>
          </NavLink>
        </Box>
        <Box>
          <NavLink to={"/workout-plan-update-req"}>
            <Typography
              color={"white"}
              fontSize={"5vh"}
              fontFamily={"Comme, sans-serif"}
              borderBottom={"0.5px solid white"}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              WorkoutPlan Update Requests
              {isNewWorkoutPlanUpdateRequests && (
                <Box sx={{ px: 1, background: "white", borderRadius: 5 }}>
                  <Typography
                    color={"black"}
                    fontSize={"1rem"}
                    fontFamily={"Comme, sans-serif"}
                    fontWeight={800}
                  >
                    New
                  </Typography>
                </Box>
              )}
            </Typography>
          </NavLink>
        </Box>
        <Box>
          <NavLink to={"/diet-plan-update-req"}>
            <Typography
              color={"white"}
              fontSize={"5vh"}
              fontFamily={"Comme, sans-serif"}
              borderBottom={"0.5px solid white"}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              DietPlan Update Requests
              {isNewDietPlanUpdateRequests && (
                <Box sx={{ px: 1, background: "white", borderRadius: 5 }}>
                  <Typography
                    color={"black"}
                    fontSize={"1rem"}
                    fontFamily={"Comme, sans-serif"}
                    fontWeight={800}
                  >
                    New
                  </Typography>
                </Box>
              )}
            </Typography>
          </NavLink>
        </Box>
      </Box>
    </Container>
  );
};

export default TrainerDashboardSection;
