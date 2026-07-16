

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendCode = async () => {
    if (!email) return toast.error("Enter email");

    try {

      const res = await axios.post(
        "http://localhost:8080/api/v1/forgotpwd",
        { email: email.trim() }
      );

      if (res.data.success) {

        toast.success("Reset code sent 📩");

        // 👉 email pass karo next page pe
        navigate("/resetpwd", { state: { email: email.trim() } });

      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="wrapper">
      <Topbar />
      <Navbar />
      <Toaster />

      <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff"
      }}>

        <div style={{
          width: "500px",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          overflow: "hidden",
          background: "#fff"
        }}>

          <div style={{
            height: "80px",
            background: "linear-gradient(90deg,#CC5500,#ff8c00)"
          }} />

          <div style={{ padding: "40px" }}>

            <h2 style={{ color: "#CC5500", marginBottom: "10px" }}>
              Forgot Password 🔐
            </h2>

            <p style={{ color: "#777", marginBottom: "20px" }}>
              Enter your email to receive reset code
            </p>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #F2C6A0",
                background: "#FFF4EC",
                outline: "none",
                marginBottom: "20px"
              }}
            />

            <button
              onClick={sendCode}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                background: "linear-gradient(90deg,#CC5500,#ff8c00)",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Send Code
            </button>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}