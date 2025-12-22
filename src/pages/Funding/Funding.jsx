import React, { useContext, useEffect, useState } from "react";
import {
  FaPlus,
  FaWallet,
  FaHistory,
  FaHandHoldingHeart,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../contexts/AuthContext";

const Funding = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosSecure();
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/all-funding")
      .then((res) => setFunds(res.data))
      .catch((err) => console.log(err));
  }, [axiosInstance]);

  const handleCheckout = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;
    const donorEmail = user?.email;
    const donorName = user?.displayName;

    const formData = {
      donateAmount,
      donorEmail,
      donorName,
    };

    if (!donateAmount || donateAmount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }
    axiosInstance
      .post("/create-payment-checkout", formData)
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((err) => console.error("Payment Error:", err));
  };

  return (
    <div className="p-4 md:p-10 min-h-screen bg-red-50/50 rounded-[3rem]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-gradient-to-br from-red-600 to-red-800 rounded-[2.5rem] p-8 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-black mb-2">
              Together we save lives
            </h1>
            <p className="text-red-100 opacity-80 max-w-md font-medium">
              Your donations help us manage blood bank costs and organize
              emergency camps.
            </p>
          </div>
          <FaHandHoldingHeart className="absolute right-[-20px] bottom-[-20px] text-white/10 text-[12rem] -rotate-12" />
        </div>
        <form
          onSubmit={handleCheckout}
          className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center gap-4"
        >
          <div className="bg-red-50 p-4 rounded-2xl text-red-500 text-3xl">
            <FaWallet />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-800">Support Us</h3>
            <p className="text-sm text-gray-400 font-medium">
              Contribute to the fund
            </p>
          </div>
          <input
            name="donateAmount"
            type="number"
            required
            placeholder="Amount in USD"
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 font-bold text-center"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-gray-800 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-200"
          >
            <FaPlus /> Give Fund
          </button>
        </form>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-red-600 rounded-full"></div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight uppercase">
              Donation History
            </h2>
          </div>
          <span className="bg-white px-4 py-1.5 rounded-full border border-gray-100 text-xs font-bold text-gray-500 shadow-sm flex items-center gap-2">
            <FaHistory className="text-red-500" /> Total {funds.length} Records
          </span>
        </div>
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="p-8 text-[11px] font-black uppercase text-gray-400 tracking-widest">
                    Contributor
                  </th>
                  <th className="p-8 text-[11px] font-black uppercase text-gray-400 tracking-widest">
                    Amount
                  </th>
                  <th className="p-8 text-[11px] font-black uppercase text-gray-400 tracking-widest text-right">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {funds.length > 0 ? (
                  funds.map((fund) => (
                    <tr
                      key={fund._id}
                      className="hover:bg-red-50/30 transition-all group"
                    >
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600 font-black uppercase">
                            {fund.userName?.charAt(0) || "U"}
                          </div>
                          <span className="font-bold text-gray-700 group-hover:text-red-600">
                            {fund.userName}
                          </span>
                        </div>
                      </td>
                      <td className="p-8">
                        <span className="bg-green-100 text-green-700 px-5 py-2 rounded-xl text-sm font-black shadow-sm">
                          ${fund.amount}
                        </span>
                      </td>
                      <td className="p-8 text-right text-gray-400 font-bold text-sm">
                        {new Date(fund.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="p-10 text-center font-bold text-gray-400 italic"
                    >
                      No donations found yet. Be the first one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funding;
