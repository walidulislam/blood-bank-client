import React, { use, useEffect, useState } from "react";
import "./Login.css";
import logo from "/blood.png";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoading, logInUser } = use(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handelLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    logInUser(email, password)
      .then(() => {
        setLoading(false);
        toast.success("Login Successful..🌸");
        e.target.reset();
        navigate(location.state || "/");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center gap-30">
      <div data-aos="fade-right" className="text-white space-y-3 items-center text-center justify-center  flex flex-col  hidden md:block">
        <h1 className="heading">
          Welcome <span className="text-red-400">Blood</span>
          <span className="text-red-900">Bank</span> 👋
        </h1>
        <div className=" flex items-center justify-center">
          <img className="h-40 w-40 " src={logo} alt="" />
        </div>
        <p className="text-lg text-gray-500 opacity-90">
          Login to your BloodBank account to manage blood donation <br />{" "}
          requests and help save lives.
        </p>
        <ul className="space-y-2 text-sm text-gray-700 text-left opacity-80 pl-24">
          <li>✔ Secure donor & recipient accounts</li>
          <li>✔ Verified blood donation requests</li>
          <li>✔ Fast emergency blood support</li>
          <li>✔ Community-driven lifesaving platform</li>
        </ul>
      </div>
      <div data-aos="fade-left" className=" shadow-2xl rounded-2xl">
        <form onSubmit={handelLogIn} className="form_mainL">
          <p className="headingL">Login</p>
          <div className="inputContainerL">
            <svg
              className="inputIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              className="inputField"
              id="username"
            />
          </div>
          <div className="inputContainerL">
            <svg
              className="inputIconL"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <input
              type={show ? "text" : "password"}
              className="inputField"
              id="password"
              placeholder="Password"
            />
            <span
              onClick={() => setShow(!show)}
              className=" absolute top-[35px] right-[5px] cursor-pointer"
            >
              {show ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}
            </span>
          </div>
          <p className="text-center text-sm text-gray/80 mt-3 z-2 py-2">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-pink-300 hover:text-red-800 underline"
            >
              Register
            </Link>
          </p>
          <button id="buttonL" type="submit" className="button">
            <span className="text">Login</span>
          </button>
          <a className="forgotLinkL" href="#">
            Forgot your password?
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
