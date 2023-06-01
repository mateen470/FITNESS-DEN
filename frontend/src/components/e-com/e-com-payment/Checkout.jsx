import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AddCheckoutInfo } from "../../../context/EcomPayment";

const Checkout = () => {
  const dispatch = useDispatch();
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");
  const [Address, setAddress] = useState("");
  return (
    <Container>
      <Typography variant="h3">Checkout</Typography>
      <Box
        sx={{
          mt: 3,
          minWidth: "70%",
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid white",
        }}
      >
        <input
          type="text"
          placeholder="Full Name"
          name="fullname"
          value={FullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{
            minWidth: "100%",
            padding: "10px",
            color: "white",
            backgroundColor: "none",
            outline: "none",
            border: "none",
            fontSize: "1.7vw",
          }}
        />
      </Box>
      <Box
        sx={{
          mt: 3,
          minWidth: "70%",
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid white",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            minWidth: "100%",
            padding: "10px",
            color: "white",
            backgroundColor: "none",
            outline: "none",
            border: "none",
            fontSize: "1.7vw",
          }}
        />
      </Box>
      <Box
        sx={{
          mt: 3,
          minWidth: "70%",
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid white",
        }}
      >
        <input
          type="text"
          placeholder="Phone Number"
          name="phonenumber"
          value={PhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{
            minWidth: "100%",
            padding: "10px",
            color: "white",
            backgroundColor: "none",
            outline: "none",
            border: "none",
            fontSize: "1.7vw",
          }}
        />
      </Box>
      <Box
        sx={{
          mt: 3,
          minWidth: "70%",
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid white",
        }}
      >
        <input
          type="text"
          placeholder="Country"
          name="country"
          value={Country}
          onChange={(e) => setCountry(e.target.value)}
          style={{
            minWidth: "100%",
            padding: "10px",
            color: "white",
            backgroundColor: "none",
            outline: "none",
            border: "none",
            fontSize: "1.7vw",
          }}
        />
      </Box>
      <Box
        sx={{
          mt: 3,
          minWidth: "70%",
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid white",
        }}
      >
        <input
          type="text"
          placeholder="City"
          name="city"
          value={City}
          onChange={(e) => setCity(e.target.value)}
          style={{
            minWidth: "100%",
            padding: "10px",
            color: "white",
            backgroundColor: "none",
            outline: "none",
            border: "none",
            fontSize: "1.7vw",
          }}
        />
      </Box>
      <Box
        sx={{
          mt: 3,
          minWidth: "70%",
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid white",
        }}
      >
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            minWidth: "100%",
            padding: "10px",
            color: "white",
            backgroundColor: "none",
            outline: "none",
            border: "none",
            fontSize: "1.7vw",
          }}
        />
      </Box>
      <Button
        onClick={() =>
          dispatch(
            AddCheckoutInfo({
              FullName,
              Email,
              PhoneNumber,
              Country,
              City,
              Address,
            })
          )
        }
      >
        <Link to="/ecom-payment">Continue to Payment</Link>{" "}
      </Button>
    </Container>
  );
};

export default Checkout;
