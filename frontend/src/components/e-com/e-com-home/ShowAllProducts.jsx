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
  Rating,
  Select,
  MenuItem,
  InputBase,
  InputAdornment,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import NavBar from "../../home-sections/NavBar";

const ShowAllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isUser } = useSelector((state) => state.CheckForUserType);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const FetchAllProducts = async () => {
    setIsLoading(true);
    await axios
      .get("product/all-products")
      .then((res) => {
        setAllProducts(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    FetchAllProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let filteredProducts = allProducts;

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortOrder) {
    filteredProducts.sort((a, b) =>
      sortOrder === "highest" ? b.price - a.price : a.price - b.price
    );
  }

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
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 10 }}>
          <NavBar />
        </Box>
        <Typography
          variant={
            windowWidth < 900 && windowWidth > 500
              ? "h3"
              : windowWidth < 500
              ? "h4"
              : "h2"
          }
          color={"white"}
          fontWeight={800}
          textAlign={"center"}
          mt={12}
          mb={2}
        >
          All Products
          {isUser ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  width: "5rem",
                  height: "5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <NavLink to={"/cart"}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <ShoppingCartIcon
                      style={{ color: "white", fontSize: "3rem" }}
                    />
                  </Box>
                </NavLink>
              </Box>
            </Box>
          ) : (
            ""
          )}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: windowWidth < 800 ? "column" : "",
            justifyContent: "space-between",
            mb: 2,
            minWidth: "100%",
            gap: windowWidth < 800 ? 2 : 10,
          }}
        >
          <InputBase
            placeholder="Search…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon
                  style={{
                    color: "white",
                    paddingRight: "0px",
                    paddingLeft: "3px",
                  }}
                />
              </InputAdornment>
            }
            sx={{
              width: "50%",
              height: "38px",
              background: "#ffffff1f",
              borderRadius: "3px",
              padding: "10px 12px",
              fontSize: 16,
              color: "whitesmoke",
            }}
          />

          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#452951",
                  mt: 0.5,
                  "& .MuiMenuItem-root": {
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#4E2C60",
                    },
                  },
                  "& .Mui-selected": {
                    opacity: 0.4,
                    backgroundColor: "transparent",
                  },
                  "& .MuiList-root": {
                    paddingTop: 0,
                    paddingBottom: 0,
                  },
                  "& .MuiMenu-paper": {
                    marginTop: "8px",
                  },
                  "& .MuiListItem-root": {
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    "&:hover": {
                      backgroundColor: "none",
                    },
                  },
                },
              },
            }}
            sx={{
              "& .MuiSelect-select .notranslate::after": `"Filters"`
                ? {
                    content: `"Filters"`,
                    opacity: 0.42,
                  }
                : {},
              width: "50%",
              height: "38px",
              background: "#ffffff1f",
              borderRadius: "3px",
              padding: "10px 0px",
              fontSize: 16,
              color: "whitesmoke",
              backgroundColor: "none",
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": {
                border: 0,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: 0,
              },
              "& .MuiSelect-icon": {
                color: "whitesmoke",
              },
            }}
          >
            <MenuItem value={"highest"}>Most Expensive</MenuItem>
            <MenuItem value={"lowest"}>Cheapest</MenuItem>
          </Select>
        </Box>

        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Grid container spacing={2}>
            {filteredProducts.map((cardData, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
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
                        <Typography
                          variant="h7"
                          fontFamily={"Comme, sans-serif"}
                        >
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
              );
            })}
          </Grid>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ShowAllProducts;
