import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import Aside from "../component/Aside/Aside";
import logo from "/blood.png";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex bg-[#F8F9FB] min-h-screen relative overflow-hidden">
      <div className="hidden lg:flex w-72 h-screen sticky top-0 left-0 flex-shrink-0">
        <Aside></Aside>
      </div>
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>

        <div
          className={`absolute top-0 left-0 w-72 h-full bg-white transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="absolute top-6 right-[-50px]">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white p-3 rounded-full text-red-600 shadow-xl"
            >
              <FaTimes />
            </button>
          </div>
          <Aside></Aside>
        </div>
      </div>
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="lg:hidden h-20 bg-white border-b px-6 flex items-center justify-between sticky top-0 z-40">
          <Link to="/" className="flex items-center gap-2">
            <img className="w-12" src={logo} alt="" />
            <h1 className="font-black text-gray-800 tracking-tight">
              BloodBank
            </h1>
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-xl bg-gray-50 rounded-xl text-gray-600 border border-gray-100"
          >
            <FaBars />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-14">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
