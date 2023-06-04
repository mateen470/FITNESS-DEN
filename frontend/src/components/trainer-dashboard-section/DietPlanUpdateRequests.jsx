import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsNewDietPlanUpdateRequests } from "../../context/CheckForNewPlanRequests";
import { GetDietPlanId } from "../../context/UpdatePlan";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";

const DietPlanUpdateRequests = () => {
  const dispatch = useDispatch();
  const [DietPlanUpdateRequests, setDietPlanUpdateRequests] = useState([]);

  const FetchUpdateRequests = () => {
    axios
      .get("diet/all-diet-update-request")
      .then((res) => setDietPlanUpdateRequests(res.data.data));
  };
  useEffect(() => {
    FetchUpdateRequests();
    dispatch(setIsNewDietPlanUpdateRequests(false));
  }, []);
  return (
    <Container>
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/trainer"}>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            sx={{ display: "flex", alignItems: "center", fontSize: "1.7vw" }}
          >
            <KeyboardDoubleArrowLeftIcon /> Back
          </Typography>
        </NavLink>
      </Box>
      <Typography
        fontSize={"4.5vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        my={4}
      >
        All Diet Plan Update Requests
      </Typography>
      <Table sx={{ mb: 10 }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "5vh",
                fontFamily: "Comme, sans-serif",
              }}
            >
              ID
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "5vh",
                fontFamily: "Comme, sans-serif",
              }}
            >
              Description
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "5vh",
                fontFamily: "Comme, sans-serif",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {DietPlanUpdateRequests.map((item, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "2rem",
                  fontFamily: "Comme, sans-serif",
                }}
              >
                {index + 1}
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "5vh",
                  fontFamily: "Comme, sans-serif",
                }}
              >
                {item.Description}
              </TableCell>
              <TableCell>
                <Button>
                  <NavLink to="/update-diet-plan">
                    <VisibilityRoundedIcon
                      onClick={() =>
                        dispatch(
                          GetDietPlanId(
                            JSON.stringify({
                              PlanId: item.PlanID,
                              ReqId: item._id,
                            })
                          )
                        )
                      }
                      sx={{ color: "white", fontSize: "6vh" }}
                    />
                  </NavLink>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default DietPlanUpdateRequests;
