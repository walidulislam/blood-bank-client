import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaEllipsisV,
  FaUserShield,
  FaBan,
  FaCheckCircle,
  FaUserPlus,
} from "react-icons/fa";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchUsers = () => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  };
  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);
  const handelStatusChange = (email, status) => {
    axiosSecure
      .patch(`/update/email/status?email=${email}&status=${status}`)
      .then(() => {
        setActiveMenu(null);
        fetchUsers();
      });
  };
  const handleRoleChange = (email, role) => {
    axiosSecure
      .patch(`/update/email/role?email=${email}&role=${role}`)
      .then(() => {
        setActiveMenu(null);
        fetchUsers();
      });
  };
  const filteredUsers = users.filter((user) => {
    if (filterStatus === "all") return true;
    return user.status === filterStatus;
  });
  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-800">
              All <span className="text-red-600">Users</span>
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Showing registered members from database
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Filter status:
            </span>
            <select
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    User Info
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Blood
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Location
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Role
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Status
                  </th>
                  <th className="p-6 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-red-50/20 transition-colors"
                  >
                    {/* User Info */}
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={user.photoURL}
                          className="w-12 h-12 rounded-2xl object-cover shadow-sm border border-white"
                          alt=""
                        />
                        <div>
                          <p className="font-bold text-gray-800">
                            {user.displayName}
                          </p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-6">
                      <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg font-black text-xs border border-red-100">
                        {user.blood}
                      </span>
                    </td>

                    <td className="p-6">
                      <p className="text-sm font-bold text-gray-600">
                        {user.district}
                      </p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
                        {user.upazila}
                      </p>
                    </td>

                    <td className="p-6">
                      <span
                        className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role || "donor"}
                      </span>
                    </td>

                    <td className="p-6">
                      <span
                        className={`flex items-center gap-1.5 text-xs font-bold ${
                          user.status === "blocked"
                            ? "text-red-500"
                            : "text-emerald-500"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            user.status === "blocked"
                              ? "bg-red-500"
                              : "bg-emerald-500"
                          }`}
                        ></span>
                        {user.status || "active"}
                      </span>
                    </td>
                    <td className="p-6 text-right relative">
                      <button
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === user._id ? null : user._id
                          )
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-all"
                      >
                        <FaEllipsisV />
                      </button>
                      {activeMenu === user._id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActiveMenu(null)}
                          ></div>
                          <div className="absolute right-14 top-0 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            {user.status === "blocked" ? (
                              <button
                                onClick={() =>
                                  handelStatusChange(user?.email, "active")
                                }
                                className="w-full px-4 py-2 text-left text-xs font-bold text-emerald-500 hover:bg-emerald-50 flex items-center gap-2"
                              >
                                <FaCheckCircle size={14} /> Unblock User
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handelStatusChange(user?.email, "blocked")
                                }
                                className="w-full px-4 py-2 text-left text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2"
                              >
                                <FaBan size={14} /> Block User
                              </button>
                            )}
                            {user.role === "donor" && (
                              <button
                                onClick={() =>
                                  handleRoleChange(user?.email, "volunteer")
                                }
                                className="w-full px-4 py-2 text-left text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2 border-t border-gray-50"
                              >
                                <FaUserPlus size={14} /> Make Volunteer
                              </button>
                            )}
                            {user.role !== "admin" && (
                              <button
                                onClick={() =>
                                  handleRoleChange(user?.email, "admin")
                                }
                                className="w-full px-4 py-2 text-left text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <FaUserShield size={14} /> Make Admin
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
