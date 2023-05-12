import React, { useEffect, useState } from "react";
import axios from "axios";
import DietPlanUpdateRequestModal from "../update-req-modal/DietPlanUpdateRequestModal";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const ViewDietPlan = () => {
  const [DietPlan, setDietPlan] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState([]);
  const FetchDietPlan = () => {
    axios.get("diet/all-diet-plans").then((res) => setDietPlan(res.data.data));
  };

  useEffect(FetchDietPlan, []);
  const handleDay = (index) => {
    switch (index) {
      case 0:
        return (
          <td
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.8rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Monday
          </td>
        );
      case 1:
        return (
          <td
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.8rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Tuesday
          </td>
        );
      case 2:
        return (
          <td
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.8rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Wednesday
          </td>
        );
      case 3:
        return (
          <td
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.8rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Thursday
          </td>
        );
      case 4:
        return (
          <td
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.8rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Friday
          </td>
        );
      case 5:
        return (
          <td
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.8rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Saturday
          </td>
        );
      case 6:
        return (
          <td
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.8rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Sunday
          </td>
        );
      default:
        return <td></td>;
    }
  };
  return (
    <Container>
      {modalOpen && (
        <DietPlanUpdateRequestModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          Plan={DietPlan[index]}
        />
      )}
      {DietPlan.map((item, idx) => (
        <>
          {item.DietPlan.map((i, key) => (
            <>
              <Typography
                color={"white"}
                fontSize={"5.5vh"}
                fontFamily={"Comme, sans-serif"}
                fontWeight={800}
                key={key}
              >
                Week {key + 1}
              </Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "2rem",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      Breakfast
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "2rem",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      Lunch
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "2rem",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      Dinner
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {i.map((x, j) => (
                    <TableRow>
                      {handleDay(j)}

                      <TableCell
                        sx={{
                          color: "white",
                          fontSize: "1.5rem",
                          fontFamily: "Comme, sans-serif",
                        }}
                      >
                        {x.BreakFast}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontSize: "1.5rem",
                          fontFamily: "Comme, sans-serif",
                        }}
                      >
                        {x.Lunch}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontSize: "1.5rem",
                          fontFamily: "Comme, sans-serif",
                        }}
                      >
                        {x.Dinner}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button
                onClick={() => {
                  setIndex(idx);
                  setModalOpen(true);
                }}
                sx={{
                  background: "white",
                  color: "black",
                  textAlign: "center",
                }}
              >
                Update Plan
              </Button>
            </>
          ))}
        </>
      ))}
    </Container>
  );
};

export default ViewDietPlan;
