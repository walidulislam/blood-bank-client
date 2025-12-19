import React, { use } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { FaBurn } from "react-icons/fa";

const MainDashboard = () => {
  const { user, role } = use(AuthContext);

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
    </div>
  );
};

export default MainDashboard;
