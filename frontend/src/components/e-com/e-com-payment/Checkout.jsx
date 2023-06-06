import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AddCheckoutInfo } from "../../../context/EcomPayment";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { toast } from "react-toastify";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");
  const [Address, setAddress] = useState("");

  const sendCheckOutInfo = () => {
    if (!FullName || !Email || !PhoneNumber || !Country || !City || !Address) {
      toast.error("PLEASE FILL IN ALL FIELDS!!");
    } else {
      dispatch(
        AddCheckoutInfo({
          FullName,
          Email,
          PhoneNumber,
          Country,
          City,
          Address,
        })
      );
      navigate("/ecom-payment");
    }
  };

  return (
    <Box px={10} pt={5} pb={10}>
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/cart"}>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            sx={{ display: "flex", alignItems: "center", fontSize: "1.7vw" }}
          >
            <KeyboardDoubleArrowLeftIcon /> Back
          </Typography>
        </NavLink>
      </Box>
      <Box
        sx={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(5px)",
          borderRadius: 5,
          p: 10,
        }}
      >
        <Typography
          fontSize={"4.5vw"}
          color={"white"}
          fontWeight={800}
          textAlign={"center"}
        >
          Please Fill in the Form!
        </Typography>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              border: "2px solid white",
              p: 1,
              px: 2,
              mt: 3,
              height: "4vw",
              width: "19.5vw",
              cursor: "pointer",
            }}
            onClick={sendCheckOutInfo}
          >
            <Typography
              color={"black"}
              fontFamily={"Comme, sans-serif"}
              sx={{
                background: "white",
                fontSize: "1.7vw",
                height: "4.2vw",
                width: "20vw",
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
              Continue to Payment
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
