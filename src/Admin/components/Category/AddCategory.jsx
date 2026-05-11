
import Header from '../Header';
import Footer from '../Footer';
import SideMenu from '../SideMenu';
import { Link} from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast"



function AddCategory() {
 const [name,setName]=useState("")
 const [description,setdescription]=useState("")
 const [image,setImage]=useState("")
console.log("data",name,description,image)
const navigate = useNavigate();
 const addCategory=async(e)=>{
  e.preventDefault();


const formData= new FormData();
formData.append("name",name)
formData.append("description",description)
formData.append("image",image)




const response=await axios.post("http://localhost:8080/api/category/add",formData)
console.log("response",response)
if(response.data.success){
toast.success(response.data.message)
setTimeout(() => {
      navigate('/admin/categories',{ replace: true });
}, 2000);
}
else{
toast.error(response.data.message);
}


 }

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />
<Toaster/>
      <div className="content-wrapper">

        {/* Page Header */}
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Add Category</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="content">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-10">

                <div className="card shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h3 className="card-title m-0">Category Information</h3>
                  </div>

                  <div className="card-body">
                    <form onSubmit={addCategory}>

                    
                      <div className="form-row">

                    
                        <div className="form-group col-md-4">
                          <label>  name <span style={{color:"red"}}>* </span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={name}
                            placeholder="Enter category name" 
                             onChange={(e)=>setName(e.target.value)}
                          />
                        </div>

                       
                        <div className="form-group col-md-4">
                          <label> description  <span style={{color:"red"}}>* </span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={description}
                            placeholder="Enter description"
                              onChange={(e)=>setdescription(e.target.value)}
                          />
                        </div>

                
                      </div>

                      
                      <div className="form-row">
                       
                        <div className="form-group col-md-4">
                          <label>image  <span style={{color:"red"}}>* </span></label>
                          <input
                            type="file"
                            className="form-control"
                            required
                            
                              onChange={(e)=>setImage(e.target.files[0])}
                          />
                        </div>



                      </div>

                     
                      <div className="form-group text-right mt-3">
                        <Link
                          to="/admin/categories"
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

export default AddCategory;
