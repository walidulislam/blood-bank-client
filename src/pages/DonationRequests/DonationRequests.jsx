import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaEye, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    axiosSecure
      .get("/pending-requests")
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-12 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div data-aos="zoom-in" className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Pending <span className="text-red-600">Donation</span> Requests
          </h1>
          <p className="text-gray-500 font-medium">
            Help save a life by responding to these requests
          </p>
        </div>
        {requests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase tracking-widest">
              No pending requests available at this moment.
            </p>
          </div>
        ) : (
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-100 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-red-600 text-white px-6 py-2 rounded-bl-[1.5rem] font-black text-lg">
                  {request.bloodGroup}
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-gray-800 mb-1 group-hover:text-red-600 transition-colors">
                    {request.recipientName}
                  </h3>
                  <div className="flex items-center gap-2 text-red-500 text-xs font-black uppercase tracking-tighter">
                    <FaDroplet />
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-bold text-gray-700">
                        {request.recipientDistrict}
                      </p>
                      <p className="text-[11px] text-gray-400 font-medium">
                        {request.recipientUpazila}, {request.hospitalName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-gray-400" />
                    <p className="text-sm font-bold text-gray-600">
                      {request.donationDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaClock className="text-gray-400" />
                    <p className="text-sm font-bold text-gray-600">
                      {request.donationTime}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/donation-details/${request._id}`}
                  className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-center flex items-center justify-center gap-3 hover:bg-red-600 transition-all duration-300 shadow-lg shadow-gray-200 hover:shadow-red-200"
                >
                  <FaEye /> View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationRequests;
