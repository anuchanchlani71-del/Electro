
import React, { useEffect, useState } from 'react'
import Hearder from './Header'
import SideMenu from './SideMenu'
import Footer from './Footer'
import axios from 'axios'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

export default function MyProfile() {


const [searchParams] = useSearchParams();
    const _id = searchParams.get("_id");




  const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
       const [address, setaddress] = useState('');
         const [mobile, setmobile] = useState('');
const [email, setEmail] = useState('');
const [image,setimage] = useState('');

  const fetchprofile=async()=>{
      const get_id = localStorage.getItem("_id")
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


const navigate = useNavigate();
 const Editadminprofile=async(e)=>{
  e.preventDefault();






const formData= new FormData();
formData.append("first_name",first_name)
formData.append("last_name",last_name)
formData.append("email",email)
formData.append("mobile",mobile)
formData.append("address",address)
formData.append("image",image)









const response=await axios.put(`http://localhost:8080/updateprofile/${_id}`,formData)

if(response.data.success){
toast.success(response.data.message)
setTimeout(() => {
     
      toast.success(response.data.message);
       navigate('/admin/Profile',{ replace: true });
}, 2000);
}
else{
toast.error(response.data.message);
}


 }


  return (
    <div className="wrapper">
      <Hearder/>
      <SideMenu/>
<Toaster/>

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

              <Link to={`/admin/changepwd`}
              style={{
                padding: "10px 25px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
                marginLeft:"150px"
              }}
            >
              change password
          </Link>
            </div>

          </div>

          {/* Horizontal Form Section */}
          <form onSubmit={Editadminprofile}>
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    Upload Image
                  </label>
                  <input
                    type="file"
                     onChange={(e)=>setimage(e.target.files[0])}
                    style={{
                      padding: "10px",
                      borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                  background: "#f8fafc",
                    }}
                  />
                </div>
        
          </div>
          

          {/* Update Button */}
          <div style={{ marginTop: "40px", textAlign: "right" }}>
            <button
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
              Update Profile
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





