import React from "react";
import logoImg from "/blood.png";
import { Mail, MapPinCheckInside, Phone } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-[#661c16] text-neutral-content items-center justify-around p-10 lg:px-20 ">
        <aside className="flex flex-col items-center space-y-1">
          <img className="w-12 rounded-full" src={logoImg} alt="Logo" />
          <h2 className="font-bold text-xl text-red-600">
            Blood<span className="text-white">Bank</span>
          </h2>
        </aside>
        <div>
          <ul>
          <li>✔ Secure donor & recipient accounts</li>
          <li>✔ Verified blood donation requests</li>
          <li>✔ Fast emergency blood support</li>
          <li>✔ Community-driven lifesaving platform</li>
          </ul>

        </div>
        <div>
          <h6 className="footer-title">Contact</h6>
          <p className="flex gap-2">
            <Mail /> walidulislam2005@gmail.com
          </p>
          <p className="flex gap-2">
            <Phone /> +8801854475196
          </p>
          <p className="flex gap-2">
            <MapPinCheckInside /> Barisal, Bangladesh
          </p>
        </div>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a target="blank" href="https://github.com/walidulislam">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
      3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
      0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61
      -.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.084-.729.084-.729
      1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.998
      .108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93
      0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0
      1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005
      2.047.138 3.006.404 2.289-1.552 3.296-1.23 3.296-1.23.656 1.653.244
      2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.62-5.476
      5.92.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293
      0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627
      -5.373-12-12-12"
                />
              </svg>
            </a>
            <a
              target="blank"
              href="https://www.facebook.com/walidul.islam.196/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
            <a target="blank" href="https://www.instagram.com/mdwalidul/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm10 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
              </svg>
            </a>
          </div>
        </nav>
      </footer>
      <footer className="footer sm:footer-horizontal footer-center bg-[#38100e] text-white p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by{" "}
            <span className="font-bold text-lg text-red-600">
              Blood<span className="text-white">Bank</span>
            </span>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
