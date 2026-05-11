import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const navigate=useNavigate();


const handlelogin=async(e)=>{
  e.preventDefault();

  const data={
    email:email,
    password:password
  }



  const response=await axios.post("http://localhost:8080/api/v1/login",data)
  console.log("response",response)

  if(response.data.success){
    const token=response.data.token
    localStorage.setItem("usertoken",token)

    const _id=response.data.data._id
    localStorage.setItem("user_id",_id)
        navigate('/', { replace: true });
        
  }
    

else{
    toast.error(response.data.message)
}


}

  return (

    <div>
      <Topbar/>
      <Navbar/>
      <Toaster/>
    <div


      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg)",
        // margin:"-5%"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          width: "500px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "5px" }}>Welcome Back 👋</h2>
        <p style={{ fontSize: "14px", color: "gray", marginBottom: "20px" }}>
          Please login to your account
        </p>


<form onSubmit={handlelogin}>
        <input
          type="email"
          placeholder=" Enter your email" 
          value={email} 
          onChange={(e) => setemail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder="Enter your password" 
          value={password} 
          onChange={(e) => setpassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
            marginBottom: "15px",
          }}
        >
          
          <label>
            <input type="checkbox" required /> Remember Me
          </label>
          <Link to={"/forgotpwd"} style={{ color: "#667eea", cursor: "pointer" }}>
            Forgot Password?
          </Link>
          
        </div>

        <button
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            background: "#D8863C",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Don't have an account?{" "}
          <span style={{ color: "#667eea", cursor: "pointer" }}>
            <Link to={"/register"}> Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
