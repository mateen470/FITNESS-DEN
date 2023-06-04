import React, { useState } from "react";
import StatsForAdmin from "../stats-for-admin/StatsForAdmin";
import AdminBlogsView from "../blogs-section/AdminBlogsView";
import AdminProductsView from "../e-com/e-com-admin/AdminProductView";
import AllPaidProducts from "./AllPaidOrders";
import AllUsers from "./AllUsers";
import { Box, Container, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../context/CheckForUserType";
import { useDispatch } from "react-redux";

const AdminDashboardSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LogOut = async () => {
    try {
      const logOutResponse = await axios.post("logout");
      if (logOutResponse.data && logOutResponse.data.success) {
        toast.success(logOutResponse.data.message);
        dispatch(setLogout(true));
        navigate("/logout");
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

  const [active, setActive] = useState(0);
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
          color={active === 0 ? "white" : "gray"}
          borderBottom={active === 0 ? "2px solid white" : "none"}
          fontWeight={800}
          textAlign={"center"}
          fontFamily={"Comme, sans-serif"}
          sx={{ cursor: "pointer" }}
          onClick={() => setActive(0)}
        >
          Stats
        </Typography>
        <Typography
          fontSize={"5vh"}
          color={active === 1 ? "white" : "gray"}
          borderBottom={active === 1 ? "2px solid white" : "none"}
          fontWeight={800}
          textAlign={"center"}
          fontFamily={"Comme, sans-serif"}
          sx={{ cursor: "pointer" }}
          onClick={() => setActive(1)}
        >
          Blogs
        </Typography>
        <Typography
          fontSize={"5vh"}
          color={active === 2 ? "white" : "gray"}
          borderBottom={active === 2 ? "2px solid white" : "none"}
          fontWeight={800}
          textAlign={"center"}
          fontFamily={"Comme, sans-serif"}
          sx={{ cursor: "pointer" }}
          onClick={() => setActive(2)}
        >
          Products
        </Typography>
        <Typography
          fontSize={"5vh"}
          color={active === 3 ? "white" : "gray"}
          borderBottom={active === 3 ? "2px solid white" : "none"}
          fontWeight={800}
          textAlign={"center"}
          fontFamily={"Comme, sans-serif"}
          sx={{ cursor: "pointer" }}
          onClick={() => setActive(3)}
        >
          Orders
        </Typography>
        <Typography
          fontSize={"5vh"}
          color={active === 4 ? "white" : "gray"}
          borderBottom={active === 4 ? "2px solid white" : "none"}
          fontWeight={800}
          textAlign={"center"}
          fontFamily={"Comme, sans-serif"}
          sx={{ cursor: "pointer" }}
          onClick={() => setActive(4)}
        >
          AllUsers
        </Typography>
      </Box>
      <Box
        sx={{
          display: active === 0 ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatsForAdmin />
      </Box>
      <Box
        sx={{
          display: active === 1 ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AdminBlogsView />
      </Box>
      <Box
        sx={{
          display: active === 2 ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AdminProductsView />
      </Box>
      <Box
        sx={{
          display: active === 3 ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AllPaidProducts />
      </Box>
      <Box
        sx={{
          display: active === 4 ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AllUsers />
      </Box>
    </Container>
  );
};

export default AdminDashboardSection;
