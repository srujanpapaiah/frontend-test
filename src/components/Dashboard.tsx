import React, { useState, useEffect } from "react";
import axios from "axios";
import Register from "./Register.tsx";
import { useDispatch, useSelector } from "react-redux";
import { add, update } from "../store/features/userSlice.js";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null); // State to store the ID of the selected user

  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://dashboardbackend.akashjayaraj.repl.co/users"
      );
      dispatch(add(response.data.data));

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);

  const deleteHandle = async (id) => {
    try {
      const response = await axios.delete(
        `https://dashboardbackend.akashjayaraj.repl.co/user/${id}`
      );
      console.log(`Deleted user with ID ${id}`, response.data);
      // I have to update the data in the Redux store to reflect the changes
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateHandle = async (user) => {
    dispatch(update(user));
    setSelectedUser(user);
    setSelectedUserId(user._id);
  };

  return (
    <>
      {data && data[0] ? (
        data[0].map((user, index) => (
          <div className="" key={index}>
            <div className="">
              <p className="">
                Name: {user.firstName} {user.lastName}
              </p>
              <p>Phone: {user.phoneNumber}</p>
              <p>Age: {user.age}</p>
              <button onClick={() => deleteHandle(user._id)}>Delete</button>
              <button onClick={() => updateHandle(user)}>Update</button>
            </div>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
      <Register selectedUser={selectedUser} updateHandle={updateHandle} />
    </>
  );
};

export default Dashboard;
