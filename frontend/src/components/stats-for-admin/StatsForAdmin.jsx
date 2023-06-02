import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import totalPlanSold from "../../assets/totalPlanSold.svg";
import dietPlanSold from "../../assets/dietPlanSold.svg";
import workoutPlanSold from "../../assets/workoutPlanSold.svg";
import dietPlanProfit from "../../assets/dietPlanProfit.svg";
import workoutPlanProfit from "../../assets/workoutPlanProfit.svg";
import totalSales from "../../assets/totalSales.svg";

const StatsForAdmin = () => {
  const [AllPayments, setAllPayments] = useState([]);
  const [TotalProfit, setTotalProfit] = useState(0);
  const [TotalProfitFromDietPlans, setTotalProfitFromDietPlans] = useState(0);
  const [TotalProfitFromWorkoutPlans, setTotalProfitFromWorkoutPlans] =
    useState(0);
  const [AllDietPlans, setAllDietPlans] = useState([]);
  const [AllWorkoutPlans, setAllWorkoutPlans] = useState([]);

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
  useEffect(FetchAllPayments, []);
  useEffect(setDietAndWorkoutPlans, [AllPayments]);
  useEffect(setDietAndWorkoutPlansProfit, [AllDietPlans, AllWorkoutPlans]);
  return (
    <Grid container spacing={3} mt={3} mb={5}>
      <Grid item xs={6}>
        <Card
          sx={{
            background: "linear-gradient(#310E4B,#420B5C )",
            height: "20vh",
          }}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={8}>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                >
                  Total Plans Sold
                </Typography>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  fontFamily={"Comme, sans-serif"}
                  pl={"10vh"}
                >
                  {AllPayments.length}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={totalPlanSold}
                    alt="total plans sold"
                    style={{ height: "15vh", width: "20vh" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card
          sx={{
            background: "linear-gradient(#310E4B,#420B5C )",
            height: "20vh",
          }}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={8}>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                >
                  Diet Plans Sold
                </Typography>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  fontFamily={"Comme, sans-serif"}
                  pl={"10vh"}
                >
                  {AllDietPlans.length}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={dietPlanSold}
                    alt="diet plans sold"
                    style={{ height: "15vh", width: "20vh" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card
          sx={{
            background: "linear-gradient(#310E4B,#420B5C )",
            height: "20vh",
          }}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={8}>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                >
                  Workout Plans Sold
                </Typography>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  fontFamily={"Comme, sans-serif"}
                  pl={"10vh"}
                >
                  {AllWorkoutPlans.length}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={workoutPlanSold}
                    alt="workout plans sold"
                    style={{ height: "15vh", width: "20vh" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card
          sx={{
            background: "linear-gradient(#310E4B,#420B5C )",
            height: "20vh",
          }}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={8}>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                >
                  Diet Plans Sales
                </Typography>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  fontFamily={"Comme, sans-serif"}
                >
                  Rs.{TotalProfitFromDietPlans}/-
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={dietPlanProfit}
                    alt="diet plans profit"
                    style={{ height: "15vh", width: "20vh" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card
          sx={{
            background: "linear-gradient(#310E4B,#420B5C )",
            height: "20vh",
          }}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={8}>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                >
                  Workout Plans Sales
                </Typography>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  fontFamily={"Comme, sans-serif"}
                >
                  Rs.{TotalProfitFromWorkoutPlans}/-
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={workoutPlanProfit}
                    alt="workout plans profit"
                    style={{ height: "15vh", width: "20vh" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card
          sx={{
            background: "linear-gradient(#310E4B,#420B5C )",
            height: "20vh",
          }}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={8}>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                >
                  Total Sales
                </Typography>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  fontFamily={"Comme, sans-serif"}
                >
                  Rs.{TotalProfit}/-
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={totalSales}
                    alt="total profit"
                    style={{ height: "15vh", width: "20vh" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default StatsForAdmin;
