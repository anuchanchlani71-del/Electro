
import Header from '../Header';
import Footer from '../Footer';
import SideMenu from '../SideMenu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast"




function Addproduct() {
  const [name, setName] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState("")
  const [stock, setstock] = useState("")
  const [cat_id, setcat_id] = useState("")
  const [image, setImage] = useState("")
  const [categories, setCategories] = useState([])
  console.log("data", name, description, image, stock, price, cat_id)
  const navigate = useNavigate();





  const fetchcategory = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8080/admin/viewcategory")
    console.log("response", response)
    if (response.data.success) {
      setCategories(response.data.data || [])
    } else {

    }
  }

  useEffect(() => {
    fetchcategory();
  }, [])

  const addproducts = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name)
    formData.append("description", description)
    formData.append("image", image)
    formData.append("stock", stock)
    formData.append("price", price)
    formData.append("cat_id", cat_id)



    const response = await axios.post("http://localhost:8080/admin/products", formData)
    console.log("response", response)
    if (response.data.success) {
      toast.success(response.data.message)
      setTimeout(() => {
        navigate('/admin/products', { replace: true });
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
            <h1 className="m-0">Add product</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="content">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-10">

                <div className="card shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h3 className="card-title m-0">product Information</h3>
                  </div>

                  <div className="card-body">
                    <form onSubmit={addproducts}>


                      <div className="form-row">


                        <div className="form-group col-md-4">
                          <label>  name <span style={{ color: "red" }}>* </span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={name}
                            placeholder="Enter product name"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label>  price <span style={{ color: "red" }}>* </span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={price}
                            placeholder="Enter price"
                            onChange={(e) => setprice(e.target.value)}
                          />
                        </div>


                        <div className="form-group col-md-4">
                          <label> description  <span style={{ color: "red" }}>* </span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={description}
                            placeholder="Enter description"
                            onChange={(e) => setdescription(e.target.value)}
                          />
                        </div>


                      </div>


                      <div className="form-row">


                        <div className="form-group col-md-4">
                          <label> stock  <span style={{ color: "red" }}>* </span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={stock}
                            placeholder="Enter stock"
                            onChange={(e) => setstock(e.target.value)}
                          />
                        </div>


                        <div>
                          <label>category  <span style={{ color: "red" }}>* </span></label>
                          <select
                            className="form-group col-md-12" style={{height:"30px",marginLeft:"3px"}}

                            value={cat_id}
                            required
                            onChange={(e) => setcat_id(e.target.value)}
                          >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                              <option key={cat._id} value={cat._id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>


                        <div className="form-group col-md-4">
                          <label>image  <span style={{ color: "red" }}>* </span></label>
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
                          to="/admin/products"
                          className="btn btn-secondary mr-2"
                        >
                          Cancel
                        </Link>

                        <button
                          type="submit"
                          className="btn btn-success"
                        >
                          Submit
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

export default Addproduct;
