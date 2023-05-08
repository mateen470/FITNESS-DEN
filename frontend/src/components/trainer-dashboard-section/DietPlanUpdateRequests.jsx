import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetDietPlanId } from "../../context/UpdatePlan";
import {
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const DietPlanUpdateRequests = () => {
  const dispatch = useDispatch();
  const [DietPlanUpdateRequests, setDietPlanUpdateRequests] = useState([]);
  const FetchUpdateRequests = () => {
    axios
      .get("http://localhost:8000/dietplans/updateDietPlan")
      .then((res) => setDietPlanUpdateRequests(res.data));
  };

  useEffect(FetchUpdateRequests, []);
  return (
    <Container>
      <Card
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center", fontWeight: "800" }}>
                ID
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "800" }}>
                Description
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "800" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DietPlanUpdateRequests.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ textAlign: "center" }}>{item._id}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {item.Description}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button variant="contained">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
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
                      to="/updateDietPlan"
                    >
                      Update
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};

export default DietPlanUpdateRequests;
