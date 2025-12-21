import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  FaHeartbeat,
  FaHospital,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [requestData, setRequestData] = useState({});
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) => setDistricts(res.data.districts));
    axios.get("/upazilas.json").then((res) => setUpazilas(res.data.upazilas));

    axiosSecure.get(`/requests/${id}`).then((res) => {
      setRequestData(res.data);
      setLoading(false);
    });
  }, [id, axiosSecure]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedInfo = {
      recipientName: form.recipientName.value,
      recipientDistrict: form.district.value,
      recipientUpazila: form.upazila.value,
      hospitalName: form.hospital.value,
      fullAddress: form.address.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.date.value,
      donationTime: form.time.value,
      requestMessage: form.message.value,
    };

    axiosSecure.put(`/requests/${id}`, updatedInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Update Successful..🌸",
          icon: "success",
          draggable: true,
        });
        navigate("/dashboard/my-donation-requests");
      }
    });
  };

  if (loading)
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight flex items-center gap-3">
          <FaHeartbeat className="text-red-600 animate-pulse" /> Update Donation
          Request
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Edit the form accurately to update your donation request.
        </p>
      </div>
      <form
        onSubmit={handleUpdate}
        className="bg-white rounded-[2.5rem] shadow-lg border-3 border-red-50 p-8 lg:p-12 relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <FaUser className="text-red-400" /> Requester Name
            </label>
            <input
              type="text"
              readOnly
              defaultValue={requestData?.requesterName}
              className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-500 font-medium outline-none cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <FaEnvelope className="text-red-400" /> Requester Email
            </label>
            <input
              type="email"
              readOnly
              defaultValue={requestData?.requesterEmail}
              className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-500 font-medium outline-none cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1">
              Recipient Name
            </label>
            <input
              required
              name="recipientName"
              defaultValue={requestData?.recipientName}
              type="text"
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1">
              Blood Group Needed
            </label>
            <select
              required
              name="bloodGroup"
              defaultValue={requestData?.bloodGroup}
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all outline-none appearance-none bg-white"
            >
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-400" /> Recipient District
            </label>
            <select
              name="district"
              defaultValue={requestData?.recipientDistrict}
              required
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all outline-none bg-white"
            >
              {districts.map((d) => (
                <option value={d?.name} key={d.id}>
                  {d?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-400" /> Recipient Upazila
            </label>
            <select
              name="upazila"
              defaultValue={requestData?.recipientUpazila}
              required
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all outline-none bg-white"
            >
              {upazilas.map((u) => (
                <option value={u?.name} key={u.id}>
                  {u?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1 flex items-center gap-2">
              <FaHospital className="text-red-400" /> Hospital Name
            </label>
            <input
              required
              name="hospital"
              defaultValue={requestData?.hospitalName}
              type="text"
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1">
              Full Address Line
            </label>
            <input
              required
              name="address"
              defaultValue={requestData?.fullAddress}
              type="text"
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1 flex items-center gap-2">
              <FaCalendarAlt className="text-red-400" /> Donation Date
            </label>
            <input
              required
              name="date"
              type="date"
              defaultValue={requestData?.donationDate}
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1 flex items-center gap-2">
              <FaClock className="text-red-400" /> Donation Time
            </label>
            <input
              required
              name="time"
              type="time"
              defaultValue={requestData?.donationTime}
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all outline-none"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1">
              Request Message
            </label>
            <textarea
              required
              name="message"
              defaultValue={requestData?.requestMessage}
              rows="4"
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all outline-none resize-none"
            ></textarea>
          </div>
        </div>
        <div className="mt-12">
          <button
            type="submit"
            className="w-full md:w-auto px-10 py-4 bg-red-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-200 hover:bg-red-800 hover:-translate-y-1 transition-all duration-300"
          >
            Update Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRequest;
