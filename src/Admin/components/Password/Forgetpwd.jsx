// 

import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

function AdminForgotPassword() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendCode = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/forgotpwd",
        { email: email.trim() }
      );

      if (response.data.success) {
        toast.success("Reset code sent to email 📩");

        navigate("/admin/resetpwd", {
          state: { email: email.trim() }
        });

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>
      <Toaster />

      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        
        <div className="col-md-5">

          <div className="card shadow-lg border-0" style={{ borderRadius: "12px" }}>

            {/* Header */}
            <div 
              className="card-header text-white text-center"
              style={{
                background: "linear-gradient(135deg, #007bff, #0056b3)",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                padding: "20px"
              }}
            >
              <h3 className="m-0">Forgot Password</h3>
              <small>Enter your email to receive reset code</small>
            </div>

            {/* Body */}
            <div className="card-body p-4">

              <form onSubmit={sendCode}>

                <div className="form-group mb-3">
                  <label className="mb-1">
                    Email <span style={{ color: "red" }}>*</span>
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ height: "45px", borderRadius: "8px" }}
                  />
                </div>
<button
  type="submit"
  style={{
    height: "45px",
    borderRadius: "8px",
    fontWeight: "500",
    width: "100%",
    border: "none",
    color: "#fff",
    background: "linear-gradient(135deg, #007bff, #0056b3)",
    transition: "0.3s"
  }}
  onMouseOver={(e) =>
    (e.target.style.background = "linear-gradient(135deg, #0056b3, #004099)")
  }
  onMouseOut={(e) =>
    (e.target.style.background = "linear-gradient(135deg, #007bff, #0056b3)")
  }
>
  Send Reset Code
</button>

              </form>

            </div>

            {/* Footer */}
            <div className="text-center pb-3">
              <small>
                Remember password?{" "}
                <span 
                  style={{ color: "#007bff", cursor: "pointer" }}
                  onClick={() => navigate("/admin")}
                >
                  Login here
                </span>
              </small>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminForgotPassword;