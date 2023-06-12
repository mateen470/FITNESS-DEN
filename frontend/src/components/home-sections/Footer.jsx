import React, { useEffect, useState } from "react";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const services = [
    {
      name: "Workout Plans",
      path: "/workout-plans",
    },
    {
      name: "Diet Plans",
      path: "/diet-plans",
    },
    {
      name: "Gym Essentials Store",
      path: "/show-all-products",
    },
    {
      name: "Blogs",
      path: "/show-all",
    },
    {
      name: "Find Gym Nearby",
      path: "/map",
    },
    {
      name: "Find Nutrition Value of Food",
      path: "/nutrition-facts",
    },
  ];

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
    <footer>
      <Box
        sx={{
          background: "black",
          minWdith: "100%",
        }}
      >
        <Grid container sx={{ pb: 3 }}>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 3,
              mt: windowWidth < 600 ? 5 : 0,
            }}
          >
            <NavLink to={"/"}>
              <Typography variant="h3" color={"white"} fontWeight={800}>
                Fitness Den
              </Typography>
            </NavLink>
            {windowWidth < 900 ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box>
                  <NavLink to={"/"} style={{ color: "white" }}>
                    <InstagramIcon />
                  </NavLink>
                </Box>
                <Box>
                  <NavLink to={"/"} style={{ color: "white" }}>
                    <FacebookIcon />
                  </NavLink>
                </Box>
                <Box>
                  <NavLink to={"/"} style={{ color: "white" }}>
                    <EmailIcon />
                  </NavLink>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pt: 5,
            }}
          >
            <List>
              <Typography variant="h4" color={"white"} fontWeight={600}>
                Our Services
              </Typography>
              {services.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <NavLink to={item.path}>
                      <Typography
                        color={"white"}
                        fontFamily={"Comme, sans-serif"}
                        sx={{ borderBottom: "1px solid white" }}
                      >
                        {item.name}
                      </Typography>
                    </NavLink>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          {windowWidth > 900 ? (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 2,
                pt: 7,
              }}
            >
              <Box>
                <NavLink to={"/"} style={{ color: "white" }}>
                  <InstagramIcon />
                </NavLink>
              </Box>
              <Box>
                <NavLink to={"/"} style={{ color: "white" }}>
                  <FacebookIcon />
                </NavLink>
              </Box>
              <Box>
                <NavLink to={"/"} style={{ color: "white" }}>
                  <EmailIcon />
                </NavLink>
              </Box>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;
