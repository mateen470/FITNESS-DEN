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
import { useSelector } from "react-redux";

const ViewDietPlanPage = () => {
  const [DietPlan, setDietPlan] = useState([]);
  const [ResponseFromDB, setResponseFromDB] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const IDofCurrentUser = useSelector(
    (state) => state.CurrentUser.CurrentUserID
  );
  const FetchDietPlan = () => {
    axios.get("diet/all-diet-plans/" + IDofCurrentUser).then((res) => {
      setDietPlan(res.data.data.DietPlan);
      setResponseFromDB(res.data.data);
    });
  };
  console.log(DietPlan);
  useEffect(FetchDietPlan, []);
  const handleDay = (index) => {
    switch (index) {
      case 0:
        return <TableCell>Monday</TableCell>;
      case 1:
        return <TableCell>Tuesday</TableCell>;
      case 2:
        return <TableCell>Wednesday</TableCell>;
      case 3:
        return <TableCell>Thursday</TableCell>;
      case 4:
        return <TableCell>Friday</TableCell>;
      case 5:
        return <TableCell>Saturday</TableCell>;
      case 6:
        return <TableCell>Sunday</TableCell>;
      default:
        return <TableCell></TableCell>;
    }
  };
  return (
    <Container>
      {modalOpen && (
        <DietPlanUpdateRequestModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          Plan={ResponseFromDB}
        />
      )}
      {DietPlan.map((item, index) => (
        <>
          <Typography>Week {index + 1}</Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Breakfast</TableCell>
                <TableCell>Lunch</TableCell>
                <TableCell>Dinner</TableCell>
              </TableRow>
            </TableHead>

            {item.map((i, key) => (
              <TableBody>
                {handleDay(key)}
                <TableCell>{i.BreakFast}</TableCell>
                <TableCell>{i.Lunch}</TableCell>
                <TableCell>{i.Dinner}</TableCell>
              </TableBody>
            ))}
          </Table>
        </>
      ))}
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Update Plan
      </Button>
    </Container>
  );
};

export default ViewDietPlanPage;
