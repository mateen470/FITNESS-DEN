import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const AddToCart = () => {
  return (
    <Box my={1}>
      <Button
        sx={{
          background: "black",
          border: "none",
          textTransform: "none",
          outline: "none",
          color: "white",
          fontSize: "2vw",
          transition: "0.1s ease-in-out color",
          "&:hover": {
            color: "black",
          },
        }}
      >
        <Typography
          fontSize={"2vw"}
          fontWeight={800}
          fontFamily={"Comme, sans-serif"}
          mx={1}
        >
          <i>Add to Cart</i>
        </Typography>
        <ShoppingCartIcon />
      </Button>
    </Box>
  );
};

export default AddToCart;
