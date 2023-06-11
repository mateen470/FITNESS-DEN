import React, { useEffect, useState } from "react";
import axios from "axios";
import Nutrients from "./Nutrients";
import { Box, Container, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const NutritionFacts = () => {
  const [searchText, setSearchText] = useState("");
  const [NutritionValues, setNutritionValues] = useState();
  const [showModal, setShowModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const handleSubmit = async () => {
    const options = {
      method: "GET",
      url: "https://food-nutrition-information.p.rapidapi.com/foods/search",
      params: {
        query: searchText,
      },
      headers: {
        "X-RapidAPI-Key": "7cc8e0f4f4msh88cd30b0cea3902p1fb2fajsn988f99897a7c",
        "X-RapidAPI-Host": "food-nutrition-information.p.rapidapi.com",
      },
    };
    await axios
      .request(options)
      .then(function (response) {
        setNutritionValues(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

    setShowModal(true);
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
          my: 5,
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
          placeholder="Enter any Food Item"
          onChange={(e) => setSearchText(e.target.value)}
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
        <SearchIcon
          sx={{
            color: "white !important",
            fontSize:
              windowWidth < 1100 && windowHeight > 1000
                ? "3vw"
                : windowWidth < 1000
                ? "1.2rem"
                : "2vw",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        />
      </Box>
      {showModal ? (
        <Nutrients data={NutritionValues} setShowModal={setShowModal} />
      ) : (
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
            ></Typography>
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
            ></Typography>
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
            ></Typography>
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
              Carbohydrate, by difference
            </Typography>
            <Typography
              sx={{
                fontFamily: "Comme, sans-serif",
                fontSize: "1.3rem",
                color: "black",
              }}
            ></Typography>
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
            ></Typography>
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
              Sugars, total including NLEA
            </Typography>
            <Typography
              sx={{
                fontFamily: "Comme, sans-serif",
                fontSize: "1.3rem",
                color: "black",
              }}
            ></Typography>
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
              Calcium, Ca
            </Typography>
            <Typography
              sx={{
                fontFamily: "Comme, sans-serif",
                fontSize: "1.3rem",
                color: "black",
              }}
            ></Typography>
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
              Iron, Fe
            </Typography>
            <Typography
              sx={{
                fontFamily: "Comme, sans-serif",
                fontSize: "1.3rem",
                color: "black",
              }}
            ></Typography>
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
              Sodium, Na
            </Typography>
            <Typography
              sx={{
                fontFamily: "Comme, sans-serif",
                fontSize: "1.3rem",
                color: "black",
              }}
            ></Typography>
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
            ></Typography>
          </Box>
        </Container>
      )}
    </Container>
  );
};

export default NutritionFacts;
