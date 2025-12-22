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
import Search from "../pages/Dashboard/Search/Search";
import DonationRequests from "../pages/DonationRequests/DonationRequests";
import DonationDetails from "../pages/DonationDetails/DonationDetails";
import AllRequest from "../pages/Dashboard/AllRequest/AllRequest";

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
      {
        path: "/search",
        Component: Search,
      },
      {
        path: "/donation-requests",
        Component: DonationRequests,
      },
      {
        path: "/donation-details/:id",
        element: (
          <PrivateRoutes>
            <DonationDetails />
          </PrivateRoutes>
        ),
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
        path: "all-blood-donation-request",
        Component: AllRequest,
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
