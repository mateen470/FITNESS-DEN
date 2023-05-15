import React, { useState } from "react";
import StatsForAdmin from "../stats-for-admin/StatsForAdmin";
import AdminBlogsView from "../blogs-section/AdminBlogsView";
import { Box, Container, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setIsAdmin } from "../../context/CheckForUserType";
import { useDispatch } from "react-redux";

const AdminDashboardSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LogOut = async () => {
    try {
      const logOutResponse = await axios.post("logout");
      if (logOutResponse.data && logOutResponse.data.success) {
        toast.success(logOutResponse.data.message);
        dispatch(setIsAdmin(false));
        navigate("/");
      }
      if (
        logOutResponse.response &&
        logOutResponse.response.data &&
        logOutResponse.response.data.message
      ) {
        toast.error(logOutResponse.response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [active, setActive] = useState(false);
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ position: "absolute", top: 0, right: 5 }}>
        <Typography
          color={"white"}
          fontFamily={"Comme, sans-serif"}
          onClick={LogOut}
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.7vw",
            cursor: "pointer",
          }}
        >
          <LogoutIcon /> LogOut
        </Typography>
      </Box>
      <Typography
        fontSize={"5vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        my={4}
      >
        Admin Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Typography
          fontSize={"5vh"}
          color={!active ? "white" : "gray"}
          borderBottom={!active ? "2px solid white" : "none"}
          fontWeight={800}
          textAlign={"center"}
          fontFamily={"Comme, sans-serif"}
          sx={{ cursor: "pointer" }}
          onClick={() => setActive(false)}
        >
          Stats
        </Typography>
        <Typography
          fontSize={"5vh"}
          color={active ? "white" : "gray"}
          borderBottom={active ? "2px solid white" : "none"}
          fontWeight={800}
          textAlign={"center"}
          fontFamily={"Comme, sans-serif"}
          sx={{ cursor: "pointer" }}
          onClick={() => setActive(true)}
        >
          Blogs
        </Typography>
      </Box>
      <Box
        sx={{
          display: !active ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatsForAdmin />
      </Box>
      <Box
        sx={{
          display: active ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AdminBlogsView />
      </Box>
    </Container>
  );
};

export default AdminDashboardSection;
