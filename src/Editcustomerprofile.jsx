import React, { useEffect, useState } from "react";

import Footer from './Footer'
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function EditCustomer() {





const [searchParams] = useSearchParams();
    const _id = searchParams.get("_id");
console.log("id....",_id)


 const [firstName,setFirstName]=useState("")
 const [lastName,setlastName]=useState("")
 const [email,setEmail]=useState("")
 const [mobile,setMobile]=useState("")
 const [address,setAddress]=useState("")
 const [image,setImage]=useState("")
console.log("data",firstName,lastName,email,mobile,address,image)



  const get_id=localStorage.getItem("user_id")
const myprofile=async()=>{

  const response=await axios.get("http://localhost:8080/api/v1/myprofile",   { params: { _id: get_id }})




  if(response.data.success){
    setFirstName(response.data.data.first_name)
      setlastName(response.data.data.last_name)
        setEmail(response.data.data.email)
          setAddress(response.data.data.address)
           setImage(response.data.data.image)
              setMobile(response.data.data.mobile)
  }
}


useEffect(()=>{
  myprofile();
},[])


const navigate = useNavigate();
 const EditCustomerprofile=async(e)=>{
  e.preventDefault();






const formData= new FormData();
formData.append("first_name",firstName)
formData.append("last_name",lastName)
formData.append("email",email)
formData.append("mobile",mobile)
formData.append("address",address)
formData.append("image",image)









const response=await axios.put(`http://localhost:8080/api/v1/updateprofile/${_id}`,formData)
console.log("response",response)
if(response.data.success){
toast.success(response.data.message)
setTimeout(() => {
     
      toast.success(response.data.message);
       navigate('/myprofile',{ replace: true });
}, 2000);
}
else{
toast.error(response.data.message);
}


 }


  return (
    <div className="wrapper">
   <Toaster/>
<Topbar/>
     <Navbar/>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          background: "#fff",
          fontFamily: "Segoe UI, sans-serif"
        }}
      >
        <div
          style={{
            width: "900px",
            background: "#fff",
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "35px"
              }}
            >
            

              <div>
                <h3 style={{ margin: 0, color: "#CC5500" }}>
                  Edit Customer
                </h3>
                <p style={{ margin: "5px 0", color: "#6b7280" }}>
                  Update customer information
                </p>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={EditCustomerprofile}>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "25px"
                }}
              >

                {/* First Name */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    First Name
                  </label>
                  <input
                    type="text"
                   value={firstName}
                            onChange={(e)=>setFirstName(e.target.value)}
                            placeholder="Enter customer name"
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #F2C6A0",
                      background: "#FFF4EC",
                      outline: "none"
                    }}
                  />
                </div>

                {/* Last Name */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                  value={lastName}
                            placeholder="Enter customer name" 
                             onChange={(e)=>setlastName(e.target.value)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #F2C6A0",
                      background: "#FFF4EC",
                      outline: "none"
                    }}
                  />
                </div>

                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    Email
                  </label>
                  <input
                    type="email"
                  value={email}
                            placeholder="Enter email"
                              onChange={(e)=>setEmail(e.target.value)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #F2C6A0",
                      background: "#FFF4EC",
                      outline: "none"
                    }}
                  />
                </div>

                {/* Mobile */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    Mobile
                  </label>
                  <input
                    type="text"
                    value={mobile}
                            placeholder="Enter mobile number"
                              onChange={(e)=>setMobile(e.target.value)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #F2C6A0",
                      background: "#FFF4EC",
                      outline: "none"
                    }}
                  />
                </div>

                {/* Address */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    Address
                  </label>
                  <input
                    type="text"
                   value={address}
                            placeholder="Enteraddress"
                              onChange={(e)=>setAddress(e.target.value)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #F2C6A0",
                      background: "#FFF4EC",
                      outline: "none"
                    }}
                  />
                </div>

                {/* Image */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginBottom: "6px", fontWeight: "500" }}>
                    Upload Image
                  </label>
                  <input
                    type="file"
                     onChange={(e)=>setImage(e.target.files[0])}
                    style={{
                      padding: "10px",
                      borderRadius: "10px",
                      border: "1px solid #F2C6A0",
                      background: "#FFF4EC"
                    }}
                  />
                </div>

              </div>

              {/* Buttons */}
              <div
                style={{
                  marginTop: "40px",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "15px"
                }}
              >
                <button
                  type="button"
                  style={{
                    padding: "12px 30px",
                    background: "#6b7280",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    padding: "12px 35px",
                      background: "linear-gradient(90deg,#ffc000,#A94400)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 5px 15px rgba(204,85,0,0.4)"
                  }}
                >
                  Save Customer
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}