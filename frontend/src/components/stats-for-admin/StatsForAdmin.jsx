import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const StatsForAdmin = () => {
  const [AllPayments, setAllPayments] = useState([]);
  const [TotalProfit, setTotalProfit] = useState(0);
  const [TotalProfitFromDietPlans, setTotalProfitFromDietPlans] = useState(0);
  const [TotalProfitFromEcomProducts, setTotalProfitFromEcomProducts] =
    useState(0);
  const [TotalProfitFromWorkoutPlans, setTotalProfitFromWorkoutPlans] =
    useState(0);
  const [AllDietPlans, setAllDietPlans] = useState([]);
  const [AllWorkoutPlans, setAllWorkoutPlans] = useState([]);
  const [AllEcomProducts, setAllEcomProducts] = useState([]);

  const FetchAllPayments = () => {
    axios
      .get("payment/allPayments")
      .then((res) => setAllPayments(res.data))
      .catch((err) => console.log(err));
  };

  const setDietAndWorkoutPlans = () => {
    setAllDietPlans(AllPayments.filter((item) => item.PlanType === "Diet"));
    setAllEcomProducts(
      AllPayments.filter((item) => item.PlanType === "Ecom Product")
    );
    setAllWorkoutPlans(
      AllPayments.filter((item) => item.PlanType === "Workout")
    );
  };

  const setDietAndWorkoutPlansProfit = () => {
    var temp = 0;
    var temp1 = 0;
    var temp2 = 0;
    AllDietPlans.forEach((item) => {
      temp += item.PlanAmount;
    });
    setTotalProfitFromDietPlans(temp);
    AllWorkoutPlans.map((item) => {
      temp1 += item.PlanAmount;
    });
    setTotalProfitFromWorkoutPlans(temp1);
    AllEcomProducts.forEach((item) => {
      temp2 += item.PlanAmount;
    });
    setTotalProfitFromEcomProducts(temp2);
    setTotalProfit(temp1 + temp + temp2);
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
                    src={
                      "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779082/totalPlanSold_dlyhen.svg"
                    }
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
                    src={
                      "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685778139/dietPlanSold_gjjhfb.svg"
                    }
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
                    src={
                      "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779113/workoutPlanSold_jixeme.svg"
                    }
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
                    src={
                      "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685778103/dietPlanProfit_wjdp7k.svg"
                    }
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
                    src={
                      "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779111/workoutPlanProfit_gydawa.svg"
                    }
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
                  E-Com Product Sold
                </Typography>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  fontFamily={"Comme, sans-serif"}
                >
                  {AllEcomProducts.length}
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
                    src={
                      "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685886232/Black_and_Yellow_Modern_Fitness_Center_Logo-min_rmsdyu.svg"
                    }
                    alt="total profit of e-com"
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
                  Total E-Com Sales
                </Typography>
                <Typography
                  fontSize={"4vh"}
                  color={"white"}
                  fontFamily={"Comme, sans-serif"}
                >
                  Rs.{TotalProfitFromEcomProducts}/-
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
                    src={
                      "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685886232/Black_and_Yellow_Modern_Fitness_Center_Logo-min_rmsdyu.svg"
                    }
                    alt="total profit of e-com"
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
                    src={
                      "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779081/totalSales_bwys1f.svg"
                    }
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
