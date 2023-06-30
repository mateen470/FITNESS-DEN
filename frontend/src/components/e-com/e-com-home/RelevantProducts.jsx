import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActions,
  Rating,
} from "@mui/material";
import axios from "axios";

const RelevantProducts = ({ id }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const FetchAllProducts = async () => {
    await axios.get("product/all-products").then((res) => {
      if (res.data.data.length > 2) {
        setAllProducts(res.data.data.slice(-3));
      } else {
        setAllProducts(res.data.data);
      }
    });
  };

  useEffect(() => {
    FetchAllProducts();
  }, [allProducts]);

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
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mb: 5,
        }}
      >
        <Typography
          variant={
            windowWidth < 810 && windowWidth > 768
              ? "h5"
              : windowWidth < 768 && windowWidth > 500
              ? "h3"
              : windowWidth < 500
              ? "h4"
              : "h3"
          }
          color={"white"}
          fontWeight={800}
          textAlign={"center"}
          mt={4}
          mb={2}
        >
          Products you may Like!
        </Typography>
        <Grid container spacing={2}>
          {allProducts.map((cardData, index) =>
            cardData._id !== id ? (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: "22rem", position: "relative" }}>
                  <CardMedia
                    component="div"
                    style={{
                      height: 200,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      alt="card image"
                      src={cardData.mainImage}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                      }}
                    />
                  </CardMedia>
                  <Typography
                    variant="h5"
                    color={"black"}
                    textAlign={"center"}
                    mt={2}
                    fontWeight={600}
                    px={1}
                  >
                    {cardData.title}
                  </Typography>
                  <CardActions
                    sx={{
                      ml: 1,
                    }}
                  >
                    <Box>
                      PRICE :
                      <Typography variant="h7" fontFamily={"Comme, sans-serif"}>
                        {cardData.price}
                      </Typography>
                      Rs.
                    </Box>
                  </CardActions>
                  <CardActions
                    sx={{
                      position: "absolute",
                      bottom: 5,
                      left: 5,
                    }}
                  >
                    <NavLink to={`/view-product-home/${cardData._id}`}>
                      <Typography
                        sx={{
                          px: 2,
                          background: "black",
                          color: "white",
                          borderRadius: 1,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        View
                      </Typography>
                    </NavLink>
                  </CardActions>
                  <CardActions
                    sx={{
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                    }}
                  >
                    <Rating
                      defaultValue={cardData.reviewStars}
                      size="medium"
                      readOnly
                    />
                  </CardActions>
                </Card>
              </Grid>
            ) : (
              ""
            )
          )}
        </Grid>
      </Box>
    </>
  );
};

export default RelevantProducts;
