import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div>
      {name}
      <p>{email}</p>
    </div>
  );
};

export default UserDashboardSection;
