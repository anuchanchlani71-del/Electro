import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function AdminResetPassword() {

  const [resetString, setResetString] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const resetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Session expired, try again");
      return;
    }

    if (!resetString || !newPassword) {
      toast.error("All fields required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/forgotpwd",
        {
          email,
          resetString,
          newPassword
        }
      );

      if (res.data.success) {
        toast.success("Password updated 🔐");

        // redirect to login
        setTimeout(() => {
          navigate("/admin");
        }, 1500);

      } else {
        toast.error(res.data.message);
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
              <h3 className="m-0">Admin Reset Password</h3>
              <small>Enter code & new password</small>
            </div>

            {/* Body */}
            <div className="card-body p-4">

              <form onSubmit={resetPassword}>

                <div className="form-group mb-3">
                  <label>Reset Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter reset code"
                    value={resetString}
                    onChange={(e) => setResetString(e.target.value)}
                    style={{ height: "45px", borderRadius: "8px" }}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  Reset Password
                </button>

              </form>

            </div>

            {/* Footer */}
            <div className="text-center pb-3">
              <small>
                Back to{" "}
                <span 
                  style={{ color: "#007bff", cursor: "pointer" }}
                  onClick={() => navigate("/admin")}
                >
                  Login
                </span>
              </small>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminResetPassword;