
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";
import Swal from "sweetalert2";
import { Switch } from '@mui/material';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


function Customer() {

  const [customers, setCustomer] = useState([]);


  const [first_name, setfirst_name] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");


  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchUser = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/viewcustomer");
    if (response.data.success) {
      setCustomer(response.data.data || []);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

 const searchcustomer=async(e)=>{
  e.preventDefault();

const response=await axios.get("http://localhost:8080/searchcustomer",
{params:{
  first_name:first_name,
  email:email,
  mobile:mobile
}}
)
console.log("response",response.data.data)
if(response.data.success){
   setCustomer(response.data.data);
}
else{
console.log(response.data.message);
}
 }

 const handleReset=async (e) => {
  e.preventDefault();
  setfirst_name("")
  setemail("")
  setmobile("")
  fetchUser();
 }

  const handleDelete = async (itemId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will not be able to recover this item!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel'
    });

    if (result.isConfirmed) {
      Swal.showLoading();
      const response = await axios.delete(`http://localhost:8080/delete/${itemId}`)

      if (response.data.success) {
        fetchUser();
        Swal.fire(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        );
      } else {
        Swal.fire({
          title: "Ooops!!!",
          text: response.data.message,
          icon: "error"
        });
      }
    } 
  };

const handleupdatestatus = async (id,status) => {

const result = await Swal.fire({
title: 'Are you sure?',
text: "you wan't to update",
icon: 'warning',
showCancelButton: true,
confirmButtonColor: '#DD6B55',
confirmButtonText: 'Yes, change it!',
cancelButtonText: 'No, cancel'
});

if (result.isConfirmed) {

Swal.showLoading();

const body={
 status:status
}

const response = await axios.put(`http://localhost:8080/updatestatus/${id}`,body)

if (response.data.success) {
fetchUser();
Swal.fire({
title: "success!!!",
text: response.data.message,
icon: "success"
});
}
}
};

// pagination logic
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(customers.length / itemsPerPage);
const paginate = (pageNumber) => setCurrentPage(pageNumber);

const exportExcel = () => {
  const data = customers.map((customer, index) => ({
    "S.No": index + 1,
    "Name": `${customer.first_name} ${customer.last_name}`,
    "Email": customer.email,
    "Mobile": customer.mobile,
    "Created": customer.createdAt
      ? new Date(customer.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : ""
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 25 },
    { wch: 25 },
    { wch: 18 },
    { wch: 18 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const blob = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
  });

  saveAs(blob, "customers.xlsx");
};

const exportPDF = () => {
  const doc = new jsPDF("l", "mm", "a4");

  const tableColumn = [
    "S.No",
    "Name",
    "Email",
    "Mobile",
    "Created"
  ];

  const tableRows = [];

  customers.forEach((customer, index) => {
    const date = customer.createdAt
      ? new Date(customer.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : "";

    tableRows.push([
      index + 1,
      `${customer.first_name || ""} ${customer.last_name || ""}`,
      customer.email || "",
      customer.mobile || "",
      date
    ]);
  });

  doc.text("Customer List", 14, 15);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    theme: "grid",
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: "linebreak"
    },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 40 },
      2: { cellWidth: 50 },
      3: { cellWidth: 30 },
      4: { cellWidth: 30 }
    }
  });

  doc.save("customers.pdf");
};
  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Customers Manager</h1>

            <form onSubmit={searchcustomer}>
            <div className="row mt-3">

              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={first_name}
                 onChange={(e)=>{
                  setfirst_name(e.target.value)
                 }}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                   value={email}
                 onChange={(e)=>{
                  setemail(e.target.value)
                 }}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile"
                  name="mobile"
                    value={mobile}
                 onChange={(e)=>{
                  setmobile(e.target.value)
                 }}
                />
              </div>

              <div className="col-md-3 d-flex">

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-50 mr-2"
                >
                  Search
                </button>

                <button onClick={handleReset}
                  type="reset"
                  className="btn btn-secondary btn-lg w-50"
                >
                  Reset
                </button>

              </div>
            </div>
            </form>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">
            <div className="card">

             <div className="card-header d-flex align-items-center">

  <h3 className="card-title m-0 font-weight-bold">
    Customer List
  </h3>

  <div className="ml-auto d-flex">

    {/* Add Customer Button */}
    <Link to="/admin/add-customer" className="btn btn-success mr-2">
      <i className="fas fa-plus mr-2"></i>
      Add Customer
    </Link>

    {/* Export Dropdown */}
    <div className="dropdown">
      <button
        className="btn btn-primary  dropdown-toggle"
        type="button"
       data-bs-toggle="dropdown"
      >
        Export
      </button>

      <div className="dropdown-menu  dropdown-menu-end">
        <button className="dropdown-item" onClick={exportPDF}>
          Export PDF
        </button>

        <button className="dropdown-item" onClick={exportExcel}>
          Export Excel
        </button>
      </div>
    </div>

  </div>

</div>

              <div className="card-body">
                <table className="table table-bordered table-striped text-center">
                  <thead className="thead-dark">
                    <tr>
                      <th>S.No</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Mobile</th>
                      <th>Email</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((customer, index) => (
                        <tr key={customer._id}>
                          <td>{index + 1 + indexOfFirstItem}</td>

                          <td>
                            <img
                              src={customer.image || "https://via.placeholder.com/50"}
                              alt="profile"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                objectFit: "cover"
                              }}
                            />
                          </td>

                          <td>
                            {customer.first_name} {customer.last_name}
                          </td>

                          <td>{customer.mobile}</td>
                          <td>{customer.email}</td>

                          <td>
                            <Moment format="D MMM YYYY">
                              {customer.createdAt}
                            </Moment>
                          </td>

                          <td>
<Switch
 checked={customer.status === true}
 onChange={()=>handleupdatestatus(customer._id, customer.status)}
/>

                            <Link
                              to={`/admin/edit-customer?_id=${customer._id}`}
                              className="btn btn-sm btn-primary mr-2"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>

                            <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(customer._id)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-danger">
                          No Customers Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* pagination */}
                {customers.length > itemsPerPage && (
                  <div className="d-flex justify-content-end mt-3">
                    <ul className="pagination">
                      {[...Array(totalPages)].map((_, index) => (
                        <li
                          key={index}
                          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default Customer;