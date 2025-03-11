import React, { FormEvent, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { validate } from "./validators/login_validator";
import axios from "axios";
import { Link, useNavigate } from "react-router";

export default function LoginPage(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  //handle the form submit to login user
  const handleSubmit = async (e) => {
    e.preventDefault();
    email.trim();
    password.trim();
    let valid = validate({ email, password });
    if (valid.validate == false) {
      console.log(email, password)
      axios.post(`${import.meta.env.VITE_BE_URL}api/login/`, { "username": email, "password": password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(response => {
          alert("Sucessfully logged in!")
          localStorage.setItem('refresh', JSON.stringify(response.data.refresh));
          localStorage.setItem('access', JSON.stringify(response.data.access));
          setEmail("");
          setPassword("");
          navigate("/homepage");
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
    else {
      setErrorMessage(valid.message);
    }

  }

  const handleShowPassword = (e) => {
    e.preventDefault()
    if (showPassword === true) {
      setShowPassword(false);
      return;
    }
    else {
      setShowPassword(true);
      return;
    }

  };

  return (
    <div>
      <ToastContainer />
      <section className="bg-gray-400 min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-[#363740] text-[#A4A6B3] flex rounded-2xl shadow-lg max-w-3xl p-5 ">
          {/* form div  */}
          <div className="md:w-50  max w-[205px] px-4 divide-y">
            <div>
              <h2 className="font-bold text-2xl">Time Tracking App</h2>
            </div>
            <div>
              <p className="text-xs mt-4">Login to your Time Tracking App</p>
              <div className="relative flex">
                <h6 className="text-center break-normal text-red-600 ">{errorMessage}</h6>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2" noValidate>
                <input
                  type="email"
                  className="p-1 mt-4 rounded-lg text-black"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />


                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="p-1 rounded-lg text-black w-full"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button onClick={handleShowPassword}>{showPassword ? (<EyeIcon className="w-4 h-4 absolute top-1/2 right-3 -translate-y-1/2" />) : (<EyeSlashIcon className="w-4 h-4 absolute top-1/2 right-3 -translate-y-1/2" />)}</button>
                </div>
                <button type="submit" className="bg-blue-800 text-white font-bold py-2 px-4 rounded-lg">
                  Login
                </button>

                <p className="text-xs mt-4">No account yet? <Link to="register" className="text-blue-500">Register One Now</Link></p>

              </form>
            </div>
          </div>

        </div>

      </section>
    </div>
  )
}