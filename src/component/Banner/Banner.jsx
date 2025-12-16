import React from "react";
import { Link } from "react-router";
import "./Banner.css";
import "animate.css";

const Banner = () => {
  return (
    <div>
      <section
        className="relative min-h-[40vh] md:min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-12"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/G30tgkLS/donation-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-red-900/70 to-black/90"></div>
        <div className="relative z-10 max-w-4xl text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight animate__animated animate__fadeInDown">
            Donate Blood,
            <span className=" text-red-400 mt-2">Save Life</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto animate__animated animate__fadeInDown">
            Join our blood donation community and become a real-life hero. Every
            drop counts. Every donor matters.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center animate__bounceIn">
            <Link to="/register">
              <button className="cssbuttons-io-button">
                Join as a Donor
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </Link>
            <Link to="/search">
              <button className="px-6 py-2.5 text-sm sm:text-base font-semibold rounded-2xl border-2 border-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
                Search Donors
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
