import axios from "axios";
import React, { useEffect, useState } from "react";
import DietPlanUpdateRequestModal from "../../components/update-req-modal/DietPlanUpdateRequestModal";
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

const ViewDietPlanPage = () => {
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
        return <td>Monday</td>;
      case 1:
        return <td>Tuesday</td>;
      case 2:
        return <td>Wednesday</td>;
      case 3:
        return <td>Thursday</td>;
      case 4:
        return <td>Friday</td>;
      case 5:
        return <td>Saturday</td>;
      case 6:
        return <td>Sunday</td>;
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
              <Typography>Week {key + 1}</Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Breakfast</TableCell>
                    <TableCell>Lunch</TableCell>
                    <TableCell>Dinner</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {i.map((x, j) => (
                    <TableRow>
                      {handleDay(j)}

                      <TableCell>{x.BreakFast}</TableCell>
                      <TableCell>{x.Lunch}</TableCell>
                      <TableCell>{x.Dinner}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button
                onClick={() => {
                  setIndex(idx);
                  setModalOpen(true);
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

export default ViewDietPlanPage;
