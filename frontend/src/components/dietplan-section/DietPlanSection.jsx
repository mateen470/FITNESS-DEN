import React from "react";
import { NavLink } from "react-router-dom";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import { SetSelectedPlanToBuy } from "../../context/SelectedPlan";
import { useDispatch } from "react-redux";

const DietPlanSection = () => {
  const dispatch = useDispatch();
  const AllPlans = [
    {
      Type: "Diet",
      Image:
        "https://www.uchicagomedicine.org/-/media/images/ucmc/forefront/general/universal/food-keto-universal-832x469.jpg?h=385&as=1&hash=9F46154F746543590C3183E8E98E260A",
      Title: "Keto Diet",
      Description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident,unde",
      Price: 10000,
    },
    {
      Type: "Diet",
      Image:
        "https://www.uchicagomedicine.org/-/media/images/ucmc/forefront/general/universal/food-keto-universal-832x469.jpg?h=385&as=1&hash=9F46154F746543590C3183E8E98E260A",
      Title: "Keto Diet",
      Description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident,unde",
      Price: 10000,
    },
  ];
  return (
    <Grid container>
      <Box>
        <Typography>Diet Plans</Typography>
      </Box>
      {AllPlans.map((item, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardMedia sx={{ height: 340 }} image={item.Image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.Title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.Description}
            </Typography>
            <Typography>{item.Price}/-PKR</Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => dispatch(SetSelectedPlanToBuy(AllPlans[index]))}
            >
              <NavLink to="/diet-plan-form">Buy Plan</NavLink>
            </Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
};
export default DietPlanSection;
