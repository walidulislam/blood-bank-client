import React, { use } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, NavLink } from "react-router";
import logo from "/blood.png";

const Navbar = () => {
  const { user, loading } = use(AuthContext);

  return (
    <div className="navbar bg-red-50 rounded-2xl shadow-lg px-4 md:px-10 lg:px-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-red-500 border-1 border-red-200" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/donation-requests"
                className={({ isActive }) =>
                  isActive ? "text-red-500 border-1 border-red-200" : ""
                }
              >
                Donation Requests
              </NavLink>
            </li>

            {user && (
              <li>
                <NavLink
                  to="/funding"
                  className={({ isActive }) =>
                    isActive ? "text-red-500 border-1 border-red-200" : ""
                  }
                >
                  Funding
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="flex items-center">
          <img className="w-12" src={logo} alt="" />
          <h2 className="font-bold text-xl text-red-600">
            Blood<span className="text-red-900">Bank</span>
          </h2>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-red-500 border-1 border-red-200" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/donation-requests"
              className={({ isActive }) =>
                isActive ? "text-red-500 border-1 border-red-200" : ""
              }
            >
              Donation Requests
            </NavLink>
          </li>

          {user && (
            <li>
              <NavLink
                to="/funding"
                className={({ isActive }) =>
                  isActive ? "text-red-500 border-1 border-red-200" : ""
                }
              >
                Funding
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {loading ? (
          <div className="flex items-center justify-center min-h-[50px]">
            <div
              className="relative w-12 h-12 text-[#002D5A]"
              aria-label="Loading"
              role="status"
            >
              <div className="absolute inset-0 rounded-full blur-md opacity-20 bg-gradient-to-tr from-[#002D5A] via-[#0892A5] to-[#C9910D]"></div>

              <svg viewBox="0 0 120 120" className="relative w-full h-full">
                <g className="origin-center animate-[spin_8s_linear_infinite]">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    className="fill-none"
                    stroke="currentColor"
                    strokeWidth="3"
                    opacity="0.25"
                  ></circle>

                  <g
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.6"
                  >
                    <g className="origin-center">
                      <line x1="60" y1="6" x2="60" y2="12"></line>
                      <line x1="60" y1="108" x2="60" y2="114"></line>
                      <line x1="6" y1="60" x2="12" y2="60"></line>
                      <line x1="108" y1="60" x2="114" y2="60"></line>
                    </g>

                    <g>
                      <g className="origin-center">
                        <line x1="60" y1="8" x2="60" y2="12"></line>
                      </g>
                      <g className="origin-center rotate-45">
                        <line x1="60" y1="8" x2="60" y2="12"></line>
                      </g>
                      <g className="origin-center rotate-90">
                        <line x1="60" y1="8" x2="60" y2="12"></line>
                      </g>
                      <g className="origin-center rotate-[135deg]">
                        <line x1="60" y1="8" x2="60" y2="12"></line>
                      </g>
                      <g className="origin-center rotate-[22.5deg]">
                        <line x1="60" y1="8" x2="60" y2="12"></line>
                      </g>
                      <g className="origin-center rotate-[67.5deg]">
                        <line x1="60" y1="8" x2="60" y2="12"></line>
                      </g>
                      <g className="origin-center rotate-[112.5deg]">
                        <line x1="60" y1="8" x2="60" y2="12"></line>
                      </g>
                      <g className="origin-center rotate-[157.5deg]">
                        <line x1="60" y1="8" x2="60" y2="12"></line>
                      </g>
                    </g>
                  </g>
                </g>

                <g className="origin-center animate-[spin_5s_linear_infinite_reverse]">
                  <polygon
                    points="60,22 66,60 60,98 54,60"
                    fill="#C9910D"
                    opacity="0.95"
                  ></polygon>
                  <polygon
                    points="22,60 60,66 98,60 60,54"
                    fill="#0892A5"
                    opacity="0.9"
                  ></polygon>
                  <circle
                    cx="60"
                    cy="60"
                    r="6"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></circle>
                </g>

                <g className="origin-center animate-[swing_1.8s_ease-in-out_infinite]">
                  <line
                    x1="60"
                    y1="60"
                    x2="60"
                    y2="18"
                    stroke="#C9910D"
                    strokeWidth="3"
                    strokeLinecap="round"
                  ></line>
                  <circle cx="60" cy="60" r="3" fill="#C9910D"></circle>
                </g>

                <g className="origin-center">
                  <path
                    d="M12 82 Q 24 76 36 82 T 60 82 T 84 82 T 108 82"
                    fill="none"
                    stroke="#0892A5"
                    strokeWidth="3"
                    className="animate-[waveDash_2.2s_linear_infinite]"
                  ></path>
                  <path
                    d="M12 90 Q 24 84 36 90 T 60 90 T 84 90 T 108 90"
                    fill="none"
                    stroke="#4E3822"
                    strokeWidth="2"
                    opacity="0.4"
                    className="animate-[waveDash_3s_linear_infinite, bob_2.4s_ease-in-out_infinite]"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <img
              tabIndex={0}
              className="h-12 w-12 mx-auto rounded-full border-gray-300 border-2 shadow-md shadow-cyan-800 cursor-pointer "
              src={user?.photoURL || "https://avatar.iran.liara.run/public/3"}
            />
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-gradient-to-br from-purple-800 via-indigo-600 to-purple-900 rounded-box z-50 w-60 p-3 shadow-lg space-y-1.5"
            >
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 border-1 border-red-200"
                    : "text-white"
                }
              >
                Dashboard
              </NavLink>
              <button className="button">
                <span className="text">Logout</span>
              </button>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="button">
              <span className="text">Login</span>
            </Link>
            <Link to="/signup" className="button">
              <span className="text">Signup</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
