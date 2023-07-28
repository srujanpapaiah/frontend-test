import React, { useState, useEffect } from "react";
import axios from "axios";
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/features/userSlice";
import { updateUser } from "../store/features/updateSlice";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const data = useSelector((state) => state.user);
  const updateData = useSelector((state) => state.update);

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
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateHandle = async (user) => {
    dispatch(updateUser(user));
    setSelectedUser(user);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data && data[0] ? (
        data[0].map((user, index) => (
          <div key={index} className="bg-white shadow-md p-4">
            <div>
              <p className="text-xl font-semibold">
                Name: {user.firstName} {user.lastName}
              </p>
              <p>Phone: {user.phoneNumber}</p>
              <p>Age: {user.age}</p>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mr-2"
                  onClick={() => deleteHandle(user._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
                  onClick={() => updateHandle(user)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
      <Register updateHandle={updateHandle} updateUser={selectedUser} />
    </div>
  );
};

export default Dashboard;
