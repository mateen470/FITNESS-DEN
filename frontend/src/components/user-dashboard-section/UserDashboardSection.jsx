import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
const UserDashboardSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const getUser = await axios.get("auth-user");
        setName(getUser.data.data._doc.name);
        setEmail(getUser.data.data._doc.email);
        if (getUser.data.data._doc.role === 1) {
          navigate("/admin");
        } else if (getUser.data.data._doc.role === 2) {
          navigate("/trainer");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [navigate]);
  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
      <NavLink to={"/view-diet-plan"}>ViewDietPlan</NavLink>
      <NavLink to={"/view-workout-plann"}>ViewWorkoutPlan</NavLink>
    </div>
  );
};

export default UserDashboardSection;
