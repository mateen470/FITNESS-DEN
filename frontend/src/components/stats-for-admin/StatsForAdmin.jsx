import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

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
                  textAlign={"center"}
                  fontFamily={"Comme, sans-serif"}
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
                    background: "#19191985",
                  }}
                ></Box>
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
                  textAlign={"center"}
                  fontFamily={"Comme, sans-serif"}
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
                    background: "#19191985",
                  }}
                ></Box>
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
                  textAlign={"center"}
                  fontFamily={"Comme, sans-serif"}
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
                    background: "#19191985",
                  }}
                ></Box>
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
                  Diet Plans Profit
                </Typography>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  textAlign={"center"}
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
                    background: "#19191985",
                  }}
                ></Box>
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
                  Workout Plans Profit
                </Typography>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  textAlign={"center"}
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
                    background: "#19191985",
                  }}
                ></Box>
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
                  Total Profit
                </Typography>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  textAlign={"center"}
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
                    background: "#19191985",
                  }}
                ></Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default StatsForAdmin;
