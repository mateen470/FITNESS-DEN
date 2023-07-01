import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AddPhysicalInfo } from "../../context/PhysicalInfo";
import { SetSelectedPlanToBuy } from "../../context/SelectedPlan";
import axios from "axios";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Container, FormControl, Box, Typography } from "@mui/material";

const PaymentSection = () => {
  const dispatch = useDispatch();
  const PhysicalInfo = useSelector((state) => state.PhysicalInfo.PhysicalInfo);
  const SelectedPlan = useSelector(
    (state) => state.SelectedPlan.SelectedPlanToBuy
  );
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const Title = SelectedPlan.Title;
  const Type = SelectedPlan.Type;
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handlePayment = async () => {
    const PaymentData = {
      ProductName: SelectedPlan.Title,
      amount: SelectedPlan.Price * 100,
    };

    const response = await axios
      .post("payment", PaymentData)
      .catch((err) => toast.error(err.message));
    if (response.status === 200) {
      const confirmPayment = await stripe.confirmCardPayment(response.data, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { name: "Umair Tariq", email: "umair@123.com" },
        },
      });
      console.log(confirmPayment.paymentIntent);
      if (confirmPayment.paymentIntent !== undefined) {
        if (confirmPayment.paymentIntent.status === "succeeded") {
          axios
            .post(
              Type === "Workout" ? "workout/workoutform" : "diet/dietform",
              {
                Title,
                ...PhysicalInfo,
              }
            )
            .then((res) => {
              axios.post("payment/allPayments", {
                PlanType: Type,
                PlanAmount: SelectedPlan.Price,
              });
              toast.success(
                "PAYMENT CONFIRMED. YOU WILL RECIEVE YOUR PLAN IN FEW DAYS"
              );
              dispatch(AddPhysicalInfo({}));
              dispatch(SetSelectedPlanToBuy({}));
              navigate(Type === "Workout" ? "/workout-plans" : "/diet-plans");
            })
            .catch((error) => {
              toast.error("THERE WAS ERROR SUBMITTING PLAN REQUEST");
              navigate(Type === "Workout" ? "/workout-plans" : "/diet-plans");
            });
        } else {
          toast.error("PAYMENT ERROR");
        }
      } else {
        toast.error("CARD CREDENTIALS INVAILD");
      }
    }
  };
  return (
    <Container
      sx={{
        my: 4,
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          color={"white"}
          fontWeight={800}
          sx={{ textAlign: windowWidth < 660 && "center" }}
          >
          Enter Card Details
        </Typography>
        <FormControl sx={{ gap: "2rem", mt: 3 }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                color={"white"}
                fontWeight={800}
                fontFamily={"Comme, sans-serif"}
              >
                Card Number
              </Typography>
              <img
                src={
                  "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779093/visa_yw8sdl.svg"
                }
                alt="visa-card"
                style={{ width: "6vw" }}
              />
              <img
                src={
                  "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779075/master_brug6k.svg"
                }
                alt="master-card"
                style={{ width: "5vw" }}
              />
            </Box>
            <Box
              sx={{
                borderBottom: "0.5px solid white",
                minWidth: "100%",
                mt: windowWidth > 786 && -2,
              }}
            >
              <CardNumberElement />
            </Box>
          </Box>
          <Box>
            <Typography
              variant="h5"
              color={"white"}
              fontWeight={800}
              fontFamily={"Comme, sans-serif"}
            >
              Card Expiry
            </Typography>
            <Box sx={{ borderBottom: "0.5px solid white", minWidth: "100%" }}>
              <CardExpiryElement />
            </Box>
          </Box>
          <Box>
            <Typography
              variant="h5"
              color={"white"}
              fontWeight={800}
              fontFamily={"Comme, sans-serif"}
            >
              Card CVC
            </Typography>
            <Box sx={{ borderBottom: "0.5px solid white", minWidth: "100%" }}>
              <CardCvcElement />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 4,
              mt: -2,
            }}
          >
            <Box
              sx={{
                border: windowWidth > 786 && "2px solid white",
                p: 1,
                px: 2,
                mt: 3,
                height: "3.6vw",
                width: "8vw",
                cursor: "pointer",
              }}
              onClick={handlePayment}
            >
              <Typography
                color={"black"}
                fontFamily={"Comme, sans-serif"}
                sx={{
                  background: "white",
                  fontSize:
                    windowWidth < 450
                      ? "5vw"
                      : windowWidth < 786
                      ? "4vw"
                      : "1.4vw",
                  height:
                    windowWidth < 450
                      ? "8vw"
                      : windowWidth < 786
                      ? "6vw"
                      : "3.4vw",
                  width:
                    windowWidth < 450
                      ? "18vw"
                      : windowWidth < 786
                      ? "16vw"
                      : "8.6vw",
                  ml: -4.5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "scale 0.3s ease-in-out",
                  fontWeight: "bold",
                  "&:hover": {
                    scale: "0.95 !important",
                  },
                }}
              >
                Submit
              </Typography>
            </Box>
          </Box>
        </FormControl>
      </Box>
    </Container>
  );
};

export default PaymentSection;