import React from "react";
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
import { Button, Container, FormControl, Box, Typography } from "@mui/material";

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
            .post(Type === "Workout" ? "/workout" : "/diet", {
              Title,
              ...PhysicalInfo,
            })
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormControl sx={{ gap: "2rem" }}>
        <Box>
          <Typography variant="subtitle1">Card Number</Typography>
          <CardNumberElement />
        </Box>
        <Box>
          <Typography variant="subtitle1">Card Expiry</Typography>
          <CardExpiryElement />
        </Box>
        <Box>
          <Typography variant="subtitle1">Card CVC</Typography>
          <CardCvcElement />
        </Box>
        <Button variant="contained" onClick={handlePayment}>
          Confirm Payment
        </Button>
      </FormControl>
    </Container>
  );
};

export default PaymentSection;
