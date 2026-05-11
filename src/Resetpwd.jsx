// import React, { useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Topbar from "./Topbar";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// export default function ResetPassword() {

//   const [resetString, setResetString] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const resetPassword = async (e) => {
//     e.preventDefault();

//     const savedCode = localStorage.getItem("resetCode");
//     const email = localStorage.getItem("resetEmail");

//     if (!savedCode) return toast.error("No reset request found");

//     if (resetString.trim() !== savedCode) {
//       return toast.error("Invalid reset code");
//     }

//     const res = await axios.post("http://localhost:8080/api/v1/forgotpwd", {
//       email,
//       resetString,
//       newPassword,
//       savedCode
//     });

//     if (res.data.success) {
//       toast.success("Password updated 🔐");

//       localStorage.removeItem("resetCode");
//       localStorage.removeItem("resetEmail");

//     } else {
//       toast.error(res.data.message);
//     }
//   };

//   return (
//     <div className="wrapper">
//       <Topbar />
//       <Navbar />
//       <Toaster />

//       <div style={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#fff"
//       }}>

//         <div style={{
//           width: "500px",
//           borderRadius: "20px",
//           boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
//           overflow: "hidden",
//           background: "#fff"
//         }}>

//           <div style={{
//             height: "80px",
//             background: "linear-gradient(90deg,#CC5500,#ff8c00)"
//           }} />

//           <div style={{ padding: "40px" }}>

//             <h2 style={{ color: "#CC5500" }}>
//               Reset Password 🔑
//             </h2>

//             <p style={{ color: "#777", marginBottom: "20px" }}>
//               Enter code and new password
//             </p>

//             <form onSubmit={resetPassword}>

//               <input
//                 type="text"
//                 placeholder="Enter Reset Code"
//                 value={resetString}
//                 onChange={(e) => setResetString(e.target.value)}
//                 style={{
//                   width: "100%",
//                   padding: "12px",
//                   borderRadius: "10px",
//                   border: "1px solid #F2C6A0",
//                   background: "#FFF4EC",
//                   marginBottom: "15px",
//                   outline: "none"
//                 }}
//               />

//               <input
//                 type="password"
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 style={{
//                   width: "100%",
//                   padding: "12px",
//                   borderRadius: "10px",
//                   border: "1px solid #F2C6A0",
//                   background: "#FFF4EC",
//                   marginBottom: "20px",
//                   outline: "none"
//                 }}
//               />

//               <button
//                 type="submit"
//                 style={{
//                   width: "100%",
//                   padding: "12px",
//                   border: "none",
//                   borderRadius: "10px",
//                   background: "linear-gradient(90deg,#CC5500,#ff8c00)",
//                   color: "#fff",
//                   fontWeight: "600",
//                   cursor: "pointer"
//                 }}
//               >
//                 Reset Password
//               </button>

//             </form>

//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }



import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

export default function ResetPassword() {

  const [resetString, setResetString] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const location = useLocation();
  const email = location.state?.email;

  const resetPassword = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Session expired, try again");

    if (!resetString || !newPassword) {
      return toast.error("All fields required");
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

            <h2 style={{ color: "#CC5500" }}>
              Reset Password 🔑
            </h2>

            <p style={{ color: "#777", marginBottom: "20px" }}>
              Enter code and new password
            </p>

            <form onSubmit={resetPassword}>

              <input
                type="text"
                placeholder="Enter Reset Code"
                value={resetString}
                onChange={(e) => setResetString(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #F2C6A0",
                  background: "#FFF4EC",
                  marginBottom: "15px",
                  outline: "none"
                }}
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #F2C6A0",
                  background: "#FFF4EC",
                  marginBottom: "20px",
                  outline: "none"
                }}
              />

              <button
                type="submit"
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
                Reset Password
              </button>

            </form>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}