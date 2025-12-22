import React, { useContext, useEffect, useState } from "react";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaUser,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { FaDroplet, FaIdBadge } from "react-icons/fa6";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    district: "",
    upazila: "",
    bloodGroup: "",
    avatar: "",
  });

  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) => setDistricts(res.data.districts));
    axios.get("/upazilas.json").then((res) => setUpazilas(res.data.upazilas));
    if (user?.email) {
      axiosSecure
        .get(`/user/${user?.email}`)
        .then((res) => {
          const data = res.data;
          setFormData({
            name: data?.displayName || data?.name || "",
            email: data?.email || "",
            district: data?.district || "",
            upazila: data?.upazila || "",
            bloodGroup: data?.blood || "",
            avatar: data?.photoURL || "",
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading)
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            Donor <span className="text-red-600">Profile</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Manage your account information
          </p>
        </div>
        {!isEditable ? (
          <button
            onClick={() => setIsEditable(true)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-red-600 transition-all duration-300 shadow-xl"
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditable(false)}
              className="px-6 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all"
            >
              <FaTimes className="inline mr-2" /> Cancel
            </button>
            <button
              className="px-8 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-200"
            >
              <FaSave className="inline mr-2" /> Save Changes
            </button>
          </div>
        )}
      </div>
      <div className="bg-white rounded-[3rem] shadow-sm border border-red-50 relative overflow-hidden">
        <div className="h-44 bg-gradient-to-r from-red-800 via-red-600 to-red-500 relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        <div className="px-6 md:px-12 pb-12 relative">
          <div className="relative -mt-20 mb-12 flex flex-col md:flex-row items-end gap-8 text-center md:text-left">
            <div className="w-44 h-44 rounded-[2.8rem] border-[12px] border-white shadow-2xl overflow-hidden bg-gray-100 mx-auto md:mx-0">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-300" />
              )}
            </div>
            <div className="pb-4 flex-1">
              <h2 className="text-3xl font-black text-gray-800">
                {formData.name}
              </h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
                <span className="px-5 py-1.5 bg-red-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                  Donor
                </span>
                <span className="px-4 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-black rounded-full uppercase border border-gray-200 flex items-center gap-1">
                  <FaIdBadge className="text-red-400" /> Verified Member
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
                Display Name
              </label>
              <div className="relative">
                <FaUser
                  className={`absolute left-5 top-5 ${
                    isEditable ? "text-red-500" : "text-gray-300"
                  }`}
                />
                <input
                  name="name"
                  type="text"
                  disabled={!isEditable}
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-14 pr-6 py-4 rounded-2xl border transition-all outline-none font-bold ${
                    isEditable
                      ? "bg-white border-red-200 focus:ring-4 focus:ring-red-50"
                      : "bg-gray-50 text-gray-500"
                  }`}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-5 top-5 text-gray-300" />
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full pl-14 pr-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-400 font-bold cursor-not-allowed outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
                Blood Group
              </label>
              <div className="relative">
                <FaDroplet
                  className={`absolute left-5 top-5 ${
                    isEditable ? "text-red-500" : "text-gray-300"
                  }`}
                />
                <select
                  name="bloodGroup"
                  disabled={!isEditable}
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className={`w-full pl-14 pr-6 py-4 rounded-2xl border appearance-none transition-all outline-none font-black bg-white ${
                    isEditable
                      ? "bg-white border-red-200 focus:ring-4 focus:ring-red-50"
                      : "bg-gray-50 text-gray-500"
                  }`}
                >
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-400" /> District
              </label>
              <div className="relative">
                <select
                  name="district"
                  disabled={!isEditable}
                  value={formData.district}
                  onChange={handleInputChange}
                  className={`w-full pl-14 pr-6 py-4 rounded-2xl border transition-all outline-none font-bold bg-white appearance-none ${
                    isEditable
                      ? "bg-white border-red-200 focus:ring-4 focus:ring-red-50"
                      : "bg-gray-50 text-gray-500"
                  }`}
                >
                  {districts.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <FaMapMarkerAlt
                  className={`absolute left-5 top-5 ${
                    isEditable ? "text-red-500" : "text-gray-300"
                  }`}
                />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-400" /> Upazila
              </label>
              <div className="relative">
                <select
                  name="upazila"
                  disabled={!isEditable}
                  value={formData.upazila}
                  onChange={handleInputChange}
                  className={`w-full pl-14 pr-6 py-4 rounded-2xl border transition-all outline-none font-bold bg-white appearance-none ${
                    isEditable
                      ? "bg-white border-red-200 focus:ring-4 focus:ring-red-50"
                      : "bg-gray-50 text-gray-500"
                  }`}
                >
                  {upazilas.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
                <FaMapMarkerAlt
                  className={`absolute left-5 top-5 ${
                    isEditable ? "text-red-500" : "text-gray-300"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
