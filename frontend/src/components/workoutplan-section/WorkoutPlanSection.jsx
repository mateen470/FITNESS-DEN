import React, { useEffect, useRef, useState } from "react";
import WorkoutPlanSectionMobileView from "./WorkoutPlanMobileView";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Tilt } from "react-tilt";

const WorkoutPlanSection = () => {
  const dispatch = useDispatch();
  const { isUser } = useSelector((state) => state.CheckForUserType);
  const [Plan, setPlan] = useState([]);
  const [WorkoutPlanRequests, setWorkoutPlanRequests] = useState([]);
  const navigate = useNavigate();
  const flag = useRef(false);
  const flag1 = useRef(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const IDofCurrentUser = useSelector(
    (state) => state.CurrentUser.CurrentUserID
  );
  const AllPlans = [
    {
      Type: "Workout",
      Title: "Resistance Training",
      Description:
        "Resistance training, also known as strength training, is an exercise method that focuses on specific muscle groups to increase strength and muscle mass. It involves using bodyweight, free weights, or resistance machines to provide external resistance. ",
      DetailedContent:
        "Resistance training, also referred to as strength training or weightlifting, is a targeted exercise approach aimed at enhancing muscle strength and promoting muscle growth. It involves utilizing various forms of resistance, such as bodyweight, free weights, or resistance machines, to challenge specific muscle groups. Through a process of muscle fiber breakdown and subsequent repair, resistance training induces muscle adaptation and hypertrophy. Compound exercises like squats and bench presses, isolation exercises like bicep curls, and bodyweight exercises are commonly employed.",
      Price: 5000,
      Image:
        "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779091/resistance_t10nnx.svg",
    },
    {
      Type: "Workout",
      Title: "Cardiovascular Training",
      Description:
        "Cardiovascular training, also referred to as cardio or aerobic exercise, is a type of physical activity that elevates the heart rate and enhances cardiovascular endurance. It includes activities like running, swimming, cycling, and high-intensity interval training (HIIT). ",
      DetailedContent:
        "Cardiovascular training, also known as cardio or aerobic exercise, involves engaging in activities that elevate the heart rate and improve cardiovascular endurance. These activities, such as running, swimming, cycling, or high-intensity interval training (HIIT), target large muscle groups and require sustained effort. By regularly participating in cardiovascular training, individuals can enhance their heart and lung function, improve circulation, increase stamina, and burn calories. ",
      Price: 5000,
      Image:
        "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685736903/cardio_zrtunl.svg",
    },
    {
      Type: "Workout",
      Title: "Core Training",
      Description:
        "Core training focuses on exercises designed to strengthen the muscles of the abdomen, lower back, and hips. By targeting these core muscles, including the rectus abdominis, obliques, transverse abdominis, and erector spinae, core training enhances stability, balance, and posture. ",
      DetailedContent:
        "Core training encompasses exercises that specifically target and strengthen the muscles of the abdomen, lower back, and hips. By focusing on the core muscles, including the rectus abdominis, obliques, transverse abdominis, and erector spinae, core training improves stability, balance, and posture. Common core exercises include planks, crunches, Russian twists, bridges, and supermans, which engage these muscle groups. Regular core training not only enhances functional strength but also helps prevent injuries related to the core area and promotes better overall back health.",
      Price: 5000,
      Image:
        "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685736952/core_byaozl.svg",
    },
    {
      Type: "Workout",
      Title: "Flexibility and Mobility Training",
      Description:
        "Flexibility and mobility training involves exercises and practices that aim to improve the range of motion and movement capabilities of the body. It includes stretching, dynamic movements, and exercises targeting joint mobility and muscle flexibility.",
      DetailedContent:
        "Flexibility and mobility training focuses on exercises and practices that improve the body's range of motion and movement capabilities. It involves stretching, dynamic movements, and exercises targeting joint mobility and muscle flexibility. By incorporating flexibility and mobility training into a fitness routine, individuals can enhance physical performance, prevent injuries, improve posture, and develop better movement patterns.",
      Price: 5000,
      Image:
        "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779071/flex_rooims.svg",
    },
    {
      Type: "Workout",
      Title: "Balance and stability Training",
      Description:
        "Balance and stability training involves exercises that challenge and improve the body's ability to maintain balance and stability. These exercises often utilize unstable surfaces or equipment like balance boards or stability balls.",
      DetailedContent:
        "Balance and stability training focuses on exercises that challenge and improve the body's ability to maintain balance and stability. This type of training often involves using unstable surfaces or equipment like balance boards or stability balls. By engaging core muscles and improving proprioception, balance and stability exercises enhance coordination, posture, and overall stability. ",
      Price: 5000,
      Image:
        "https://res.cloudinary.com/abdulmateen/image/upload/v1685729842/balance_zvnkqo.svg",
    },
  ];

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

  const CustomCard = ({ data, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
      setIsExpanded(!isExpanded);
    };

    const handleClose = () => {
      setIsExpanded(false);
    };
    const notAccessible = () => {
      toast.error("LOGIN FIRST!!");
    };

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <Box position="relative">
        <Tilt options={{ max: 25, scale: 1 }}>
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
        </Tilt>
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
              backgroundImage:
                "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779108/workoutbg_ifypzl.svg)",
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
          </Paper>
        </Modal>
      </Box>
    );
  };

  return (
    <Container>
      <Typography
        color={"white"}
        variant={
          windowWidth < 900 && windowWidth > 500
            ? "h3"
            : windowWidth < 500
            ? "h4"
            : "h2"
        }
        textAlign={"center"}
        my={4}
        sx={{ textShadow: "3px 0px 0px purple", fontWeight: 800 }}
      >
        Our WorkoutPlans
      </Typography>
      {windowWidth < 900 ? (
        <Box mt={-10}>
          <WorkoutPlanSectionMobileView />
        </Box>
      ) : (
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
      )}
    </Container>
  );
};

export default WorkoutPlanSection;
