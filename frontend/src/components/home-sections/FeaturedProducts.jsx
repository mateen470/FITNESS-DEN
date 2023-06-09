import React, { useEffect, useState } from "react";
import {
  CardActions,
  CardMedia,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Box,
  Rating,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";

const FeaturedProducts = () => {
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
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    FetchAllProducts();
  }, [allProducts]);

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
        mt={10}
        mb={4}
        sx={{ textShadow: "3px 0px 0px purple", fontWeight: 800 }}
      >
        Our Hotest Products
      </Typography>
      <Grid container spacing={2}>
        {allProducts.map((cardData, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ position: "relative", height: 480 }}>
                <CardMedia
                  component="div"
                  style={{
                    height: 250,
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
                <CardContent>
                  <Typography variant="h7" fontFamily={"Comme, sans-serif"}>
                    {cardData.metaDescription}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    position: "absolute",
                    bottom: 15,
                    left: 5,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 40,
                      left: 8,
                      display: "flex",
                    }}
                  >
                    PRICE
                    <Typography variant="h7" fontFamily={"Comme, sans-serif"}>
                      :{cardData.price}
                    </Typography>
                    Rs.
                  </Box>
                  <NavLink to={`/view-product-home/${cardData._id}`}>
                    <Typography
                      sx={{
                        px: 2,
                        background: "black",
                        color: "white",
                        borderRadius: 1,
                      }}
                    >
                      View
                    </Typography>
                  </NavLink>
                </CardActions>
                <CardActions
                  sx={{
                    position: "absolute",
                    bottom: 15,
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
          );
        })}
      </Grid>
    </Container>
  );
};

export default FeaturedProducts;
