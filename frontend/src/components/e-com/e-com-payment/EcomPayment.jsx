import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Container, FormControl, Box, Typography } from "@mui/material";

const EcomPayment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const CheckoutData = useSelector((state) => state.EcomPayment.CheckoutInfo);
  const ProductsToBuyInfo = useSelector(
    (state) => state.EcomPayment.AllProductsInfoToBuy
  );
  const IDofCurrentUser = useSelector(
    (state) => state.CurrentUser.CurrentUserID
  );

  const handlePayment = async () => {
    const response = await axios
      .post("payment/ecom-payment", {
        amount: ProductsToBuyInfo.TotalPayment * 100,
      })
      .catch((err) => toast.error(err.message));
    if (response.status === 200) {
      const confirmPayment = await stripe.confirmCardPayment(response.data, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: CheckoutData.FullName,
            email: CheckoutData.Email,
          },
        },
      });
      console.log(confirmPayment.paymentIntent);
      if (confirmPayment.paymentIntent !== undefined) {
        if (confirmPayment.paymentIntent.status === "succeeded") {
          axios
            .post("payment/ecom-allPayments", {
              IDofCurrentUser: IDofCurrentUser,
              AllProductsBoughtInfo: ProductsToBuyInfo,
              CheckoutData: CheckoutData,
            })
            .then(async (res) => {
              axios.post("payment/allPayments", {
                PlanType: "Ecom Product",
                PlanAmount: ProductsToBuyInfo.TotalPayment,
              });
              toast.success(
                "PAYMENT SUCCESSFULL. YOUR ORDER IS BEING PROCESSED"
              );
              await axios.post("remove-cart-item-after-payment", {
                withCredentials: true,
              });
              navigate("/show-all-products");
            })
            .catch(() => {
              toast.error("THERE WAS ERROR PLACING YOUR ORDER!");
              navigate("/show-all-products");
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

export default EcomPayment;
