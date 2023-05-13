import React from "react";
import { NavLink } from "react-router-dom";
const AdminDashboardSection = () => {
  return (
    <div>
      ADMIN
      <NavLink to={"/stats-for-admin"}>check Stats</NavLink>
    </div>
  );
};

export default AdminDashboardSection;
