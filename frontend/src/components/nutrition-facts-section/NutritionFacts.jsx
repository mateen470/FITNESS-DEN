import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const NutritionFacts = () => {
  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState("");
  const [nutrition, setNutrition] = useState({});
  const [displayData, setDisplayData] = useState(false);
  const FoodKey = "8f040c9afefc06ef5365db357ba79284";
  const foodID = "f671b2ed";
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const handleSearch = async () => {
    const response = await axios.get(
      `https://api.edamam.com/api/nutrition-data?app_id=${foodID}&app_key=${FoodKey}&ingr=${quantity}%20${food}`
    );
    setNutrition(response.data);
    setDisplayData(true);
  };


  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          mt: 5,
          mb:2,
          px: "2vw",
          width: windowWidth < 600 ? "100%" : "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "2px solid white",
        }}
      >
        <input
          type="text"
          placeholder="Enter food item..."
          value={food}
          onChange={(e) => setFood(e.target.value)}
          style={{
            minWidth: "100%",
            padding: windowWidth < 400 ? "10px 0px" : "10px",
            color: "white",
            backgroundColor: "none",
            outline: "none",
            border: "none",
            fontSize:
              windowWidth < 1100 && windowHeight > 1000
                ? "3vw"
                : windowWidth < 1000
                ? "1.2rem"
                : "2vw",
          }}
        />
      </Box>
      <Box
        sx={{
          px: "2vw",
          width: windowWidth < 600 ? "100%" : "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "2px solid white",
          mb: 2,
        }}
      >
        <input
          type="text"
          placeholder="Enter quantity..."
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{
            minWidth: "100%",
            padding: windowWidth < 400 ? "10px 0px" : "10px",
            color: "white",
            backgroundColor: "none",
            outline: "none",
            border: "none",
            fontSize:
              windowWidth < 1100 && windowHeight > 1000
                ? "3vw"
                : windowWidth < 1000
                ? "1.2rem"
                : "2vw",
          }}
        />
      </Box>
      <Button
        variant="contained"
        endIcon={<SearchIcon />}
        sx={{
          color: "white !important",
          backgroundColor: "purple !important",
          mb: 4,
          fontSize:
            windowWidth < 1100 && windowHeight > 1000
              ? "3vw"
              : windowWidth < 1000
              ? "1.2rem"
              : "2vw",
          cursor: "pointer",
          "& .MuiSvgIcon-root": {
            fontSize: "2rem",
          },
        }}
        onClick={handleSearch}
      >
        Search
      </Button>
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
      >
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
            {food}
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
          Serving Size :{quantity}
        </Typography>

        <Box
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
            Protein
          </Typography>
          <Typography
            sx={{
              fontFamily: "Comme, sans-serif",
              fontSize: "1.3rem",
              color: "black",
            }}
          >
            {nutrition.totalNutrients?.PROCNT?.quantity?.toFixed(1)}{" "}
            {nutrition.totalNutrients?.PROCNT?.unit}
          </Typography>
        </Box>
        <Box
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
            Total lipid (fat)
          </Typography>
          <Typography
            sx={{
              fontFamily: "Comme, sans-serif",
              fontSize: "1.3rem",
              color: "black",
            }}
          >
            {nutrition.totalNutrients?.FAT?.quantity?.toFixed(1)}{" "}
            {nutrition.totalNutrients?.FAT?.unit}
          </Typography>
        </Box>
        <Box
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
            Carbohydrate
          </Typography>
          <Typography
            sx={{
              fontFamily: "Comme, sans-serif",
              fontSize: "1.3rem",
              color: "black",
            }}
          >
            {nutrition.totalNutrients?.CHOCDF?.quantity?.toFixed(1)}{" "}
            {nutrition.totalNutrients?.CHOCDF?.unit}
          </Typography>
        </Box>
        <Box
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
            Energy
          </Typography>
          <Typography
            sx={{
              fontFamily: "Comme, sans-serif",
              fontSize: "1.3rem",
              color: "black",
            }}
          >
            {nutrition.totalNutrients?.ENERC_KCAL?.quantity?.toFixed(1)}{" "}
            {nutrition.totalNutrients?.ENERC_KCAL?.unit}
          </Typography>
        </Box>
        <Box
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
            Sugars
          </Typography>
          <Typography
            sx={{
              fontFamily: "Comme, sans-serif",
              fontSize: "1.3rem",
              color: "black",
            }}
          >
            {nutrition.totalNutrients?.SUGAR?.quantity?.toFixed(1)}{" "}
            {nutrition.totalNutrients?.SUGAR?.unit}
          </Typography>
        </Box>
        <Box
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
            Calcium
          </Typography>
          <Typography
            sx={{
              fontFamily: "Comme, sans-serif",
              fontSize: "1.3rem",
              color: "black",
            }}
          >
            {nutrition.totalNutrients?.CA?.quantity?.toFixed(1)}{" "}
            {nutrition.totalNutrients?.CA?.unit}
          </Typography>
        </Box>
        <Box
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
            Iron
          </Typography>
          <Typography
            sx={{
              fontFamily: "Comme, sans-serif",
              fontSize: "1.3rem",
              color: "black",
            }}
          >
            {nutrition.totalNutrients?.FE?.quantity?.toFixed(1)}{" "}
            {nutrition.totalNutrients?.FE?.unit}
          </Typography>
        </Box>
        <Box
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
            Sodium
          </Typography>
          <Typography
            sx={{
              fontFamily: "Comme, sans-serif",
              fontSize: "1.3rem",
              color: "black",
            }}
          >
            {nutrition.totalNutrients?.NA?.quantity?.toFixed(1)}{" "}
            {nutrition.totalNutrients?.NA?.unit}
          </Typography>
        </Box>
        <Box
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
            Cholesterol
          </Typography>
          <Typography
            sx={{
              fontFamily: "Comme, sans-serif",
              fontSize: "1.3rem",
              color: "black",
            }}
          >
            {nutrition.totalNutrients?.CHOLE?.quantity?.toFixed(1)}{" "}
            {nutrition.totalNutrients?.CHOLE?.unit}
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};

export default NutritionFacts;
