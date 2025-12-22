import React, { use, useEffect, useState } from "react";
import "./Register.css";
import logo from "/blood.png";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const Register = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { setLoading, createUser, updateProfileUser } = use(AuthContext);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    axios.get("./upazilas.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("./districts.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handelRegister = async (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const photo = e.target.photo;
    const file = photo.files[0];
    const email = e.target.email.value;
    const password = e.target.password.value;
    const blood = e.target.blood.value;
    const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const confirmPassword = e.target.confirmPassword.value;

    if (!regExp.test(password)) {
      toast.error(
        "Password must have uppercase, lowercase & at least 6 characters..❗",
        {
          style: {
            border: "1px solid #713200",
            padding: "10px",
            color: "#713200",
          },
        }
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password & Confirm Password do not match ❌", {
        style: {
          border: "1px solid red",
          padding: "10px",
          color: "red",
        },
      });
      return;
    }

    const photoData = new FormData();
    photoData.append("image", file);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=6e6eca73fe80610ae783132e58a51dc4`,
      photoData
    );

    const photoURL = res.data.data.display_url;

    const formData = {
      email,
      displayName,
      password,
      photoURL,
      blood,
      district,
      upazila,
    };

    if (res.data.success === true) {
      createUser(email, password)
        .then(() => {
          updateProfileUser(displayName, photoURL)
            .then(() => {
              axios
                .post("https://blood-donation-server-taupe.vercel.app/users", formData)
                .then(() => {
                  setLoading(false);
                  toast.success("Registration Successful..🌸");
                  e.target.reset();
                  navigate("/");
                })
                .catch((err) => {
                  setLoading(false);
                  toast.error(err.message);
                });
            })
            .catch((e) => {
              setLoading(false);
              toast.error(e.message);
            });
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
        });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center gap-30">
      <div
        data-aos="fade-right"
        className="text-white space-y-3 items-center text-center justify-center  flex flex-col  hidden md:block"
      >
        <h1 className="heading">
          Welcome <span className="text-red-400">Blood</span>
          <span className="text-red-900">Bank</span> 👋
        </h1>
        <div className=" flex items-center justify-center">
          <img className="h-40 w-40 " src={logo} alt="" />
        </div>
        <p className="text-lg text-gray-500 opacity-90">
          Create your BloodBank account to manage blood donation <br /> requests
          and help save lives.
        </p>
        <ul className="space-y-2 text-sm text-gray-700 text-left opacity-80 pl-24">
          <li>✔ Give blood, give life.</li>
          <li>✔ Your donation can be someone's salvation</li>
          <li>✔ Verified blood donation requests</li>
          <li>✔ Fast emergency blood support</li>
        </ul>
      </div>
      <div data-aos="fade-left" className=" shadow-2xl rounded-2xl">
        <form onSubmit={handelRegister} className="form_main">
          <p className="heading">Register</p>
          <div className="inputContainer">
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
            />
          </div>
          <div className="inputContainer">
            <svg
              className="inputIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8V22h19.2v-2.8c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="inputField"
            />
          </div>
          <div className="inputContainer">
            <svg
              className="inputIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="#2e2e2e"
              viewBox="0 0 24 24"
            >
              <path d="M5 20h14v-2H5v2z" />
              <path d="M12 3l-5 5h3v6h4V8h3l-5-5z" />
            </svg>
            <input
              type="file"
              name="photo"
              placeholder="Your photo URL here"
              className="w-full h-[50px] bg-transparent border-0 border-b-2 border-[rgb(173,173,173)] my-[10px] text-black text-base font-medium box-border pl-[30px]"
            />
          </div>
          <div className="inputContainer">
            <svg
              className="inputIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 24 24"
            >
              <path d="M20.285 6.709l-11.025 11.025-5.545-5.545 1.414-1.414 4.131 4.131 9.611-9.611z" />
            </svg>
            <select
              name="blood"
              defaultValue=""
              className="select appearance-none inputField"
              required
            >
              <option value="" disabled={true}>
                Choose Blood Group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="inputContainer">
            <svg
              className="inputIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 24 24"
            >
              <path d="M20.285 6.709l-11.025 11.025-5.545-5.545 1.414-1.414 4.131 4.131 9.611-9.611z" />
            </svg>
            <select
              onChange={(e) => setDistrict(e.target.value)}
              value={district}
              name="district"
              className="select appearance-none inputField"
            >
              <option value="" disabled={true}>
                Select Your District
              </option>
              {districts.map((d) => (
                <option value={d?.name} key={d.id}>
                  {d?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="inputContainer">
            <svg
              className="inputIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 24 24"
            >
              <path d="M20.285 6.709l-11.025 11.025-5.545-5.545 1.414-1.414 4.131 4.131 9.611-9.611z" />
            </svg>
            <select
              onChange={(e) => setUpazila(e.target.value)}
              value={upazila}
              name="upazila"
              className="select appearance-none inputField"
            >
              <option value="" disabled={true}>
                Select Your Upazila
              </option>
              {upazilas.map((u) => (
                <option value={u?.name} key={u.id}>
                  {u?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="inputContainer">
            <svg
              className="inputIcon"
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
              name="password"
              className="inputField"
              placeholder="Password"
            />
            <span
              onClick={() => setShow(!show)}
              className=" absolute top-[35px] right-[5px] cursor-pointer"
            >
              {show ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}
            </span>
          </div>
          <div className="inputContainer">
            <svg
              className="inputIcon"
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
              name="confirmPassword"
              className="inputField"
              placeholder="Confirm Password"
            />
          </div>
          <button id="button" type="submit" className="button">
            <span className="text">Register</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
