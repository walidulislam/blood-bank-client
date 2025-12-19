import React, { use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  FaUser,
  FaPlusCircle,
  FaList,
  FaUsers,
  FaHandHoldingHeart,
  FaSignOutAlt,
  FaThLarge,
} from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import logo from "/blood.png";

const Aside = () => {
  const { role, logOutUser } = use(AuthContext);
  const navigate = useNavigate();
  const handelLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("LogOut Successful..➜]");
        navigate("/");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <aside className="w-full h-full bg-white flex flex-col border-r border-gray-100 shadow-sm">
      <Link to="/" className="py-12 px-8 flex items-center gap-2">
        <img className="w-12" src={logo} alt="" />
        <h1 className="text-2xl font-black text-gray-800 tracking-tighter">
          Blood<span className="text-red-600 font-extrabold">Bank</span>
        </h1>
      </Link>
      <nav className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-6 mb-4 opacity-70">
          Main Menu
        </p>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold mb-2 ${
              isActive
                ? "bg-red-600 text-white shadow-xl shadow-red-200"
                : "text-gray-500 hover:bg-red-50 hover:text-red-600"
            }`
          }
        >
          <FaUser className="text-lg" /> <span>Profile</span>
        </NavLink>
        <div className="h-px bg-gray-50 mx-6 my-4"></div>
        {role === "donor" && (
          <>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold mb-2 ${
                  isActive
                    ? "bg-red-600 text-white shadow-xl shadow-red-200"
                    : "text-gray-500 hover:bg-red-50 hover:text-red-600"
                }`
              }
            >
              <FaThLarge className="text-lg" /> <span>Dashboard Home</span>
            </NavLink>
            <NavLink
              to="/dashboard/my-donation-requests"
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold mb-2 ${
                  isActive
                    ? "bg-red-600 text-white shadow-xl shadow-red-200"
                    : "text-gray-500 hover:bg-red-50 hover:text-red-600"
                }`
              }
            >
              <FaList className="text-lg" /> <span>My Requests</span>
            </NavLink>
            <NavLink
              to="/dashboard/create-donation-request"
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold mb-2 ${
                  isActive
                    ? "bg-red-600 text-white shadow-xl shadow-red-200"
                    : "text-gray-500 hover:bg-red-50 hover:text-red-600"
                }`
              }
            >
              <FaPlusCircle className="text-lg" /> <span>Create Request</span>
            </NavLink>
          </>
        )}
        {role === "admin" && (
          <>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold mb-2 ${
                  isActive
                    ? "bg-red-600 text-white shadow-xl shadow-red-200"
                    : "text-gray-500 hover:bg-red-50 hover:text-red-600"
                }`
              }
            >
              <FaThLarge className="text-lg" /> <span>Dashboard Home</span>
            </NavLink>
            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold mb-2 ${
                  isActive
                    ? "bg-red-600 text-white shadow-xl shadow-red-200"
                    : "text-gray-500 hover:bg-red-50 hover:text-red-600"
                }`
              }
            >
              <FaUsers className="text-lg" /> <span>All Users</span>
            </NavLink>
            <NavLink
              to="/dashboard/all-blood-donation-request"
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold mb-2 ${
                  isActive
                    ? "bg-red-600 text-white shadow-xl shadow-red-200"
                    : "text-gray-500 hover:bg-red-50 hover:text-red-600"
                }`
              }
            >
              <FaHandHoldingHeart className="text-lg" />{" "}
              <span>All Requests</span>
            </NavLink>
          </>
        )}
        {role === "volunteer" && (
          <>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold mb-2 ${
                  isActive
                    ? "bg-red-600 text-white shadow-xl shadow-red-200"
                    : "text-gray-500 hover:bg-red-50 hover:text-red-600"
                }`
              }
            >
              <FaThLarge className="text-lg" /> <span>Dashboard Home</span>
            </NavLink>
            <NavLink
              to="/dashboard/all-blood-donation-request"
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold mb-2 ${
                  isActive
                    ? "bg-red-600 text-white shadow-xl shadow-red-200"
                    : "text-gray-500 hover:bg-red-50 hover:text-red-600"
                }`
              }
            >
              <FaHandHoldingHeart className="text-lg" />{" "}
              <span>All Requests</span>
            </NavLink>
          </>
        )}
      </nav>
      <div className="p-6">
        <button
          onClick={handelLogOut}
          className="flex items-center gap-4 px-6 py-4 w-full text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 font-bold group"
        >
          <FaSignOutAlt className="text-lg group-hover:translate-x-1 transition-transform" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Aside;
