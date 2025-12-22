import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaUsers,
  FaHeartbeat,
  FaHandHoldingUsd,
  FaEdit,
  FaEye,
  FaCheck,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { FaBurn } from "react-icons/fa";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MainDashboard = () => {
  const { user, role } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalFunding: 0,
    totalRequests: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);

  const fetchDashboardData = () => {
    if (role === "admin" || role === "volunteer") {
      axiosSecure.get("/admin-stats").then((res) => {
        setStats(res.data);
      });
    }

    if (role === "donor") {
      axiosSecure.get("/my-request?page=0&size=3&status=all").then((res) => {
        setRecentRequests(res.data?.result || []);
      });
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [axiosSecure, role]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/requests/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your request has been deleted.", "success");
            fetchDashboardData();
          }
        } catch (err) {
          Swal.fire("Failed to delete request.", err.message);
        }
      }
    });
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-red-50 rounded-4xl">
      <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-10">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Welcome back,{" "}
            <span className="text-red-100">{user?.displayName}</span>!
          </h1>
          <p className="mt-3 text-red-100 font-medium text-lg opacity-90">
            You are logged in as a{" "}
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm uppercase font-bold">
              {role}
            </span>
          </p>
        </div>
        <FaBurn className="absolute right-[-20px] bottom-[-20px] text-white/10 text-[15rem] rotate-12" />
      </div>
      {(role === "admin" || role === "volunteer") && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="text-4xl text-red-500 bg-red-50 p-4 rounded-2xl">
              <FaUsers />
            </div>
            <div>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                Total Donors
              </p>
              <p className="text-3xl font-black text-gray-800">
                {stats.totalDonors}
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="text-4xl text-green-500 bg-green-50 p-4 rounded-2xl">
              <FaHandHoldingUsd />
            </div>
            <div>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                Total Funding
              </p>
              <p className="text-3xl font-black text-gray-800">
                ${stats.totalFunding}
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="text-4xl text-blue-500 bg-blue-50 p-4 rounded-2xl">
              <FaHeartbeat />
            </div>
            <div>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                Total Requests
              </p>
              <p className="text-3xl font-black text-gray-800">
                {stats.totalRequests}
              </p>
            </div>
          </div>
        </div>
      )}
      {role === "donor" && recentRequests.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-gray-800">
            Recent Donation Requests
          </h2>
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="p-6 text-[10px] font-black uppercase text-gray-400">
                      Recipient
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase text-gray-400">
                      Location
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase text-gray-400">
                      Date & Time
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase text-gray-400">
                      Status
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase text-gray-400">
                      Donor Info
                    </th>
                    <th className="p-6 text-right text-[10px] font-black uppercase text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentRequests.map((request) => (
                    <tr
                      key={request._id}
                      className="hover:bg-red-50/20 transition-colors"
                    >
                      <td className="p-6">
                        <p className="font-bold text-gray-800">
                          {request.recipientName}
                        </p>
                        <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-md font-black">
                          {request.bloodGroup}
                        </span>
                      </td>
                      <td className="p-6">
                        <p className="text-sm font-bold text-gray-600">
                          {request.recipientDistrict}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {request.recipientUpazila}
                        </p>
                      </td>
                      <td className="p-6">
                        <p className="text-sm font-bold text-gray-600">
                          {request.donationDate}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {request.donationTime}
                        </p>
                      </td>
                      <td className="p-6">
                        <span
                          className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            request.status === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : request.status === "inprogress"
                              ? "bg-blue-100 text-blue-600"
                              : request.status === "done"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="p-6 text-xs">
                        {request.status === "inprogress" ? (
                          <div>
                            <p className="font-bold text-gray-700">
                              {request.donorName || "N/A"}
                            </p>
                            <p className="text-gray-400">
                              {request.donorEmail || "N/A"}
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-300">---</span>
                        )}
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2">
                          {request.status === "inprogress" && (
                            <>
                              <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg">
                                <FaCheck />
                              </button>
                              <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                <FaTimes />
                              </button>
                            </>
                          )}
                          <Link
                            to={`/dashboard/update-request/${request._id}`}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(request._id)}
                            title="Delete"
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <FaTrash />
                          </button>
                          <Link
                            to={`/donation-details/${request._id}`}
                            className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
                          >
                            <FaEye />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/dashboard/my-donation-requests">
              <button className="bg-gray-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg">
                View My All Request
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainDashboard;
