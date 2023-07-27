import React, { useState, useEffect } from "react";
import axios from "axios";
import Register from "./Register.tsx";

const Dashboard = () => {
  const updateHandle = async (id) => {
    try {
      const response = await axios.patch(
        `https://dashboardbackend.akashjayaraj.repl.co/user/${id}`,
        {}
      );
    } catch (error) {}
  };

  return (
    <>
      <form>
        <label>First Name :</label>
        <input type="text" className="border border-black" />

        <label>Last Name :</label>
        <input type="text" className="border border-black" />

        <label>Email :</label>
        <input type="text" className="border border-black" />

        <label>Phone :</label>
        <input type="number" className="border border-black" />

        <label>Age :</label>
        <input type="number" className="border border-black" />

        <input type="submit" className="border border-black" />
      </form>
    </>
  );
};

export default Dashboard;
