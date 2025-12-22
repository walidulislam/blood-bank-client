import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaUserCircle,
  FaEnvelope,
} from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Search = () => {
  const axiosSecure = useAxiosSecure();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) => setDistricts(res.data.districts));
    axios.get("/upazilas.json").then((res) => setUpazilas(res.data.upazilas));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    const bloodGroup = e.target.bloodGroup.value;
    const district = e.target.district.value;
    const upazila = e.target.upazila.value;

    axiosSecure
      .get("/donors", {
        params: {
          bloodGroup,
          district,
          upazila,
        },
      })
      .then((res) => {
        setDonors(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Search failed", error);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Search a <span className="text-red-600">Donor</span>
          </h1>
          <p className="text-gray-500 font-medium">
            Search for blood donors in your area
          </p>
        </div>
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-red-50 p-8 md:p-10 mb-16 border border-red-50">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                <FaDroplet className="text-red-500" /> Blood Group
              </label>
              <select
                name="bloodGroup"
                required
                className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 font-bold outline-none focus:ring-4 focus:ring-red-50 focus:border-red-200 transition-all appearance-none"
              >
                <option value="">Select Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" /> District
              </label>
              <select
                name="district"
                required
                className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 font-bold outline-none focus:ring-4 focus:ring-red-50 focus:border-red-200 transition-all appearance-none"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" /> Upazila
              </label>
              <select
                name="upazila"
                required
                className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 font-bold outline-none focus:ring-4 focus:ring-red-50 focus:border-red-200 transition-all appearance-none"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-3 mt-4">
              <button
                type="submit"
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-100 hover:bg-red-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <FaSearch /> Search Donors
              </button>
            </div>
          </form>
        </div>
        <div className="space-y-8">
          {!searched && (
            <div className="text-center py-20 bg-gray-100 rounded-[3rem] border-2 border-dashed border-gray-200">
              <FaSearch className="text-5xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 font-bold uppercase tracking-widest">
                Your search results will appear here
              </p>
            </div>
          )}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="loader"></div>
            </div>
          )}
          {searched && !loading && donors.length === 0 && (
            <div className="text-center py-20 bg-red-50 rounded-[3rem] border-2 border-dashed border-red-100">
              <p className="text-red-400 font-bold text-xl md:text-2xl">
                No donors found for this criteria.
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searched &&
              !loading &&
              donors.map((donor) => (
                <div
                  key={donor._id}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-100 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                      {donor.photoURL ? (
                        <img
                          src={donor.photoURL}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="w-full h-full text-gray-200" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-800 group-hover:text-red-600 transition-colors">
                        {donor.displayName || donor.name}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-full uppercase tracking-tighter mt-1">
                        Group: {donor.blood}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-gray-50">
                    <p className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                      <FaMapMarkerAlt className="text-red-400" />{" "}
                      {donor.district}, {donor.upazila}
                    </p>
                    <p className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                      <FaEnvelope className="text-red-400" /> {donor.email}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
