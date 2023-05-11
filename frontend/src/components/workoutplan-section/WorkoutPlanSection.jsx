import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Paper,
  Modal,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { SetSelectedPlanToBuy } from "../../context/SelectedPlan";
import { useDispatch } from "react-redux";
import resistance from "../../assets/resistance.svg";
import cardio from "../../assets/cardio.svg";
import core from "../../assets/core.svg";
import flex from "../../assets/flex.svg";
import balance from "../../assets/balance.svg";
import workoutbg from "../../assets/workoutbg.svg";

const WorkoutPlanSection = () => {
  const dispatch = useDispatch();

  const AllPlans = [
    {
      Type: "Workout",
      Title: "Resistance Training",
      Description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident,unde",
      DetailedContent: "",
      Price: 5000,
      Image: resistance,
    },
    {
      Type: "Workout",
      Title: "Cardiovascular Training",
      Description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident,unde",
      DetailedContent: "",
      Price: 5000,
      Image: cardio,
    },
    {
      Type: "Workout",
      Title: "Core Training",
      Description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident,unde",
      DetailedContent: "",
      Price: 5000,
      Image: core,
    },
    {
      Type: "Workout",
      Title: "Flexibility and Mobility Training",
      Description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident,unde",
      DetailedContent: "",
      Price: 5000,
      Image: flex,
    },
    {
      Type: "Workout",
      Title: "Balance and stability Training",
      Description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident,unde",
      DetailedContent: "",
      Price: 5000,
      Image: balance,
    },
  ];

  const CustomCard = ({ data, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
      setIsExpanded(!isExpanded);
    };

    const handleClose = () => {
      setIsExpanded(false);
    };

    return (
      <Box position="relative">
        <Card
          onClick={handleClick}
          sx={{
            width: "100%",
            height: "100%",
            padding: 2,
            cursor: "pointer",
            background: "rgba(255, 255, 255, 0.336)",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              right: 5,
              top: 3,
              opacity: 0.5,
              display: "flex",
              alignItems: "center",
              color: "white",
            }}
          >
            <LaunchIcon />
          </Typography>
          <CardContent>
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
              textAlign={"left"}
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
          </CardContent>
        </Card>

        <Modal
          open={isExpanded}
          onClose={handleClose}
          sx={{
            outline: "none",
          }}
        >
          <Paper
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: "80%",
              padding: 2,
              overflowY: "auto",
              border: "none",
              outline: "none",
              backgroundImage: `url(${workoutbg})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              elevation: 0,
            }}
            onClick={handleClose}
          >
            <Typography
              variant="h3"
              component="div"
              textAlign={"center"}
              fontWeight={600}
            >
              {data.Title}
            </Typography>
            <Typography
              fontSize={"1.4rem"}
              color={"black"}
              textAlign={"center"}
              fontFamily={"Comme, sans-serif"}
            >
              {data.DetailedContent}
            </Typography>
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
                onClick={() => dispatch(SetSelectedPlanToBuy(AllPlans[index]))}
              >
                <NavLink to="/workout-plan-form">
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
          </Paper>
        </Modal>
      </Box>
    );
  };

  useEffect(() => {
    preloadImages();
  }, []);

  const preloadImages = () => {
    AllPlans.forEach((data) => {
      const img = new Image();
      img.src = data.Image;
    });
  };
  return (
    <Container>
      <Typography
        color={"white"}
        variant="h2"
        textAlign={"center"}
        my={4}
        sx={{ textShadow: "3px 0px 0px purple", fontWeight: 800 }}
      >
        Our WorkoutPlans
      </Typography>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
        }}
        rowSpacing={2}
      >
        {AllPlans.map((data, index) => (
          <React.Fragment key={data.id}>
            {index % 2 === 0 ? (
              <>
                <Grid item xs={6}>
                  <CustomCard data={data} index={index} />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={data.Image}
                    alt="CARD IMAGES"
                    style={{
                      width: "250px",
                      height: "250px",
                    }}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={data.Image}
                    alt="CARD IMAGES"
                    style={{
                      width: "250px",
                      height: "250px",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomCard data={data} index={index} />
                </Grid>
              </>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
};

export default WorkoutPlanSection;
