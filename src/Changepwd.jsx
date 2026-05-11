
import React, { useState } from 'react'
import Footer from './Footer'
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function ChangePassword() {

  const [oldpassword, setOldPassword] = useState("")
  const [newpassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const get_id = localStorage.getItem("user_id")
  console.log("get_id",get_id)

  const changePassword = async (e) => {
    e.preventDefault()

    if (!oldpassword || !newpassword || !confirmPassword) {
    toast.error("All fields are required")
    return
  }

  // compare new & confirm password
  if (newpassword !== confirmPassword) {
    toast.error("New password and confirm password do not match")
    return
  }

    const response = await axios.post(
      "http://localhost:8080/api/v1/changepwd",
      {
        userId: get_id,
          oldpassword,
           newpassword
      }
    )

    if(response.data.success){
      toast.success(response.data.message)
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")

    }else{
        toast.error(response.data.message)
    }
  }

  return (
    <div className="wrapper">
      <Topbar/>
      <Navbar/>
<Toaster/>
      <div
      
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Segoe UI, sans-serif",
          padding: "40px",
          background:"#fff"
        }}
      >
        <div
          style={{
            width: "600px",
            background: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            overflow: "hidden"
          }}
        >

          {/* Header */}
          <div
            style={{
              height: "90px",
              background: "linear-gradient(90deg,#CC5500,#ff8c00)"
            }}
          ></div>

          <div style={{ padding: "40px" }}>

            {/* Title */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ margin: 0, color: "#CC5500" }}>
                CHANGE PASSWORD
              </h3>
              <p style={{ margin: "5px 0", color: "#6b7280" }}>
                Update your account password
              </p>
            </div>

            <form onSubmit={changePassword}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px"
                }}
              >

                {/* Old Password */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={oldpassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #F2C6A0",
                      background: "#FFF4EC",
                      fontSize: "14px",
                      outline: "none"
                    }}
                  />
                </div>

                {/* New Password */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newpassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #F2C6A0",
                      background: "#FFF4EC",
                      fontSize: "14px",
                      outline: "none"
                    }}
                  />
                </div>

                {/* Confirm Password */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #F2C6A0",
                      background: "#FFF4EC",
                      fontSize: "14px",
                      outline: "none"
                    }}
                  />
                </div>
                <Link to={"/forgotpwd"} style={{ margin: "-20px 0 ", color: "#1344a5" }}>
                Forgotten your password?
              </Link>

              </div>

              {/* Button */}
              <div style={{ marginTop: "35px", textAlign: "right" }}>
                <button
                  type="submit"
                  style={{
                    padding: "12px 35px",
                    background: "linear-gradient(90deg,#CC5500,#ff8c00)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 5px 15px rgba(204,85,0,0.4)"
                  }}
                >
                  Change Password
                </button>




              </div>

            </form>

          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}