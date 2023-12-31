import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux";
import { add, deleteUser } from "../store/features/userSlice";
import { updateUser } from "../store/features/updateSlice";

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const data = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  type User = data;

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://dashboardbackend.akashjayaraj.repl.co/users"
      );
      console.log(response.data.data);
      dispatch(add(response.data.data));

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteHandle = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `https://dashboardbackend.akashjayaraj.repl.co/user/${id}`
      );
      console.log(`Deleted user with ID ${id}`, response.data);
      setIsLoading(false);

      dispatch(deleteUser(id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setIsLoading(false);
    }
  };

  const updateHandle = async (user: User) => {
    dispatch(updateUser(user));
    setSelectedUser(user);
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <p className="text-xl font-semibold mb-4 col-span-full text-center">
        Total number of users: {data.length}
      </p>
      {data ? (
        data.map((user: User, index: number) => (
          <div
            key={index}
            className="bg-white shadow-md p-4 md:w-64 lg:w-72 xl:w-80"
          >
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
