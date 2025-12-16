import React, { useEffect } from "react";
import feature1 from "../../assets/feature1.jpg";
import feature2 from "../../assets/feature2.jpg";
import feature3 from "../../assets/feature3.jpg";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";

const FeaturedSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-12 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto animate__bounceIn">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Our <span className="text-red-400">Features</span>
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            A trusted platform built to connect donors and patients quickly and
            safely.
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div className="group bg-red-50 rounded-2xl border-3 border-red-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            <img
              src={feature1}
              alt="Save Lives"
              className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                Save Lives
              </h3>
              <p className="text-gray-500 text-sm">
                One blood donation can save up to three lives in critical
                situations.
              </p>
            </div>
          </div>
          <div className="group bg-red-50 rounded-2xl border-3 border-red-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            <img
              src={feature2}
              alt="Verified Donors"
              className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                Verified Donors
              </h3>
              <p className="text-gray-500 text-sm">
                We ensure donors are verified to keep recipients safe and
                secure.
              </p>
            </div>
          </div>
          <div className="group bg-red-50 rounded-2xl border-3 border-red-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            <img
              src={feature3}
              alt="Fast Support"
              className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                Fast Support
              </h3>
              <p className="text-gray-500 text-sm">
                Find donors quickly during emergencies when every second
                matters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
