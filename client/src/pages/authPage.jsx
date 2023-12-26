import axios from "axios";
import React, { useState } from "react";
import { SyncLoader } from "react-spinners";
import { useUser } from "../context/user";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const { setUser, setToken } = useUser();
  const navigate = useNavigate();

  const handleGetOtp = async () => {
    setLoading(true);
    const { data } = await axios.post("auth/generate-otp", { email });
    if (data.msg) {
      setLoading(false);
      setShowOtpInput(true);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const { data } = await axios.post("auth/login", { email, inputOtp: OTP });
    if (data.msg === "login successful") {
      setLoading(false);
      setUser(true);
      setToken(data.token);
      navigate("/");
    }
  };
  return (
    <div className="w-screen min-h-[720px] flex items-center justify-center bg-white">
      <div className="w-1/4 font-poppins px-6 py-4 flex flex-col items-center justify-evenly gap-2 rounded-lg border shadow-md">
        <h1 className="font-pacifico text-3xl text-primary hover:scale-105 transition-all mt-2">
          DocPlus
        </h1>
        <h1 className="font-light text-xl my-2">Log In using your Email</h1>
        <input
          type="email"
          className="block w-full outline-none border border-gray-400 rounded-md px-2 py-2 "
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {showOtpInput && (
          <input
            type="text"
            className="block w-1/2 outline-none border border-gray-400 rounded-md px-2 py-2 my-1"
            placeholder="enter your OTP"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
          />
        )}
        {showOtpInput ? (
          <button className="outline-btn w-full" onClick={handleLogin}>
            {loading ? <SyncLoader /> : <span>Login</span>}
          </button>
        ) : (
          <button className="outline-btn w-full" onClick={handleGetOtp}>
            {loading ? <SyncLoader /> : <span>Get otp</span>}
          </button>
        )}
      </div>
    </div>
  );
}
