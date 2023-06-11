import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { SetSelectedPlanToBuy } from "../../context/SelectedPlan";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: -10,
    transition: {
      type: "spring",
      bounce: 0.6,
      duration: 1,
    },
  },
};

const AllPlans = [
  {
    Type: "Workout",
    Title: "Resistance Training",
    Description:
      "Resistance training, also known as strength training, is an exercise method that focuses on specific muscle groups to increase strength and muscle mass. It involves using bodyweight, free weights, or resistance machines to provide external resistance. ",
    Price: 5000,
  },
  {
    Type: "Workout",
    Title: "Cardiovascular Training",
    Description:
      "Cardiovascular training, also referred to as cardio or aerobic exercise, is a type of physical activity that elevates the heart rate and enhances cardiovascular endurance. It includes activities like running, swimming, cycling, and high-intensity interval training (HIIT). ",
    Price: 5000,
  },
  {
    Type: "Workout",
    Title: "Core Training",
    Description:
      "Core training focuses on exercises designed to strengthen the muscles of the abdomen, lower back, and hips. By targeting these core muscles, including the rectus abdominis, obliques, transverse abdominis, and erector spinae, core training enhances stability, balance, and posture. ",
    Price: 5000,
  },
  {
    Type: "Workout",
    Title: "Flexibility and Mobility Training",
    Description:
      "Flexibility and mobility training involves exercises and practices that aim to improve the range of motion and movement capabilities of the body. It includes stretching, dynamic movements, and exercises targeting joint mobility and muscle flexibility.",
    Price: 5000,
  },
  {
    Type: "Workout",
    Title: "Balance and stability Training",
    Description:
      "Balance and stability training involves exercises that challenge and improve the body's ability to maintain balance and stability. These exercises often utilize unstable surfaces or equipment like balance boards or stability balls.",
    Price: 5000,
  },
];
export default function WorkoutPlanMobileView() {
  const dispatch = useDispatch();
  const { isUser } = useSelector((state) => state.CheckForUserType);
  const [Plan, setPlan] = useState([]);
  const [WorkoutPlanRequests, setWorkoutPlanRequests] = useState([]);
  const navigate = useNavigate();
  const flag = useRef(false);
  const flag1 = useRef(false);
  const IDofCurrentUser = useSelector(
    (state) => state.CurrentUser.CurrentUserID
  );

  const checkIfPlanAlreadyBought = (Title) => {
    axios.get("workout/all-workout-plans/" + IDofCurrentUser).then((res) => {
      setPlan(res.data.data);
    });
    var filteredWorkoutPlan = Plan.filter((Item) => Item.PlanName === Title);
    console.log(filteredWorkoutPlan.length);
    if (filteredWorkoutPlan.length > 0) {
      flag.current = true;
      console.log(flag);
    } else flag.current = false;

    axios
      .get("workout/all-new-workout-requests")
      .then((res) => setWorkoutPlanRequests(res.data.data));
    var filteredWorkoutPlanRequests = WorkoutPlanRequests.filter(
      (Request) =>
        Request.IDofCurrentUser === IDofCurrentUser && Request.title === Title
    );
    console.log(filteredWorkoutPlanRequests);
    if (filteredWorkoutPlanRequests.length > 0) {
      flag1.current = true;
    } else flag1.current = false;
  };

  const CheckFlags = () => {
    if (flag.current || flag1.current) {
      toast.error("YOU HAVE ALREADY BOUGHT THIS PLAN");
    } else navigate("/workout-plan-form");
  };
  useEffect(() => {
    checkIfPlanAlreadyBought();
  }, []);

  const notAccessible = () => {
    toast.error("LOGIN FIRST!!");
  };

  return AllPlans.map((data, index) => (
    <motion.div
      style={{
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        paddingTop: " 70px",
      }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        }}
      />

      <motion.div
        style={{
          fontSize: "164px",
          width: "90%",
          minHeight: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "rgba(255, 255, 255, 0.336)",
          borderRadius: "20px",
          transformOrigin: "10% 60%",
          boxShadow: "3px 2px 5px rgba(0,0,0,0.5)",
          padding: "20px",
        }}
        variants={cardVariants}
      >
        <Typography
          variant="h4"
          color={"white"}
          textAlign={"center"}
          fontWeight={600}
        >
          {data.Title}
        </Typography>
        <Typography
          fontSize={"1.2rem"}
          color={"white"}
          textAlign={"center"}
          fontFamily={"Comme, sans-serif"}
        >
          {data.Description}
        </Typography>
        <Typography
          fontSize={"1.5rem"}
          color={"white"}
          textAlign={"center"}
          fontWeight={800}
        >
          {data.Price} /- PKR
        </Typography>
        {isUser ? (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box
              sx={{
                border: "2px solid black",
                p: 1,
                px: 2,
                mt: 3,
                height: 40,
                width: 100,
              }}
              onClick={() => {
                checkIfPlanAlreadyBought(data.Title);
                CheckFlags();
                dispatch(SetSelectedPlanToBuy(AllPlans[index]));
              }}
            >
              <NavLink>
                <Typography
                  color={"white"}
                  fontFamily={"Rubik, sans-serif"}
                  fontWeight={600}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: " black ",
                    height: 40,
                    width: 110,
                    ml: -4.5,
                    textAlign: "center",
                    transition: "scale 0.3s ease-in-out",
                    "&:hover": {
                      scale: "0.95 !important",
                    },
                  }}
                >
                  Buy Plan
                </Typography>
              </NavLink>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box
              sx={{
                border: "2px solid black",
                p: 1,
                px: 2,
                mt: 3,
                height: 40,
                width: 100,
              }}
              onClick={notAccessible}
            >
              <NavLink>
                <Typography
                  color={"white"}
                  fontFamily={"Rubik, sans-serif"}
                  fontWeight={600}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: " black ",
                    height: 40,
                    width: 110,
                    ml: -4.5,
                    textAlign: "center",
                    transition: "scale 0.3s ease-in-out",
                    "&:hover": {
                      scale: "0.95 !important",
                    },
                  }}
                >
                  Buy Plan
                </Typography>
              </NavLink>
            </Box>
          </Box>
        )}
      </motion.div>
    </motion.div>
  ));
}
