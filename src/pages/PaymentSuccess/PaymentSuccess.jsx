import React, { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../contexts/AuthContext";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId && user) {
      axiosInstance
        .post("/funding-success", {
          transactionId: sessionId,
          userName: user?.displayName,
          userEmail: user?.email,
        })
        .then(() => {
          toast.success("Payment Successful! Thank you.");
          navigate("/funding");
        });
    }
  }, [sessionId, user, axiosInstance, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-5">
      <div className="bg-red-50 p-10 rounded-[3rem] text-center shadow-xl shadow-red-100 max-w-md w-full">
        <FaCheckCircle className="text-red-500 text-7xl mx-auto mb-6 animate-bounce" />
        <h2 className="text-3xl font-black text-gray-800 mb-2 uppercase tracking-tighter">
          Processing...
        </h2>
        <p className="text-gray-500 font-medium mb-6">
          Please wait while we confirm your transaction and update the records.
        </p>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div className="bg-red-600 h-full animate-progress-bar w-[60%]"></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
