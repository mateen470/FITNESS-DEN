import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Button, Container, FormControl, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AddPhysicalInfo } from "../../context/PhysicalInfo";
import { SetSelectedPlanToBuy } from "../../context/SelectedPlan";

const PaymentSection = () => {
  const dispatch = useDispatch();
  const [CardNumber, setCardNumber] = React.useState();
  const [Cvc, setCvc] = React.useState();
  const [Expiry, setExpiry] = React.useState();
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
      .post("/payment", PaymentData)
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
        <TextField
          label="Card Number"
          InputLabelProps={{ shrink: true }}
          variant="standard"
          fullWidth
          value={CardNumber}
          InputProps={{
            inputComponent: CardNumberElement,
          }}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <TextField
          label="Card Expiry"
          InputLabelProps={{ shrink: true }}
          variant="standard"
          fullWidth
          value={Expiry}
          InputProps={{
            inputComponent: CardExpiryElement,
          }}
          onChange={(e) => setExpiry(e.target.value)}
        />

        <TextField
          label="Card CVC"
          InputLabelProps={{ shrink: true }}
          variant="standard"
          fullWidth
          value={Cvc}
          InputProps={{
            inputComponent: CardCvcElement,
          }}
          onChange={(e) => setCvc(e.target.value)}
        />
        <Button variant="contained" onClick={handlePayment}>
          Confirm Payment
        </Button>
      </FormControl>
    </Container>
  );
};

export default PaymentSection;
