import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Button,
  Rating,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaidOrders = () => {
  const [products, setProducts] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [prdId, setPrdId] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const handleOpen = (id) => {
    setOpen(true);
    setPrdId(id);
  };
  const handleClose = () => setOpen(false);

  const modalRef = useRef();

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sendReviewAndComments = await axios.post(
      `product/add-review/${prdId}`,
      {
        review,
        rating,
      }
    );
    if (sendReviewAndComments.data && sendReviewAndComments.data.success) {
      toast.success(sendReviewAndComments.data.message);
    }
    if (
      sendReviewAndComments.response &&
      sendReviewAndComments.response.data &&
      sendReviewAndComments.response.data.message
    ) {
      toast.error(sendReviewAndComments.response.data.message);
    }
    handleClose();
  };

  useEffect(() => {
    const fetchPaidProducts = async () => {
      const paidProducts = await axios.get("payment/get-user-paid-products", {
        withCredentials: true,
      });
      console.log(paidProducts.data.data);
      setProducts([...paidProducts.data.data]);
    };
    fetchPaidProducts();
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
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779141/user-smoke_artunt.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/user"}>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize:
                windowWidth < 1100 && windowHeight > 1000
                  ? "2vh"
                  : windowWidth < 1000
                  ? "1.2rem"
                  : "1.7vw",
            }}
          >
            <KeyboardDoubleArrowLeftIcon /> Back
          </Typography>
        </NavLink>
      </Box>
      <Typography
        color={"white"}
        variant={
          windowWidth < 810 && windowWidth > 768
            ? "h5"
            : windowWidth < 768 && windowWidth > 500
            ? "h3"
            : windowWidth < 500
            ? "h5"
            : "h3"
        }
        fontWeight={800}
        textAlign={"center"}
        mt={4}
        mb={2}
      >
        My ShoppingCart
      </Typography>
      <Box sx={{ overflowX: "auto" }}>
        {products.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(255,255,255,0.3)",
                borderRadius: 2,
                width: "55vw",
                p: 5,
              }}
            >
              <img
                src={
                  "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779071/emptyCart_ygei0a.svg"
                }
                alt="emptycart"
                style={{ width: "45vw" }}
              />
            </Box>
          </Box>
        ) : (
          <Table sx={{ mb: 5 }}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize:
                      windowWidth < 1100 && windowHeight > 1000
                        ? "5vh"
                        : windowWidth < 1000
                        ? "1rem"
                        : "5vh",
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize:
                      windowWidth < 1100 && windowHeight > 1000
                        ? "5vh"
                        : windowWidth < 1000
                        ? "1rem"
                        : "5vh",
                  }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize:
                      windowWidth < 1100 && windowHeight > 1000
                        ? "5vh"
                        : windowWidth < 1000
                        ? "1rem"
                        : "5vh",
                  }}
                >
                  Paid-Price
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize:
                      windowWidth < 1100 && windowHeight > 1000
                        ? "5vh"
                        : windowWidth < 1000
                        ? "1rem"
                        : "5vh",
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((item) => {
                const allProducts = item.AllProductsBoughtInfo[0]?.AllProducts;
                const status = item.status;

                return allProducts.map((product, productIndex) => {
                  const mainImage = product.mainImage;
                  const title = product.title;
                  const quantity = product.quantity;
                  const totalPayment = product.price;

                  return (
                    <TableRow key={productIndex}>
                      <TableCell
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {mainImage && (
                          <Box
                            sx={{
                              background: "white",
                              borderRadius: 2,
                              width: "7rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              py: 1,
                            }}
                          >
                            <img
                              src={mainImage}
                              alt="product"
                              style={{
                                height:
                                  windowWidth < 1100 && windowHeight > 1000
                                    ? "20vh"
                                    : windowWidth < 1000
                                    ? "4rem"
                                    : "20vh",
                                weight:
                                  windowWidth < 1100 && windowHeight > 1000
                                    ? "20vh"
                                    : windowWidth < 1000
                                    ? "4rem"
                                    : "20vh",
                                borderRadius: "5px",
                              }}
                            />
                          </Box>
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontSize:
                            windowWidth < 1100 && windowHeight > 1000
                              ? "4vh"
                              : windowWidth < 1000
                              ? "0.8rem"
                              : "4vh",
                          fontWeight: "bold",
                          fontFamily: "Comme, sans-serif",
                        }}
                      >
                        {title}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontSize:
                            windowWidth < 1100 && windowHeight > 1000
                              ? "4vh"
                              : windowWidth < 1000
                              ? "0.8rem"
                              : "4vh",
                          fontWeight: "bold",
                          fontFamily: "Comme, sans-serif",
                        }}
                      >
                        {quantity}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontSize:
                            windowWidth < 1100 && windowHeight > 1000
                              ? "4vh"
                              : windowWidth < 1000
                              ? "0.8rem"
                              : "4vh",
                          fontWeight: "bold",
                          fontFamily: "Comme, sans-serif",
                        }}
                      >
                        Rs.{totalPayment * quantity}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontSize:
                            windowWidth < 1100 && windowHeight > 1000
                              ? "4vh"
                              : windowWidth < 1000
                              ? "0.8rem"
                              : "4vh",
                          fontWeight: "bold",
                          fontFamily: "Comme, sans-serif",
                        }}
                      >
                        {status}
                        {status === "Delivered" ? (
                          <Button
                            onClick={() => handleOpen(product._id)}
                            sx={{
                              textTransform: "none",
                              background: "rgba(255,255,255,0.1)",
                              border: "1px solid white",
                              color: "white",
                              ml:
                                windowWidth < 720 && windowWidth > 710
                                  ? 1
                                  : windowWidth < 710
                                  ? 0
                                  : 2,
                            }}
                          >
                            Rate
                          </Button>
                        ) : (
                          ""
                        )}
                      </TableCell>
                    </TableRow>
                  );
                });
              })}
            </TableBody>
          </Table>
        )}
      </Box>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          <Box
            ref={modalRef}
            sx={{
              position: "relative",
              width: 400,
              bgcolor: "rgba(255,255,255,0.8)",
              border: "none",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="transition-modal-title"
              color={"black"}
              fontSize={"1.5vw"}
              fontWeight={800}
              textAlign={"center"}
            >
              Tell us about the Product and our Services!
            </Typography>
            <TextField
              multiline
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              sx={{
                minWidth: "100%",
                borderRadius: 3,
                backgroundColor: "rgba(0,0, 0, 0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: "10px 10px 10px rgba(255, 255, 255, 0.1)",
                color: "black",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderWidth: "0",
                  },
                  "&:hover fieldset": {
                    borderWidth: "0",
                  },
                  "&.Mui-focused fieldset": {
                    borderWidth: "0",
                  },
                  "& .MuiOutlinedInput-input": {
                    overflow: "auto",
                    color: "black",
                  },
                },
              }}
            />
            <Typography
              id="transition-modal-description"
              color={"black"}
              fontSize={"1.5vw"}
              fontWeight={800}
              textAlign={"center"}
              mt={2}
            >
              Rate
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Rating
                defaultValue={0}
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                size="large"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <Button
                onClick={handleSubmit}
                sx={{
                  color: "white",
                  background: "black",
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default PaidOrders;