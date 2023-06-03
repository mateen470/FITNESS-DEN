import React, { useState } from "react";
import axios from "axios";
import Nutrients from "./Nutrients";
import { Box, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const NutritionFacts = () => {
  const [searchText, setSearchText] = useState("");
  const [NutritionValues, setNutritionValues] = useState();
  const [showModal, setShowModal] = useState(false);
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
          width: "40%",
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
            padding: "10px",
            color: "white",
            backgroundColor: "none",
            outline: "none",
            border: "none",
            fontSize: "1.7vw",
          }}
        />
        <SearchIcon
          sx={{
            color: "white !important",
            fontSize: "3vw",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        />
      </Box>
      {showModal ? (
        <Nutrients data={NutritionValues} setShowModal={setShowModal} />
      ) : (
        <Box sx={{ mt: -6 }}>
          <img
            src={
              "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779127/nutrition_hlg4qw.svg"
            }
            alt="nutrition"
            style={{ maxHeight: "70vh" }}
          />
        </Box>
      )}
    </Container>
  );
};

export default NutritionFacts;
