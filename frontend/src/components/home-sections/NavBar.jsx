import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const NavBar = () => {
  const [displayDropDown, setDisplayDropDown] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        px: 0,
        justifyContent: "space-between",
        minWidth: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 1,
          mt: 1,
        }}
      >
        <Box>
          <img src={logo} style={{ width: "90px", height: "90px" }} />
        </Box>
        <Box
          sx={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            color={"white"}
            fontWeight={600}
            fontFamily={"Roboto, sans-serif"}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mb: 0.5,
              mt: 3,
              ml: 1,
            }}
            onClick={() => setDisplayDropDown(!displayDropDown)}
          >
            Our Plans <KeyboardArrowDownIcon />
          </Typography>
          {displayDropDown && (
            <Box
              sx={{
                backgroundImage:
                  " linear-gradient( rgba(29, 175, 253, 1) 50%,rgba(134, 69, 252, 1) 100% ) ",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                opacity: 0.9,
                borderRadius: 1,
                position: "absolute",
                top: 60,
              }}
            >
              <NavLink>
                <Typography
                  color={"white"}
                  sx={{
                    p: 0.5,
                    fontSize: "14px",
                    "&:hover": {
                      scale: "0.95 !important",
                    },
                  }}
                >
                  Workout Plans
                </Typography>
              </NavLink>
              <NavLink>
                <Typography
                  color={"white"}
                  sx={{
                    p: 0.5,
                    fontSize: "14px",
                    "&:hover": {
                      scale: "0.95 !important",
                    },
                  }}
                >
                  Diet Plans
                </Typography>
              </NavLink>
            </Box>
          )}
        </Box>
        <Box>
          <NavLink>
            <Typography
              color={"white"}
              fontFamily={"Rubik, sans-serif"}
              fontWeight={600}
              sx={{
                p: 0.5,
                px: 2,
                mt: 2.5,
                "&:hover": {
                  borderBottom: "1px solid white",
                },
              }}
            >
              Our Store
            </Typography>
          </NavLink>
        </Box>
        <Box>
          <NavLink>
            <Typography
              color={"white"}
              fontFamily={"Rubik, sans-serif"}
              fontWeight={600}
              sx={{
                p: 0.5,
                px: 2,
                mt: 2.5,
                "&:hover": {
                  borderBottom: "1px solid white",
                },
              }}
            >
              Blogs
            </Typography>
          </NavLink>
        </Box>
        <Box>
          <NavLink>
            <Typography
              color={"white"}
              fontFamily={"Rubik, sans-serif"}
              fontWeight={600}
              sx={{
                p: 0.5,
                px: 2,
                mt: 2.5,
                "&:hover": {
                  borderBottom: "1px solid white",
                },
              }}
            >
              Find Gym Nearby
            </Typography>
          </NavLink>
        </Box>
        <Box>
          <NavLink>
            <Typography
              color={"white"}
              fontFamily={"Rubik, sans-serif"}
              fontWeight={600}
              sx={{
                p: 0.5,
                px: 2,
                mt: 2.5,
                "&:hover": {
                  borderBottom: "1px solid white",
                },
              }}
            >
              Get Nutrition Facts
            </Typography>
          </NavLink>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            border: "1px solid pink",
            p: 1,
            px: 2,
            mt: 3,
            height: 40,
            width: 100,
          }}
        >
          <NavLink>
            <Typography
              color={"white"}
              fontFamily={"Rubik, sans-serif"}
              fontWeight={600}
              sx={{
                backgroundImage:
                  " linear-gradient( to right, rgba(92, 58, 180, 1) ,rgba(134, 69, 252, 1) ) ",
                height: 40,
                width: 110,
                pt: 1,
                ml: -4.5,
                textAlign: "center",
                transition: "scale 0.3s ease-in-out",
                "&:hover": {
                  scale: "0.95 !important",
                },
              }}
            >
              SignIn
            </Typography>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
