import React from "react";
import Dashboard from "./components/Dashboard.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Update from "./components/Update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/update",
    element: <Update />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
