import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MobileViewNavBar from "./MobileViewNavBar";

const NavBar = () => {
  const [displayDropDown, setDisplayDropDown] = useState(false);
  const { isUser } = useSelector((state) => state.CheckForUserType);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
    <>
      {windowWidth < 990 ? (
        <MobileViewNavBar />
      ) : (
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
              gap: "1vw",
              mt: 1,
            }}
          >
            <Box>
              <NavLink to={"/"}>
                <img
                  src={
                    "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779074/logo_n2sf6t.svg"
                  }
                  style={{ width: "90px", height: "90px" }}
                  alt="logo"
                />
              </NavLink>
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
                  mt: 3,
                  ml: 1,
                  mr: windowWidth > 1200 ? "1.5vw" : "1vw",
                }}
                fontSize={"1.8vw"}
                onClick={() => setDisplayDropDown(!displayDropDown)}
              >
                Our Plans <KeyboardArrowDownIcon sx={{ fontSize: "1.8vw" }} />
              </Typography>
              {displayDropDown && (
                <Box
                  sx={{
                    backgroundImage:
                      " linear-gradient( to bottom left, #29084d 20%, #830d5c80, #191919 ) ",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    opacity: 0.9,
                    borderRadius: 1,
                  }}
                >
                  <NavLink to={"/workout-plans"}>
                    <Typography
                      color={"white"}
                      fontFamily={"Comme, sans-serif"}
                      fontWeight={800}
                      sx={{
                        p: 0.5,
                        fontSize: "1.5vw",
                        "&:hover": {
                          scale: "0.95 !important",
                        },
                      }}
                    >
                      Workout Plans
                    </Typography>
                  </NavLink>
                  <NavLink to={"/diet-plans"}>
                    <Typography
                      color={"white"}
                      fontFamily={"Comme, sans-serif"}
                      fontWeight={800}
                      sx={{
                        p: 0.5,
                        fontSize: "1.5vw",
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
              <NavLink to={"/show-all-products"}>
                <Typography
                  color={"white"}
                  fontFamily={"Rubik, sans-serif"}
                  fontWeight={600}
                  fontSize={"1.8vw"}
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
              <NavLink to={"/show-all"}>
                <Typography
                  color={"white"}
                  fontFamily={"Rubik, sans-serif"}
                  fontWeight={600}
                  fontSize={"1.8vw"}
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
              <NavLink to={"/map"}>
                <Typography
                  color={"white"}
                  fontFamily={"Rubik, sans-serif"}
                  fontWeight={600}
                  fontSize={"1.8vw"}
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
              <NavLink to={"/nutrition-facts"}>
                <Typography
                  color={"white"}
                  fontFamily={"Rubik, sans-serif"}
                  fontWeight={600}
                  fontSize={"1.8vw"}
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
          {isUser === false ? (
            <Box
              sx={{
                border: "1px solid pink",
                p: 1,
                px: 2,
                mt: 3,
                height: "4vw",
                width: "8.5vw",
                cursor: "pointer",
              }}
            >
              <NavLink to={"/login"}>
                <Typography
                  color={"black"}
                  fontFamily={"Comme, sans-serif"}
                  sx={{
                    backgroundImage:
                      " linear-gradient( to right, rgba(92, 58, 180, 1) ,rgba(134, 69, 252, 1) ) ",
                    fontSize: "1.7vw",
                    height: "3.8vw",
                    width: "9vw",
                    ml: -4.5,
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                    alignItems: "center",
                    transition: "scale 0.3s ease-in-out",
                    fontWeight: "bold",
                    "&:hover": {
                      scale: "0.95 !important",
                    },
                  }}
                >
                  SignIn
                </Typography>
              </NavLink>
            </Box>
          ) : (
            <Box mt={3}>
              <NavLink to={"/user"}>
                <img
                  src={
                    "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779078/profile_z25g0d.svg"
                  }
                  alt="user-profile"
                  style={{ height: "12vh" }}
                />
              </NavLink>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default NavBar;
