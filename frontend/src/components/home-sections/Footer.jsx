import React from "react";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
const Footer = () => {
  const services = [
    {
      name: "Workout Plans",
      path: "/",
    },
    {
      name: "Diet Plans",
      path: "/",
    },
    {
      name: "Gym Essentials Store",
      path: "/",
    },
    {
      name: "Blogs",
      path: "/",
    },
    {
      name: "Find Gym Nearby",
      path: "/",
    },
    {
      name: "Find Nutrition Value of Food",
      path: "/",
    },
  ];
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
            xs={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3" color={"white"}>
              Fitness Den
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pt: 5,
            }}
          >
            <List>
              <Typography variant="h4" color={"white"}>
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
          <Grid
            item
            xs={4}
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
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;
