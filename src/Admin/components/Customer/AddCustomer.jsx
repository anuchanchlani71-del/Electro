
import Header from '../Header';
import Footer from '../Footer';
import SideMenu from '../SideMenu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast"



function AddCustomer() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [address, setAddress] = useState("")
  const [image, setImage] = useState("")
  console.log("data", firstName, lastName, email, mobile, address, image)
  const navigate = useNavigate();
  const addcustomer = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("first_name", firstName)
    formData.append("last_name", lastName)
    formData.append("email", email)
    formData.append("mobile", mobile)
    formData.append("address", address)
    formData.append("image", image)




    const response = await axios.post("http://localhost:8080/register", formData)
    console.log("response", response)
    if (response.data.success) {
      toast.success(response.data.message)
      setTimeout(() => {
        navigate('/admin/customer', { replace: true });
      }, 2000);
    }
    else {
      toast.error(response.data.message);
    }


  }

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />
      <Toaster />
      <div className="content-wrapper">

        {/* Page Header */}
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Add Customer</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="content">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-10">

                <div className="card shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h3 className="card-title m-0">Customer Information</h3>
                  </div>

                  <div className="card-body">
                    <form onSubmit={addcustomer}>


                      <div className="form-row">

                        <div className="form-group col-md-4">
                          <label>First Name <span style={{ color: "red" }}>* </span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter customer name"
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>Last Name <span style={{ color: "red" }}>* </span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={lastName}
                            placeholder="Enter customer name"
                            onChange={(e) => setlastName(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label>Email <span style={{ color: "red" }}>* </span></label>
                          <input
                            type="email"
                            className="form-control"
                            required
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>



                      </div>


                      <div className="form-row">

                        <div className="form-group col-md-4">
                          <label>Mobile <span style={{ color: "red" }}>* </span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={mobile}
                            placeholder="Enter mobile number"
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </div>


                        <div className="form-group col-md-4">
                          <label>Address <span style={{ color: "red" }}>* </span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={address}
                            placeholder="Enteraddress"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>



                        <div className="form-group col-md-4">
                          <label>image <span style={{ color: "red" }}>* </span></label>
                          <input
                            type="file"
                            className="form-control"
                            required

                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </div>



                      </div>


                      <div className="form-group text-right mt-3">
                        <Link
                          to="/admin/customer"
                          className="btn btn-secondary mr-2"
                        >
                          Cancel
                        </Link>

                        <button
                          type="submit"
                          className="btn btn-success"
                        >
                          Save Customer
                        </button>
                      </div>

                    </form>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default AddCustomer;
