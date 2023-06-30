import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const MobileViewNavBar = () => {
  const [open, setOpen] = useState(false);
  const { isUser } = useSelector((state) => state.CheckForUserType);

  const toggleDrawer = (status) => () => {
    setOpen(status);
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "WorkoutPlans", path: "/workout-plans" },
    { text: "DietPlans", path: "/diet-plans" },
    { text: "Blogs", path: "/show-all" },
    { text: "Our Store", path: "/show-all-products" },
    { text: "Find Gym NearBy", path: "/map" },
    { text: "Get Nutrition Facts", path: "/nutrition-facts" },
  ];

  const ScrollbarCSS = {
    "&::-webkit-scrollbar": {
      width: "8px",
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#6a1b9a",
      borderRadius: "10px",
    },
  };

  return (
    <div>
      {isUser === false ? (
        ""
      ) : (
        <Box sx={{ position: "absolute", right: 15, top: 15 }}>
          <NavLink to={"/user"}>
            <img
              src={
                "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779078/profile_z25g0d.svg"
              }
              alt="user-profile"
              style={{ height: "3rem" }}
            />
          </NavLink>
        </Box>
      )}
      <IconButton
        edge="start"
        aria-label="menu"
        sx={{ position: "absolute", left: 15, top: 10 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          style: {
            backgroundColor: "#29084d",
            minWidth: "30vw",
          },
        }}
      >
        <Box
          sx={{
            overflow: "auto",
            ...ScrollbarCSS,
          }}
        >
          {isUser ? (
            <IconButton
              onClick={toggleDrawer(false)}
              sx={{ position: "absolute", right: 0 }}
            >
              <CloseIcon style={{ color: "white" }} />
            </IconButton>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Button>
                <NavLink
                  to={"/login"}
                  style={{
                    color: "black",
                    background: "white",
                    borderRadius: "5px",
                    padding: "0px 10px",
                  }}
                >
                  Sign In
                </NavLink>
              </Button>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon style={{ color: "white" }} />
              </IconButton>
            </Box>
          )}

          <List sx={{ mt: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    {item.text}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </div>
  );
};

export default MobileViewNavBar;
