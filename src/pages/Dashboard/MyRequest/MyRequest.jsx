import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaTrash, FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
const MyRequest = () => {
  const [totalRequest, setTotalRequest] = useState(0);
  const [myRequests, setMyRequests] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");
  const axiosSecure = useAxiosSecure();

  const fetchRequests = () => {
    axiosSecure
      .get(
        `/my-request?page=${currentPage}&size=${itemsPerPage}&status=${filterStatus}`
      )
      .then((res) => {
        setMyRequests(res.data.result);
        setTotalRequest(res.data.totalRequest);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, [axiosSecure, currentPage, itemsPerPage, filterStatus]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/requests/status/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        fetchRequests();
      }
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

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
            fetchRequests();
          }
        } catch (err) {
          Swal.fire("Failed to delete request.", err.massage);
        }
      }
    });
  };

  const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-800">
              My Donation <span className="text-red-600">Requests</span>
            </h1>
            <p className="text-gray-500 font-medium">
              Manage your blood donation requests
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Filter by:
            </span>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(0);
              }}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>
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
                {myRequests.map((request) => (
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
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest 
                        ${
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
                            {request.donorName}
                          </p>
                          <p className="text-gray-400">{request.donorEmail}</p>
                        </div>
                      ) : (
                        <span className="text-gray-300">---</span>
                      )}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        {request.status === "inprogress" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(request._id, "done")
                              }
                              title="Done"
                              className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-all"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(request._id, "canceled")
                              }
                              title="Cancel"
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                        <Link
                          to={`/dashboard/update-request/${request._id}`}
                          title="Edit"
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
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
                          title="View"
                          className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-all"
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
        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold hover:bg-red-600 hover:text-white disabled:opacity-50 transition-all shadow-sm"
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-xl text-sm font-bold transition-all shadow-sm
                ${
                  currentPage === page
                    ? "bg-red-600 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-red-50"
                }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            disabled={currentPage === numberOfPages - 1}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold hover:bg-red-600 hover:text-white disabled:opacity-50 transition-all shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyRequest;
