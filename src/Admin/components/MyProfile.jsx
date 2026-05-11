
import React, { useEffect, useState } from 'react'
import Hearder from './Header'
import SideMenu from './SideMenu'
import Footer from './Footer'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function MyProfile() {
  const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
       const [address, setaddress] = useState('');
         const [mobile, setmobile] = useState('');
const [email, setEmail] = useState('');
const [image,setimage] = useState('');
  const get_id = localStorage.getItem("_id")
  const fetchprofile=async()=>{
   
  const response=await axios.get("http://localhost:8080/api/v1/adminprofile", 
       { params: { _id: get_id }}
      )
  if(response.data.success){
    setEmail(response.data.data.email)
      setmobile(response.data.data.mobile)
        setaddress(response.data.data.address)
        setfirst_name(response.data.data.first_name)
        setlast_name(response.data.data.last_name)
         setimage(response.data.data.image)

  // console.log("response",response)
  }
  else{
    console.log("failed")
  }
// console.log("response",response)
  }
useEffect(() => {
  fetchprofile();
}, []);

  return (
    <div className="wrapper">
      <Hearder/>
      <SideMenu/>


    <div
      style={{
        minHeight: "100vh",
       
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
        padding: "40px"
      }}
    >
      <div
        style={{
          width: "850px",
          background: "#ffffff",
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
          {/* Profile Top Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img
                src={image}
                alt="profile"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  border: "5px solid #2563eb",
                  marginTop: "-80px",
                  background: "#fff",
                  objectFit: "cover"
                }}
              />
              <div>
                <h3 style={{ margin: 0,marginTop:"-20px", color: "#1e3a8a" }}>ELECTRO</h3>
                <p style={{ margin: "5px 0", color: "#6b7280" }}>
                  Update Your Profile Information
                </p>
              </div>
            </div>

              <Link to={`/admin/editprofile?_id=${get_id}`}
              style={{
                padding: "10px 25px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Edit
          </Link>
          </div>

          {/* Horizontal Form Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "25px"
            }}
          >
            {/* Full Name */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                first_name
              </label>
              <input
                type="text"
              value={first_name}
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  background: "#f8fafc",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>


                  <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                last_name
              </label>
              <input
                type="text"
             value={last_name}
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  background: "#f8fafc",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "6px", fontWeight: "500" }}>
              Enter your email
              </label>
              <input
                type="email"
              value=  {email}
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  background: "#f8fafc",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>

            {/* Mobile */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                Mobile Number
              </label>
              <input
                type="text"
              value={mobile}
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  background: "#f8fafc",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>

            {/* Address */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                Address
              </label>
              <textarea
             value={address}
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  background: "#f8fafc",
                  fontSize: "14px",
                  resize: "none",
                  minHeight: "80px"
                }}
              />
            </div>
          </div>

        
        
        </div>
      </div>
    </div>


      <Footer/>
    </div>
  )
}







// import React from 'react'
// import Hearder from './Header'
// import SideMenu from './SideMenu'
// import Footer from './Footer'

// export default function MyProfile() {
//   return (
//     <div className="wrapper">
//       <Hearder/>
//       <SideMenu/>

//       <div
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "flex-start",
//           fontFamily: "Segoe UI, sans-serif",
//           padding: "60px 20px",
//           background: "#f1f5f9"
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             gap: "40px",
//             width: "950px"
//           }}
//         >
//           {/* Left: Profile Card */}
//           <div
//             style={{
//               width: "280px",
//               background: "#ffffff",
//               borderRadius: "15px",
//               boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//               padding: "40px",
//               textAlign: "center"
//             }}
//           >
//             <div
//               style={{
//                 width: "140px",
//                 height: "140px",
//                 margin: "0 auto",
//                 borderRadius: "50%",
//                 overflow: "hidden",
//                 border: "3px solid #2563eb",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
//               }}
//             >
//               <img
//                 src="https://png.pngtree.com/png-vector/20230316/ourmid/pngtree-admin-and-customer-service-job-vacancies-vector-png-image_6650726.png"
//                 alt="profile"
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//             </div>
//             <h3 style={{ marginTop: "20px", color: "#1e3a8a", fontWeight: 600 }}>ELECTRO</h3>
//             <p style={{ color: "#6b7280", fontSize: "14px" }}>Update Your Profile Information</p>
//             <button
//               style={{
//                 marginTop: "25px",
//                 padding: "10px 30px",
//                 background: "#2563eb",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "8px",
//                 fontWeight: "600",
//                 cursor: "pointer",
//                 transition: "all 0.3s"
//               }}
//               onMouseOver={e => (e.currentTarget.style.background = "#1e40af")}
//               onMouseOut={e => (e.currentTarget.style.background = "#2563eb")}
//             >
//               Edit
//             </button>
//           </div>

//           {/* Right: Form Card */}
//           <div
//             style={{
//               flex: 1,
//               background: "#ffffff",
//               borderRadius: "15px",
//               boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//               padding: "40px"
//             }}
//           >
//             {/* Personal Info Section */}
//             <h4 style={{ color: "#1e3a8a", marginBottom: "20px", fontWeight: 600 }}>Personal Information</h4>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "25px", marginBottom: "30px" }}>
//               {[
//                 { label: "Full Name", type: "text" },
//                 { label: "Email Address", type: "email" },
//                 { label: "Mobile Number", type: "text" }
//               ].map(field => (
//                 <div key={field.label} style={{ display: "flex", flexDirection: "column" }}>
//                   <label style={{ marginBottom: "6px", fontWeight: 500 }}>{field.label}</label>
//                   <input
//                     type={field.type}
//                     placeholder={`Enter ${field.label.toLowerCase()}`}
//                     style={{
//                       padding: "12px",
//                       borderRadius: "8px",
//                       border: "1px solid #cbd5e1",
//                       background: "#f8fafc",
//                       fontSize: "14px",
//                       outline: "none",
//                       transition: "all 0.3s"
//                     }}
//                     onFocus={e => e.currentTarget.style.borderColor = "#2563eb"}
//                     onBlur={e => e.currentTarget.style.borderColor = "#cbd5e1"}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Address Section */}
//             <h4 style={{ color: "#1e3a8a", marginBottom: "20px", fontWeight: 600 }}>Address</h4>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "25px", marginBottom: "30px" }}>
//               <div style={{ display: "flex", flexDirection: "column", gridColumn: "1 / span 3" }}>
//                 <label style={{ marginBottom: "6px", fontWeight: 500 }}>Address</label>
//                 <textarea
//                   placeholder="Enter address"
//                   style={{
//                     padding: "12px",
//                     borderRadius: "8px",
//                     border: "1px solid #cbd5e1",
//                     background: "#f8fafc",
//                     fontSize: "14px",
//                     resize: "none",
//                     minHeight: "80px",
//                     transition: "all 0.3s"
//                   }}
//                   onFocus={e => e.currentTarget.style.borderColor = "#2563eb"}
//                   onBlur={e => e.currentTarget.style.borderColor = "#cbd5e1"}
//                 />
//               </div>
//             </div>

//             {/* Update Button */}
//             <div style={{ textAlign: "right" }}>
//               <button
//                 style={{
//                   padding: "12px 35px",
//                   background: "#2563eb",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "8px",
//                   fontWeight: "600",
//                   cursor: "pointer",
//                   transition: "all 0.3s"
//                 }}
//                 onMouseOver={e => (e.currentTarget.style.background = "#1e40af")}
//                 onMouseOut={e => (e.currentTarget.style.background = "#2563eb")}
//               >
//                 Update Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer/>
//     </div>
//   )
// }






// import React from "react";
// import Hearder from "./Header";
// import SideMenu from "./SideMenu";
// import Footer from "./Footer";

// export default function MyProfile() {
//   return (
//     <div className="wrapper">
//       <Hearder />
//       <SideMenu />

//       <div
//         style={{
//           minHeight: "80vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "20px",
//           background: "#f1f5f9",
//           fontFamily: "Segoe UI, sans-serif",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             background: "#fff",
//             borderRadius: "12px",
//             boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//             overflow: "hidden",
//             maxWidth: "900px",
//             width: "100%",
//           }}
//         >
//           {/* Left Column */}
//           <div
//             style={{
//               width: "35%",
//               background: "#f8fafc",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               padding: "30px 20px",
//             }}
//           >
//             <img
//               src="https://via.placeholder.com/120"
//               alt="profile"
//               style={{
//                 width: "120px",
//                 height: "120px",
//                 borderRadius: "50%",
//                 border: "4px solid #2563eb",
//                 objectFit: "cover",
//                 marginBottom: "15px",
//               }}
//             />
//             <h3 style={{ margin: "5px 0", color: "#1e3a8a" }}>
//               Your Name
//             </h3>
//             <p style={{ margin: "5px 0", color: "#6b7280", fontSize: "14px" }}>
//               your.email@example.com
//             </p>
        
//           </div>

//           {/* Right Column */}
//           <div style={{ flex: 1, padding: "30px 25px" }}>
//             <h3 style={{ marginBottom: "20px", color: "#1e3a8a" }}>
//               Profile Information
//             </h3>

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "15px",
//               }}
//             >
//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <label style={{ marginBottom: "5px", fontWeight: 500 }}>
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter first name"
//                   style={{
//                     padding: "10px",
//                     borderRadius: "8px",
//                     border: "1px solid #ccd6e0",
//                     outline: "none",
//                   }}
//                 />
//               </div>

//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <label style={{ marginBottom: "5px", fontWeight: 500 }}>
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter last name"
//                   style={{
//                     padding: "10px",
//                     borderRadius: "8px",
//                     border: "1px solid #ccd6e0",
//                     outline: "none",
//                   }}
//                 />
//               </div>

//               <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column" }}>
//                 <label style={{ marginBottom: "5px", fontWeight: 500 }}>Email</label>
//                 <input
//                   type="email"
//                   placeholder="Enter email"
//                   style={{
//                     padding: "10px",
//                     borderRadius: "8px",
//                     border: "1px solid #ccd6e0",
//                     outline: "none",
//                   }}
//                 />
//               </div>

//               <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column" }}>
//                 <label style={{ marginBottom: "5px", fontWeight: 500 }}>Address</label>
//                 <textarea
//                   placeholder="Enter address"
//                   style={{
//                     padding: "10px",
//                     borderRadius: "8px",
//                     border: "1px solid #ccd6e0",
//                     outline: "none",
//                     resize: "none",
//                     minHeight: "60px",
//                   }}
//                 />
//               </div>
//             </div>

//             <div style={{ textAlign: "right", marginTop: "20px" }}>
//               <button
//                 style={{
//                   padding: "10px 25px",
//                   background: "#3b82f6",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "8px",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                 }}
//               >
//                 Update Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }