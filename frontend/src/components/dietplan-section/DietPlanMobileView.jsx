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
    Type: "Diet",
    Title: "Keto Diet",
    Description:
      "The ketogenic diet, commonly known as the keto diet, is a low-carbohydrate, high-fat diet that aims to shift the body into a state of ketosis. It involves reducing carbohydrate intake to a minimum and increasing the consumption of healthy fats.",
    Price: 5000,
  },
  {
    Type: "Diet",
    Title: "Fat Loss Diet",
    Description:
      "A fat loss diet refers to a specific eating plan designed to promote weight loss by reducing body fat. It typically involves creating a calorie deficit by consuming fewer calories than the body needs to maintain its current weight.",
    Price: 5000,
  },
  {
    Type: "Diet",
    Title: "Muscle Gain Diet",
    Description:
      "A muscle gain diet is a dietary approach focused on providing the body with the necessary nutrients and calories to support muscle growth and development. It typically involves consuming a surplus of calories, with an emphasis on high-quality protein sources to support muscle protein synthesis.",
    Price: 5000,
  },
  {
    Type: "Diet",
    Title: "Vegan Diet",
    Description:
      "A vegetarian or vegan diet is a dietary approach that excludes or minimizes the consumption of animal products. Vegetarians typically avoid meat, poultry, and seafood, while still incorporating dairy products and eggs into their diet.",
    Price: 5000,
  },
  {
    Type: "Diet",
    Title: "Mediterranean Diet",
    Description:
      "The Mediterranean diet is a dietary pattern inspired by the traditional eating habits of countries bordering the Mediterranean Sea. It emphasizes the consumption of plant-based foods, such as fruits, vegetables, whole grains, legumes, and nuts, along with olive oil as the primary source of fat.",
    Price: 5000,
  },
];
export default function DietPlanMobileView() {
  const dispatch = useDispatch();
  const { isUser } = useSelector((state) => state.CheckForUserType);
  const [DietPlan, setDietPlan] = useState([]);
  const flag = useRef(false);
  const flag1 = useRef(false);
  const [DietPlanRequests, setDietPlanRequests] = useState([]);
  const navigate = useNavigate();
  const IDofCurrentUser = useSelector(
    (state) => state.CurrentUser.CurrentUserID
  );

  const checkIfPlanAlreadyBought = (Title) => {
    console.log(Title);
    axios.get("diet/all-diet-plans/" + IDofCurrentUser).then((res) => {
      setDietPlan(res.data.data);
    });
    var filteredDietPlan = DietPlan.filter((Plan) => Plan.PlanName === Title);
    console.log(filteredDietPlan.length);
    if (filteredDietPlan.length > 0) {
      flag.current = true;
    } else flag.current = false;
    axios
      .get("diet/all-new-diet-requests")
      .then((res) => setDietPlanRequests(res.data.data));
    var filteredDietPlanRequests = DietPlanRequests.filter(
      (Request) =>
        Request.IDofCurrentUser === IDofCurrentUser && Request.Title === Title
    );
    console.log(filteredDietPlanRequests);
    if (filteredDietPlanRequests.length > 0) {
      flag1.current = true;
    } else flag1.current = false;
  };

  const CheckFlags = () => {
    if (flag.current || flag1.current) {
      toast.error("YOU HAVE ALREADY BOUGHT THIS PLAN");
    } else navigate("/diet-plan-form");
  };
  useEffect(() => checkIfPlanAlreadyBought(), []);

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
