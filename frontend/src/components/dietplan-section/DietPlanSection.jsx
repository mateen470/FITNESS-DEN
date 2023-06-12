import React, { useEffect, useRef, useState } from "react";
import DietPlanMobileView from "./DietPlanMobileView";
import { NavLink, useNavigate } from "react-router-dom";
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
import { SetSelectedPlanToBuy } from "../../context/SelectedPlan";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LaunchIcon from "@mui/icons-material/Launch";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Tilt } from "react-tilt";

const DietPlanSection = () => {
  const dispatch = useDispatch();
  const { isUser } = useSelector((state) => state.CheckForUserType);
  const [DietPlan, setDietPlan] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const flag = useRef(false);
  const flag1 = useRef(false);
  const [DietPlanRequests, setDietPlanRequests] = useState([]);
  const navigate = useNavigate();
  const IDofCurrentUser = useSelector(
    (state) => state.CurrentUser.CurrentUserID
  );
  const AllPlans = [
    {
      Type: "Diet",
      Title: "Keto Diet",
      Description:
        "The ketogenic diet, commonly known as the keto diet, is a low-carbohydrate, high-fat diet that aims to shift the body into a state of ketosis. It involves reducing carbohydrate intake to a minimum and increasing the consumption of healthy fats.",
      DetailedContent:
        "The ketogenic diet (keto diet) is a low-carbohydrate, high-fat eating plan that induces ketosis, where the body uses fat for fuel instead of glucose. It involves reducing carb intake (20-50g/day) and increasing fat intake (70-75% of calories), with moderate protein intake (20-25% of calories). Healthy fats like avocados, nuts, and oils are encouraged, while sugars, grains, and starchy foods are limited. Benefits may include weight loss and improved blood sugar control, but proper nutrient balance and professional guidance are crucial. ",
      Price: 5000,
      Image:
        "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779077/keto_zygdwn.svg",
    },
    {
      Type: "Diet",
      Title: "Fat Loss Diet",
      Description:
        "A fat loss diet refers to a specific eating plan designed to promote weight loss by reducing body fat. It typically involves creating a calorie deficit by consuming fewer calories than the body needs to maintain its current weight.",
      DetailedContent:
        "A fat loss diet is an eating plan designed to facilitate weight loss by reducing body fat. It involves creating a calorie deficit by consuming fewer calories than the body requires. A balanced fat loss diet emphasizes whole, nutrient-dense foods while controlling portions and avoiding processed or high-calorie foods. It typically includes lean proteins, fruits, vegetables, whole grains, and healthy fats. Regular physical activity and a sustainable approach are essential for successful fat loss.",
      Price: 5000,
      Image:
        "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779098/weightLoss_n8koel.svg",
    },
    {
      Type: "Diet",
      Title: "Muscle Gain Diet",
      Description:
        "A muscle gain diet is a dietary approach focused on providing the body with the necessary nutrients and calories to support muscle growth and development. It typically involves consuming a surplus of calories, with an emphasis on high-quality protein sources to support muscle protein synthesis.",
      DetailedContent:
        "A muscle gain diet is a dietary approach aimed at increasing muscle mass and strength. It involves consuming a calorie surplus and prioritizing high-quality protein sources to support muscle protein synthesis. The diet typically includes lean proteins, complex carbohydrates, healthy fats, and proper hydration. Combined with regular strength training, the muscle gain diet optimizes muscle growth.",
      Price: 5000,
      Image:
        "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779077/muscleGain_nkzjft.svg",
    },
    {
      Type: "Diet",
      Title: "Vegan Diet",
      Description:
        "A vegetarian or vegan diet is a dietary approach that excludes or minimizes the consumption of animal products. Vegetarians typically avoid meat, poultry, and seafood, while still incorporating dairy products and eggs into their diet.",
      DetailedContent:
        "A vegetarian or vegan diet excludes or minimizes the consumption of animal products. Vegetarians avoid meat but may consume dairy and eggs, while vegans eliminate all animal-derived products. These diets emphasize plant-based foods like fruits, vegetables, whole grains, legumes, nuts, and seeds. Proper planning ensures sufficient intake of nutrients like protein, iron, vitamin B12, and omega-3 fatty acids. Vegetarian and vegan diets are chosen for ethical, environmental, and health reasons.",
      Price: 5000,
      Image:
        "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685783026/vegan_f7kvch.svg",
    },
    {
      Type: "Diet",
      Title: "Mediterranean Diet",
      Description:
        "The Mediterranean diet is a dietary pattern inspired by the traditional eating habits of countries bordering the Mediterranean Sea. It emphasizes the consumption of plant-based foods, such as fruits, vegetables, whole grains, legumes, and nuts, along with olive oil as the primary source of fat.",
      DetailedContent:
        "The Mediterranean diet is a balanced eating pattern inspired by the traditional foods of Mediterranean countries. It emphasizes whole, minimally processed foods such as fruits, vegetables, whole grains, legumes, and nuts. Olive oil is a key component, providing healthy monounsaturated fats. Moderate amounts of fish, poultry, dairy, and eggs are included for protein and additional nutrients. Red meat and processed foods are limited. ",
      Price: 5000,
      Image:
        "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779076/mediterranean_upwiqd.svg",
    },
  ];

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
                "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1685798206/dietbg_phtqgr.png)",
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
        Our DietPlans
      </Typography>
      {windowWidth < 900 ? (
        <Box mt={-10}>
          <DietPlanMobileView />
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
export default DietPlanSection;
