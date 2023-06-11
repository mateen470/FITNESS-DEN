import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const Nutrients = ({ data, setShowModal }) => {
  const [FilteredData, setFilteredData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const FilterData = () => {
    setFilteredData(
      data.foods[0].foodNutrients.filter(
        (item) =>
          item.nutrientId === 1003 ||
          item.nutrientId === 1004 ||
          item.nutrientId === 1005 ||
          item.nutrientId === 1087 ||
          item.nutrientId === 1089 ||
          item.nutrientId === 1253 ||
          item.nutrientId === 1093 ||
          item.nutrientId === 2000 ||
          item.nutrientId === 1008
      )
    );
  };

  useEffect(FilterData, []);
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
    data.length !== 0 && (
      <Container
        sx={{
          background: "white",
          minHeight: "100%",
          width: windowWidth < 800 ? "100%" : "50%",
          borderRadius: 3,
          mb: 8,
          position: "relative",
          pb: 4,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={() => setShowModal(false)}
          sx={{ position: "absolute", top: 5, right: 0 }}
        >
          <CloseIcon sx={{ color: "black" }} />
        </Button>
        <Typography
          sx={{
            fontSize: windowWidth < 500 ? "1.5rem" : "2rem",
            color: "black",
            fontWeight: 800,
            textAlign: "center",
            pt: 1,
            borderBottom: "5px solid black",
            mb: 1,
          }}
        >
          NUTRITION INFO
        </Typography>
        <Typography
          sx={{
            fontSize: "1.5rem",
            color: "black",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          FOOD NAME:
          <Typography
            sx={{
              pl: 1,
              fontFamily: "Comme, sans-serif",
              fontSize: "1.5rem",
              color: "black",
              fontWeight: "bold",
            }}
          >
            {data.foods[0].description}
          </Typography>
        </Typography>
        <Typography
          sx={{
            fontSize: "1.2rem",
            color: "black",
            fontWeight: 600,
            borderBottom: "3px solid black",
            pb: 1,
            mb: 1,
          }}
        >
          Serving Size :100g
        </Typography>
        {FilteredData.map((nutrient, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid black",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Comme, sans-serif",
                fontSize: "1.3rem",
                color: "black",
              }}
            >
              {nutrient.nutrientName}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Comme, sans-serif",
                fontSize: "1.3rem",
                color: "black",
              }}
            >
              {nutrient.value}
            </Typography>
          </Box>
        ))}
      </Container>
    )
  );
};

export default Nutrients;
