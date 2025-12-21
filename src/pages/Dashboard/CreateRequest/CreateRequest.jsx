import React, { use, useEffect, useState } from "react";
import {
  FaHeartbeat,
  FaHospital,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CreateRequest = () => {
  const { user } = use(AuthContext);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipientName = e.target.recipientName.value;
    const recipientDistrict = e.target.district.value;
    const recipientUpazila = e.target.upazila.value;
    const hospitalName = e.target.hospital.value;
    const fullAddress = e.target.address.value;
    const bloodGroup = e.target.bloodGroup.value;
    const donationDate = e.target.date.value;
    const donationTime = e.target.time.value;
    const requestMessage = e.target.message.value;

    const requestData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName,
      recipientDistrict,
      recipientUpazila,
      hospitalName,
      fullAddress,
      bloodGroup,
      donationDate,
      donationTime,
      requestMessage,
      status: "pending",
    };

    axiosSecure
      .post("http://localhost:3000/requests", requestData)
      .then(() => {
        Swal.fire({
          title: "Request Add Successful..🌸",
          icon: "success",
          draggable: true,
        });
        e.target.reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight flex items-center gap-3">
          <FaHeartbeat className="text-red-600 animate-pulse" /> Create Donation
          Request
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Please fill out the form accurately to find a donor quickly.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
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
              value={user?.displayName || ""}
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
              value={user?.email || ""}
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
              placeholder="Enter recipient's full name"
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
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all outline-none appearance-none bg-white"
            >
              <option value="">Select Blood Group</option>
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
              onChange={(e) => setDistrict(e.target.value)}
              value={district}
              name="district"
              required
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all outline-none bg-white"
            >
              <option value="" disabled={true}>
                Select District
              </option>
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
              onChange={(e) => setUpazila(e.target.value)}
              value={upazila}
              name="upazila"
              required
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all outline-none bg-white"
            >
              <option value="" disabled={true}>
                Select Upazila
              </option>
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
              placeholder="e.g. Dhaka Medical College Hospital"
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
              placeholder="e.g. House 12, Road 5, Sector 7"
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
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all outline-none"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-widest ml-1">
              Request Message (Why you need blood?)
            </label>
            <textarea
              required
              name="message"
              rows="4"
              placeholder="Briefly explain the emergency situation..."
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all outline-none resize-none"
            ></textarea>
          </div>
        </div>
        <div className="mt-12">
          <button
            type="submit"
            className="w-full md:w-auto px-10 py-4 bg-red-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-200 hover:bg-red-800 hover:-translate-y-1 transition-all duration-300"
          >
            Request Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest;
