import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import SideMenu from '../SideMenu';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

function AddSlider() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const addSliderLogic = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:8080/admin/slider", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/admin/sliders', { replace: true });
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("An error occurred while uploading. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />
      <Toaster />

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Add Slider</h1>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="card shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h3 className="card-title m-0">Slider Information</h3>
                  </div>

                  <div className="card-body">
                    <form onSubmit={addSliderLogic}>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Title <span style={{ color: "red" }}>*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={title}
                            placeholder="Primary slider text"
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label>Subtitle <span style={{ color: "red" }}>*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={subtitle}
                            placeholder="Above the title (e.g. Save up to $400)"
                            onChange={(e) => setSubtitle(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Description <span style={{ color: "red" }}>*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={description}
                            placeholder="Enter small description"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label>Button Link <span style={{ color: "red" }}>*</span></label>
                          <input
                            type="text"
                            className="form-control"

                            value={link}
                            placeholder="E.g., /shop"
                            onChange={(e) => setLink(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Image <span style={{ color: "red" }}>*</span></label>
                          <input
                            type="file"
                            className="form-control"
                            required
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </div>
                      </div>

                      <div className="form-group text-right mt-3">
                        <Link to="/admin/sliders" className="btn btn-secondary mr-2">
                          Cancel
                        </Link>
                        <button type="submit" className="btn btn-success">
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

export default AddSlider;
