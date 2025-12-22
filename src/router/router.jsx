import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../pages/Dashboard/MainDashboard/MainDashboard";
import PrivateRoutes from "./PrivateRoutes";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import CreateRequest from "../pages/Dashboard/CreateRequest/CreateRequest";
import MyRequest from "../pages/Dashboard/MyRequest/MyRequest";
import UpdateRequest from "../pages/Dashboard/UpdateRequest/UpdateRequest";
import Profile from "../pages/Dashboard/Profile/Profile";

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
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <MainDashboard></MainDashboard>,
      },
      {
        path: "all-users",
        Component: AllUsers,
      },
      {
        path: "create-donation-request",
        Component: CreateRequest,
      },
      {
        path: "my-donation-requests",
        Component: MyRequest,
      },
      {
        path: "update-request/:id",
        Component: UpdateRequest,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
]);
