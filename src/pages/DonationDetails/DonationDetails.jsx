import React, { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaHospital,
  FaUser,
} from "react-icons/fa";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../contexts/AuthContext";

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    axiosSecure.get(`/requests/${id}`).then((res) => {
      setRequest(res.data);
    });
  }, [id, axiosSecure]);

  const handleConfirmDonation = (e) => {
    e.preventDefault();
    const donorInfo = {
      donorName: user?.displayName,
      donorEmail: user?.email,
      status: "inprogress",
    };

    axiosSecure
      .patch(`/requests/status-update/${id}`, donorInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Confirmed!",
            text: "Thank you for agreeing to donate!",
            icon: "success",
            confirmButtonColor: "#ef4444",
          });
          setIsModalOpen(false);
          navigate("/donation-requests");
        }
      })
      .catch((err) => console.log(err));
  };

  if (!request)
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 ">
      <div className="max-w-4xl mx-auto">
        <div
          data-aos="zoom-in"
          className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-red-600 p-10 text-white flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black mb-2 uppercase">
                Donation Details
              </h1>
              <p className="opacity-80 font-medium">
                Please review the information carefully
              </p>
            </div>
            <div className="text-5xl font-black bg-white/20 p-6 rounded-[2rem] backdrop-blur-sm">
              {request.bloodGroup}
            </div>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-red-500 bg-red-50 p-3 rounded-2xl">
                  <FaUser size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Recipient Name
                  </p>
                  <p className="text-gray-800 font-bold text-lg leading-tight">
                    {request.recipientName}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-red-500 bg-red-50 p-3 rounded-2xl">
                  <FaHospital size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Hospital
                  </p>
                  <p className="text-gray-800 font-bold text-lg leading-tight">
                    {request.hospitalName}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-red-500 bg-red-50 p-3 rounded-2xl">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Full Address
                  </p>
                  <p className="text-gray-800 font-bold text-lg leading-tight">
                    {`${request.fullAddress}, ${request.recipientUpazila}, ${request.recipientDistrict}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-red-500 bg-red-50 p-3 rounded-2xl">
                  <FaCalendarAlt size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Donation Date
                  </p>
                  <p className="text-gray-800 font-bold text-lg leading-tight">
                    {request.donationDate}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-red-500 bg-red-50 p-3 rounded-2xl">
                  <FaClock size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Donation Time
                  </p>
                  <p className="text-gray-800 font-bold text-lg leading-tight">
                    {request.donationTime}
                  </p>
                </div>
              </div>
              <div className="p-6 bg-red-50 rounded-3xl border border-red-100 shadow-inner">
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">
                  Request Message
                </p>
                <p className="text-gray-700 font-bold italic leading-relaxed italic">
                  "{request.requestMessage}"
                </p>
              </div>
            </div>
          </div>
          <div className="p-10 bg-gray-50 border-t border-gray-100 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-16 py-5 bg-red-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-red-100 hover:bg-red-700 hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in duration-300">
            <h2 className="text-2xl font-black text-gray-800 mb-8 text-center uppercase tracking-tighter">
              Confirm Your <span className="text-red-600">Donation</span>
            </h2>
            <form onSubmit={handleConfirmDonation} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest">
                  Donor Name
                </label>
                <input
                  type="text"
                  readOnly
                  value={user?.displayName}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 font-bold text-gray-400 border border-gray-100 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest">
                  Donor Email
                </label>
                <input
                  type="email"
                  readOnly
                  value={user?.email}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 font-bold text-gray-400 border border-gray-100 outline-none"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-black shadow-lg shadow-red-100 hover:bg-red-700 transition-all uppercase tracking-widest"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;
