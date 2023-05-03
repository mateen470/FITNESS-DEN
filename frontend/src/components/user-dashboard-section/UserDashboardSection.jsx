import React, { useEffect, useState } from "react";
import axios from "axios";
const UserDashboardSection = () => {
  const [name, setName] = useState("NOT LOGGED IN!!");
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/fitness-den/auth-user"
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return <div>{name}</div>;
};

export default UserDashboardSection;
