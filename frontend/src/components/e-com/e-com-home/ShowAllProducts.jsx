import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../../home-sections/Footer";
import {
  Box,
  Grid,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import axios from "axios";

const ShowAllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  const FetchAllProducts = async () => {
    await axios
      .get("product/all-products")
      .then((res) => setAllProducts(res.data.data));
  };

  useEffect(() => {
    FetchAllProducts();
  }, [allProducts]);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          mb: 5,
        }}
      >
        <Box sx={{ position: "absolute", top: 0, left: 5 }}>
          <NavLink to={"/"}>
            <Typography
              color={"white"}
              fontFamily={"Comme, sans-serif"}
              sx={{ display: "flex", alignItems: "center", fontSize: "1.7vw" }}
            >
              <KeyboardDoubleArrowLeftIcon /> Back
            </Typography>
          </NavLink>
        </Box>
        <Typography
          fontSize={"4.5vw"}
          color={"white"}
          fontWeight={800}
          textAlign={"center"}
          mt={4}
          mb={2}
        >
          All Products
        </Typography>
        <Grid container spacing={2}>
          {allProducts.map((cardData, index) => {
            return (
              <Grid item xs={4} key={index}>
                <Card sx={{ height: "30rem", position: "relative" }}>
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
                    <NavLink to={`/view-blog-home/${cardData._id}`}>
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
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ShowAllProducts;