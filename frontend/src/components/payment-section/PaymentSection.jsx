import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AddPhysicalInfo } from "../../context/PhysicalInfo";
import { SetSelectedPlanToBuy } from "../../context/SelectedPlan";
import visa from "../../assets/visa.svg";
import master from "../../assets/master.svg";
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
              console.log(res.data);
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
        <Typography variant="h3" color={"white"} fontWeight={800}>
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
              <img src={visa} alt="visa-card" style={{ width: "6vw" }} />
              <img src={master} alt="master-card" style={{ width: "5vw" }} />
            </Box>
            <Box
              sx={{
                borderBottom: "0.5px solid white",
                minWidth: "100%",
                mt: -2,
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
                border: "2px solid white",
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
                  fontSize: "1.4vw",
                  height: "3.4vw",
                  width: "8.6vw",
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
