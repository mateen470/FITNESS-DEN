import React from "react";
import { NavLink } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { SetSelectedPlanToBuy } from "../../context/SelectedPlan";
import { useDispatch } from "react-redux";

const WorkoutPlanSection = () => {
  const dispatch = useDispatch();
  const AllPlans = [
    {
      Type: "Workout",
      Image:
        "https://hips.hearstapps.com/hmg-prod/images/asian-men-exercise-at-home-by-squat-in-gym-closures-royalty-free-image-1646776736.jpg?crop=0.609xw:0.911xh;0.0442xw,0.0891xh&resize=1200:*",
      Title: "Cardio",
      Description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident,unde",
      Price: 5000,
    },
    {
      Type: "Workout",
      Image:
        "https://hips.hearstapps.com/menshealth-uk/main/thumbs/26354/workout.jpg",
      Title: "Power Hour",
      Description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident,unde",
      Price: 15000,
    },
  ];
  return (
    <Container>
      <Typography>This is Workout Plans Page</Typography>
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
            <Typography>{item.Price} /- PKR</Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => dispatch(SetSelectedPlanToBuy(AllPlans[index]))}
            >
              <NavLink to="/workout-plan-form">Buy Plan</NavLink>
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};

export default WorkoutPlanSection;
