import { Container, Typography } from "@mui/material";
import axios from "axios";
import React from "react";

const StatsForAdmin = () => {
  const [AllPayments, setAllPayments] = React.useState([]);
  const [TotalProfit, setTotalProfit] = React.useState(0);
  const [TotalProfitFromDietPlans, setTotalProfitFromDietPlans] =
    React.useState(0);
  const [TotalProfitFromWorkoutPlans, setTotalProfitFromWorkoutPlans] =
    React.useState(0);
  const [AllDietPlans, setAllDietPlans] = React.useState([]);
  const [AllWorkoutPlans, setAllWorkoutPlans] = React.useState([]);

  const FetchAllPayments = () => {
    axios
      .get("payment/allPayments")
      .then((res) => setAllPayments(res.data))
      .catch((err) => console.log(err));
  };

  const setDietAndWorkoutPlans = () => {
    setAllDietPlans(AllPayments.filter((item) => item.PlanType === "Diet"));
    setAllWorkoutPlans(
      AllPayments.filter((item) => item.PlanType === "Workout")
    );
  };

  const setDietAndWorkoutPlansProfit = () => {
    var temp = 0;
    var temp1 = 0;
    AllDietPlans.forEach((item) => {
      temp += item.PlanAmount;
    });
    setTotalProfitFromDietPlans(temp);
    AllWorkoutPlans.map((item) => {
      temp1 += item.PlanAmount;
    });
    setTotalProfitFromWorkoutPlans(temp1);
    setTotalProfit(temp1 + temp);
  };
  React.useEffect(FetchAllPayments, []);
  React.useEffect(setDietAndWorkoutPlans, [AllPayments]);
  React.useEffect(setDietAndWorkoutPlansProfit, [
    AllDietPlans,
    AllWorkoutPlans,
  ]);
  return (
    <Container>
      <Typography>Total Number of Plans Sold:{AllPayments.length}</Typography>
      <Typography>
        Total Number of Diet Plans Sold:{AllDietPlans.length}
      </Typography>
      <Typography>
        Total Number of Workout Plans Sold:{AllWorkoutPlans.length}
      </Typography>
      <Typography>Total Profit From Plans Sold: Rs.{TotalProfit}/-</Typography>
      <Typography>
        Total Profit From Diet Plans Sold: Rs.{TotalProfitFromDietPlans}/-
      </Typography>
      <Typography>
        Total Profit From Workout Plans Sold: Rs.{TotalProfitFromWorkoutPlans}/-
      </Typography>
    </Container>
  );
};
export default StatsForAdmin;
