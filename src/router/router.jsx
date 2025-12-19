import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../pages/Dashboard/MainDashboard/MainDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <MainDashboard></MainDashboard>,
      },
    ],
  },
]);
