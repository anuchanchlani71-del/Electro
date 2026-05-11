

import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Footer from "./Footer";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";



function Register() {
  const [first_name, setfirst_name] = useState("")
  const [last_name, setlast_name] = useState("")
  const [email, setemail] = useState("")
  const [mobile, setmobile] = useState("")
  const [address, setaddress] = useState("")
  const [password, setpassword] = useState("")
  const [image, setImage] = useState("")
  console.log("data", first_name, last_name, email, password, mobile, address)
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", first_name)
    formData.append("last_name", last_name)
    formData.append("email", email)
    formData.append("mobile", mobile)
    formData.append("address", address)
    formData.append("image", image)
    formData.append("password", password)



    const response = await axios.post("http://localhost:8080/api/v1/register", formData)
    console.log("response", response)
    if (response.data.success) {
      toast.success(response.data.message)
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
    }
    else {
      toast.error(response.data.message);
    }
  }
  return (
    <div>
      <Toaster />
      <Topbar />
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
          // background: "linear-gradient(to right)",
        }}
      >
        <div
          style={{
       width: "100%",
maxWidth: "600px",  
            padding: "50px",

            backgroundColor: "#ffffff",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",

          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Create Account
          </h2>

          <form onSubmit={addUser}>
           <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
  <div style={{ flex: 1 }}>
    <label   style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}   >
      First Name  <span style={{ color: "red" }}>* </span>
       </label>
    <input
      type="text"
      placeholder="Enter your firstname"
      value={first_name}
      onChange={(e) => setfirst_name(e.target.value)}
      required
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "14px",
      }}
    />
  </div>

  <div style={{ flex: 1 }}>
    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
      Last Name <span style={{ color: "red" }}>* </span>
    </label>
    <input
      type="text"
      placeholder="Enter your lastname"
      value={last_name}
      onChange={(e) => setlast_name(e.target.value)}
      required
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "14px",
      }}
    />
  </div>
</div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
              email  <span style={{ color: "red" }}>* </span>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "14px",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>mobile <span style={{ color: "red" }}>* </span>
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            />
            </label>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
              password    <span style={{ color: "red" }}>* </span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "14px",
                }}
              />

            </label>


            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
              address   <span style={{ color: "red" }}>* </span>
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "14px",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
              image  <span style={{ color: "red" }}>* </span>
              <input
                type="file"
                className="form-control"
                required

                onChange={(e) => setImage(e.target.files[0])}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "14px",
                }}
              />
            </label>


            <div style={{ marginBottom: "15px", fontSize: "13px" }}>
              <input type="checkbox" required /> I agree to Terms & Conditions
            </div>

            <button
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#D8863C",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              Register
            </button>
          </form>
          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#D8863C",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Login
            </Link>
          </p>

        </div>

      </div>
      <Footer />
    </div>
  );
}
export default Register;