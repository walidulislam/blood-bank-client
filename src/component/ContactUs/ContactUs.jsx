import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div>
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-[#f8d0d3] via-[#f1babf] to-[#f7e8e3]">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto">
          <div data-aos="zoom-in" className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
              Contact <span className="text-red-400">Us</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Whether it’s an emergency or a simple question — we’re just one
              message away.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-800">
                Need Blood Support?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our team works 24/7 to connect donors and recipients quickly.
                Reach out anytime — your message can help save a life.
              </p>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-100 text-red-500 text-xl">
                    📞
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call Us</p>
                    <p className="font-semibold text-gray-800">
                      +880 1854-475196
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-100 text-red-500 text-xl">
                    📧
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800">
                      walidulislam2005@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-left" className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-3xl blur opacity-30"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 sm:p-10">
                <h4 className="text-2xl font-bold text-red-700 mb-6">
                  Send a Message
                </h4>
                <form className="space-y-5">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300"
                  />
                  <textarea
                    rows="4"
                    placeholder="Your Message"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300"
                  ></textarea>
                  <button type="submit" className="button w-full">
                    <span className="text">Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
