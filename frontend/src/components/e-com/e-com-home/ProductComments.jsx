import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const ProductComments = ({ id }) => {
  const [product, setProduct] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const PostComment = async () => {
      try {
        const getProduct = await axios.get(`product/single-product/${id}`);
        setProduct(getProduct.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    PostComment();
  }, [product]);

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
    <Box>
      {product.comments && product.comments.length > 0 && (
        <Box sx={{ background: "white", borderRadius: 2, p: 3, my: 3 }}>
          <Typography
            fontSize={
              windowWidth < 1100 && windowHeight > 1000
                ? "3.2vh"
                : windowWidth < 1000
                ? "3vh"
                : "3vw"
            }
            color={"black"}
            fontWeight={800}
            textAlign={"left"}
            fontFamily={"Comme, sans-serif"}
            mb={2}
          >
            Comments
          </Typography>
          {product.comments.map((productComments, index) => (
            <Box mb={3} key={index}>
              <Typography
                fontSize={
                  windowWidth < 1100 && windowHeight > 1000
                    ? "2vh"
                    : windowWidth < 1000
                    ? "1rem"
                    : "1.7vw"
                }
                color={"#696969"}
                fontWeight={800}
                textAlign={"left"}
                fontFamily={"Comme, sans-serif"}
              >
                {productComments.nameOfUser}
              </Typography>
              <Typography
                fontSize={
                  windowWidth < 1100 && windowHeight > 1000
                    ? "1.8vh"
                    : windowWidth < 1000
                    ? "0.8rem"
                    : "1.5vw"
                }
                color={"black"}
                textAlign={"left"}
                fontFamily={"Comme, sans-serif"}
              >
                {productComments.comment}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductComments;
