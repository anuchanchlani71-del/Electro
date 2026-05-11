import React, { useState } from 'react'
import Hearder from './components/Header'
import SideMenu from './components/SideMenu'

import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function AdminChangePassword() {

  const [oldpassword, setOldPassword] = useState("")
  const [newpassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const get_id = localStorage.getItem("_id")

  const changePassword = async (e) => {
    e.preventDefault()

    if (!oldpassword || !newpassword || !confirmPassword) {
      toast.error("All fields are required")
      return
    }

    if (newpassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    const response = await axios.post(
      "http://localhost:8080/admin/changepwd",
      {
        _id: get_id,
        oldpassword,
        newpassword
      }
    )

    if (response.data.success) {
      toast.success(response.data.message)
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className="wrapper">
    {/* <Hearder/> */}
      {/* <SideMenu /> */}
      <Toaster />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px"
        }}
      >
        <div
          style={{
            width: "600px",
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            overflow: "hidden"
          }}
        >
          {/* Blue Header */}
          <div
            style={{
              height: "90px",
              background: "linear-gradient(90deg,#2563eb,#1e3a8a)"
            }}
          ></div>

          <div style={{ padding: "40px" }}>

            {/* Title */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ margin: 0, color: "#1e3a8a" }}>
                CHANGE PASSWORD
              </h3>
              <p style={{ margin: "5px 0", color: "#6b7280" }}>
                Update your account password
              </p>
            </div>

            <form onSubmit={changePassword}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                <div>
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={oldpassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label>New Password</label>
                  <input
                    type="password"
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={inputStyle}
                  />
                </div>

              </div>

              <div style={{ marginTop: "35px", textAlign: "right" }}>
                <button
                  type="submit"
                  style={{
                    padding: "12px 35px",
                    background: "linear-gradient(90deg,#2563eb,#1e3a8a)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 5px 15px rgba(37,99,235,0.4)"
                  }}
                >
                  Change Password
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>

  
    </div>
  )
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  background: "#f8fafc",
  fontSize: "14px",
  outline: "none",
  marginTop: "6px"
}