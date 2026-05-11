// // import React, { useState } from "react";
// // import Footer from "./Footer";
// // import Topbar from "./Topbar";
// // import Navbar from "./Navbar";
// // import axios from "axios";
// // import toast, { Toaster } from "react-hot-toast";

// // export default function ForgotPassword() {

// //   const [email, setEmail] = useState("");
// //   const [resetString, setResetString] = useState("");
// //   const [newPassword, setNewPassword] = useState("");

// //   const forgotPassword = async (e) => {
// //     e.preventDefault();

// //     if (!email || !resetString || !newPassword) {
// //       toast.error("All fields are required");
// //       return;
// //     }

// //     const response = await axios.post(
// //       "http://localhost:8080/api/v1/forgotpwd",
// //       {
// //         email,
// //         resetString,
// //         newPassword
// //       }
// //     );

// //     if (response.data.success) {
// //       toast.success(response.data.message);
// //       setEmail("");
// //       setResetString("");
// //       setNewPassword("");
// //     } else {
// //       toast.error(response.data.message);
// //     }
// //   };

// //   return (
// //     <div className="wrapper">
// //       <Topbar />
// //       <Navbar />
// //       <Toaster />

// //       <div
// //         style={{
// //           minHeight: "100vh",
// //           display: "flex",
// //           justifyContent: "center",
// //           alignItems: "center",
// //           fontFamily: "Segoe UI, sans-serif",
// //           padding: "40px",
// //           background: "#fff"
// //         }}
// //       >
// //         <div
// //           style={{
// //             width: "600px",
// //             background: "#ffffff",
// //             borderRadius: "20px",
// //             boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
// //             overflow: "hidden"
// //           }}
// //         >
// //           {/* Header */}
// //           <div
// //             style={{
// //               height: "90px",
// //               background: "linear-gradient(90deg,#CC5500,#ff8c00)"
// //             }}
// //           ></div>

// //           <div style={{ padding: "40px" }}>
// //             {/* Title */}
// //             <div style={{ marginBottom: "30px" }}>
// //               <h3 style={{ margin: 0, color: "#CC5500" }}>
// //               FORGOT PASSWORD 🔐 
// //               </h3>
// //               <p style={{ margin: "5px 0", color: "#6b7280" }}>
// //                 Enter reset code sent to your email
// //               </p>
// //             </div>

// //             <form onSubmit={forgotPassword}>
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: "20px"
// //                 }}
// //               >
// //                 {/* Email */}
// //                 <div style={{ display: "flex", flexDirection: "column" }}>
// //                   <label style={{ marginBottom: "6px", fontWeight: "500" }}>
// //                     Email
// //                   </label>
// //                   <input
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     style={{
// //                       padding: "12px",
// //                       borderRadius: "10px",
// //                       border: "1px solid #F2C6A0",
// //                       background: "#FFF4EC",
// //                       fontSize: "14px",
// //                       outline: "none"
// //                     }}
// //                   />
// //                 </div>

// //                 {/* Reset Code */}
// //                 <div style={{ display: "flex", flexDirection: "column" }}>
// //                   <label style={{ marginBottom: "6px", fontWeight: "500" }}>
// //                     Reset Code
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={resetString}
// //                     onChange={(e) => setResetString(e.target.value)}
// //                     style={{
// //                       padding: "12px",
// //                       borderRadius: "10px",
// //                       border: "1px solid #F2C6A0",
// //                       background: "#FFF4EC",
// //                       fontSize: "14px",
// //                       outline: "none"
// //                     }}
// //                   />
// //                 </div>

// //                 {/* New Password */}
// //                 <div style={{ display: "flex", flexDirection: "column" }}>
// //                   <label style={{ marginBottom: "6px", fontWeight: "500" }}>
// //                     New Password
// //                   </label>
// //                   <input
// //                     type="password"
// //                     value={newPassword}
// //                     onChange={(e) => setNewPassword(e.target.value)}
// //                     style={{
// //                       padding: "12px",
// //                       borderRadius: "10px",
// //                       border: "1px solid #F2C6A0",
// //                       background: "#FFF4EC",
// //                       fontSize: "14px",
// //                       outline: "none"
// //                     }}
// //                   />
// //                 </div>
// //               </div>

// //               {/* Button */}
// //               <div style={{ marginTop: "35px", textAlign: "right" }}>
// //                 <button
// //                   type="submit"
// //                   style={{
// //                     padding: "12px 35px",
// //                     background: "linear-gradient(90deg,#CC5500,#ff8c00)",
// //                     color: "#fff",
// //                     border: "none",
// //                     borderRadius: "10px",
// //                     fontWeight: "600",
// //                     cursor: "pointer",
// //                     boxShadow: "0 5px 15px rgba(204,85,0,0.4)"
// //                   }}
// //                 >
// //                   Reset Password
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // }

// // import React, { useState } from "react";
// // import Footer from "./Footer";
// // import Topbar from "./Topbar";
// // import Navbar from "./Navbar";
// // import axios from "axios";
// // import toast, { Toaster } from "react-hot-toast";

// // export default function ForgotPassword() {

// //   const [email, setEmail] = useState("");
// //   const [resetString, setResetString] = useState("");
// //   const [newPassword, setNewPassword] = useState("");

// //   // SEND CODE
// //   const sendCode = async () => {
// //     if (!email) {
// //       toast.error("Enter email first");
// //       return;
// //     }

// //     const response = await axios.post(
// //       "http://localhost:8080/api/v1/forgotpwd",
// //       { email }
// //     );

// //     if (response.data.success) {
// //       toast.success("Reset code sent to email");
// //     } else {
// //       toast.error(response.data.message);
// //     }
// //   };

// //   // RESET PASSWORD
// //   const forgotPassword = async (e) => {
// //     e.preventDefault();

// //     if (!email || !resetString || !newPassword) {
// //       toast.error("All fields are required");
// //       return;
// //     }

// //     const response = await axios.post(
// //       "http://localhost:8080/api/v1/forgotpwd",
// //       {
// //         email,
// //         resetString,
// //         newPassword
// //       }
// //     );

// //     if (response.data.success) {
// //       toast.success(response.data.message);
// //       setEmail("");
// //       setResetString("");
// //       setNewPassword("");
// //     } else {
// //       toast.error(response.data.message);
// //     }
// //   };

// //   return (
// //     <div className="wrapper">
// //       <Topbar />
// //       <Navbar />
// //       <Toaster />

// //       <div
// //         style={{
// //           minHeight: "100vh",
// //           display: "flex",
// //           justifyContent: "center",
// //           alignItems: "center",
// //           fontFamily: "Segoe UI, sans-serif",
// //           padding: "40px",
// //           background: "#fff"
// //         }}
// //       >
// //         <div
// //           style={{
// //             width: "600px",
// //             background: "#ffffff",
// //             borderRadius: "20px",
// //             boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
// //             overflow: "hidden"
// //           }}
// //         >
// //           {/* Header */}
// //           <div
// //             style={{
// //               height: "90px",
// //               background: "linear-gradient(90deg,#CC5500,#ff8c00)"
// //             }}
// //           ></div>

// //           <div style={{ padding: "40px" }}>
// //             <div style={{ marginBottom: "30px" }}>
// //               <h3 style={{ margin: 0, color: "#CC5500" }}>
// //                 FORGOT PASSWORD 🔐
// //               </h3>
// //               <p style={{ margin: "5px 0", color: "#6b7280" }}>
// //                 Enter reset code sent to your email
// //               </p>
// //             </div>

// //             <form onSubmit={forgotPassword}>
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   gap: "20px"
// //                 }}
// //               >
// //                 {/* Email */}
// //                 <div style={{ display: "flex", flexDirection: "column" }}>
// //                   <label style={{ marginBottom: "6px", fontWeight: "500" }}>
// //                     Email
// //                   </label>
// //                   <input
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     style={{
// //                       padding: "12px",
// //                       borderRadius: "10px",
// //                       border: "1px solid #F2C6A0",
// //                       background: "#FFF4EC",
// //                       fontSize: "14px",
// //                       outline: "none"
// //                     }}
// //                   />

// //                   <button
// //                     type="button"
// //                     onClick={sendCode}
// //                     style={{
// //                       marginTop: "10px",
// //                       padding: "10px",
// //                       background: "#fff",
// //                       color: "#CC5500",
// //                       border: "1px solid #CC5500",
// //                       borderRadius: "8px",
// //                       cursor: "pointer",
// //                       fontWeight: "600",
// //                       width: "150px"
// //                     }}
// //                   >
// //                     Send Code
// //                   </button>
// //                 </div>

// //                 {/* Reset Code */}
// //                 <div style={{ display: "flex", flexDirection: "column" }}>
// //                   <label style={{ marginBottom: "6px", fontWeight: "500" }}>
// //                     Reset Code
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={resetString}
// //                     onChange={(e) => setResetString(e.target.value)}
// //                     style={{
// //                       padding: "12px",
// //                       borderRadius: "10px",
// //                       border: "1px solid #F2C6A0",
// //                       background: "#FFF4EC",
// //                       fontSize: "14px",
// //                       outline: "none"
// //                     }}
// //                   />
// //                 </div>

// //                 {/* New Password */}
// //                 <div style={{ display: "flex", flexDirection: "column" }}>
// //                   <label style={{ marginBottom: "6px", fontWeight: "500" }}>
// //                     New Password
// //                   </label>
// //                   <input
// //                     type="password"
// //                     value={newPassword}
// //                     onChange={(e) => setNewPassword(e.target.value)}
// //                     style={{
// //                       padding: "12px",
// //                       borderRadius: "10px",
// //                       border: "1px solid #F2C6A0",
// //                       background: "#FFF4EC",
// //                       fontSize: "14px",
// //                       outline: "none"
// //                     }}
// //                   />
// //                 </div>
// //               </div>

// //               <div style={{ marginTop: "35px", textAlign: "right" }}>
// //                 <button
// //                   type="submit"
// //                   style={{
// //                     padding: "12px 35px",
// //                     background: "linear-gradient(90deg,#CC5500,#ff8c00)",
// //                     color: "#fff",
// //                     border: "none",
// //                     borderRadius: "10px",
// //                     fontWeight: "600",
// //                     cursor: "pointer",
// //                     boxShadow: "0 5px 15px rgba(204,85,0,0.4)"
// //                   }}
// //                 >
// //                   Reset Password
// //                 </button>
// //               </div>

// //             </form>
// //           </div>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // // }
// // import React, { useState } from "react";
// // import Footer from "./Footer";
// // import Topbar from "./Topbar";
// // import Navbar from "./Navbar";
// // import axios from "axios";
// // import toast, { Toaster } from "react-hot-toast";
// // import { useNavigate } from "react-router-dom";

// // export default function ForgotPassword() {

// //   const [email, setEmail] = useState("");
// //   const navigate = useNavigate();

// //   const sendCode = async () => {
// //     if (!email) {
// //       toast.error("Enter email first");
// //       return;
// //     }

// //     try {

// //       const response = await axios.post(
// //         "http://localhost:8080/api/v1/forgotpwd",
// //         { email: email.trim() }
// //       );

// //       if (response.data.success) {
// //         toast.success("Reset code sent to email 📩");

// //         navigate("/resetpwd", { state: { email: email.trim() } });

// //       } else {
// //         toast.error(response.data.message);
// //       }

// //     } catch (error) {
// //       toast.error("Something went wrong");
// //     }
// //   };

// //   return (
// //     <div className="wrapper">
// //       <Topbar />
// //       <Navbar />
// //       <Toaster />

// //       <div
// //         style={{
// //           minHeight: "100vh",
// //           display: "flex",
// //           justifyContent: "center",
// //           alignItems: "center",
// //           fontFamily: "Segoe UI, sans-serif",
// //           padding: "40px",
// //           background: "#fff"
// //         }}
// //       >
// //         <div
// //           style={{
// //             width: "600px",
// //             background: "#ffffff",
// //             borderRadius: "20px",
// //             boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
// //             overflow: "hidden"
// //           }}
// //         >
// //           <div
// //             style={{
// //               height: "90px",
// //               background: "linear-gradient(90deg,#CC5500,#ff8c00)"
// //             }}
// //           ></div>

// //           <div style={{ padding: "40px" }}>
// //             <div style={{ marginBottom: "30px" }}>
// //               <h3 style={{ margin: 0, color: "#CC5500" }}>
// //                 FORGOT PASSWORD 🔐
// //               </h3>
// //               <p style={{ margin: "5px 0", color: "#6b7280" }}>
// //                 Enter your email to receive reset code
// //               </p>
// //             </div>

// //             <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
// //               <div style={{ display: "flex", flexDirection: "column" }}>
// //                 <label style={{ marginBottom: "6px", fontWeight: "500" }}>
// //                   Email
// //                 </label>
// //                 <input
// //                   type="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   style={{
// //                     padding: "12px",
// //                     borderRadius: "10px",
// //                     border: "1px solid #F2C6A0",
// //                     background: "#FFF4EC",
// //                     fontSize: "14px",
// //                     outline: "none"
// //                   }}
// //                 />
// //               </div>
// //             </div>

// //             <div style={{ marginTop: "35px", textAlign: "right" }}>
// //               <button
// //                 onClick={sendCode}
// //                 style={{
// //                   padding: "12px 35px",
// //                   background: "linear-gradient(90deg,#CC5500,#ff8c00)",
// //                   color: "#fff",
// //                   border: "none",
// //                   borderRadius: "10px",
// //                   fontWeight: "600",
// //                   cursor: "pointer",
// //                   boxShadow: "0 5px 15px rgba(204,85,0,0.4)"
// //                 }}
// //               >
// //                 Send Code
// //               </button>
// //             </div>

// //           </div>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // }



// import React, { useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import Topbar from "./Topbar";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// export default function ForgotPassword() {

//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const sendCode = async () => {
//     if (!email) return toast.error("Enter email");

//     const res = await axios.post("http://localhost:8080/api/v1/forgotpwd", {
//       email
//     });

//     if (res.data.success) {

//       // 💾 save in localStorage
//       localStorage.setItem("resetCode", res.data.code);
//       localStorage.setItem("resetEmail", email);

//       toast.success("Reset code sent");

//       navigate("/resetpwd");

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

//             <h2 style={{ color: "#CC5500", marginBottom: "10px" }}>
//               Forgot Password 🔐
//             </h2>

//             <p style={{ color: "#777", marginBottom: "20px" }}>
//               Enter your email to receive reset code
//             </p>

//             <input
//               type="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 borderRadius: "10px",
//                 border: "1px solid #F2C6A0",
//                 background: "#FFF4EC",
//                 outline: "none",
//                 marginBottom: "20px"
//               }}
//             />

//             <button
//               onClick={sendCode}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 border: "none",
//                 borderRadius: "10px",
//                 background: "linear-gradient(90deg,#CC5500,#ff8c00)",
//                 color: "#fff",
//                 fontWeight: "600",
//                 cursor: "pointer"
//               }}
//             >
//               Send Code
//             </button>

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