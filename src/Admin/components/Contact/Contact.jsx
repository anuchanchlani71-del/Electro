
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import axios from "axios";
import Moment from "react-moment";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Switch } from "@mui/material";

function ContactManager() {

  const [contacts, setContacts] = useState([]);

  // search state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchContacts = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/viewcontact");
    if (response.data.success) {
      setContacts(response.data.data || []);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // search api
  const searchContact = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      "http://localhost:8080/api/v1/searchcontact",
      {
        params: {
          name: name,
          email: email,
          mobile: mobile
        }
      }
    );

    if (response.data.success) {
      setContacts(response.data.data);
    } else {
      console.log(response.data.message);
    }
  };

  // reset
  const handleReset = async (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setMobile("");
    fetchContacts();
  };

 const handleDelete = async (id) => {
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
      const response = await axios.delete(`http://localhost:8080/api/v1/deletecontact/${id}`)
     
      if (response.data.success) {
        fetchContacts();
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

const response = await axios.put(`http://localhost:8080/api/v1/statusupdate/${id}`,body)
console.log("response",response)
if (response.data.success) {
fetchContacts();
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
  const currentItems = contacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);






  const exportExcel = () => {
  const data = contacts.map((item, index) => ({
    "S.No": index + 1,
    "Name": item.name,
    "Email": item.email,
    "Mobile": item.mobile,
    "Project": item.project,
    "Subject": item.subject,
    "Message": item.message,
    "Created": item.createdAt
      ? new Date(item.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : ""
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 20 },
    { wch: 25 },
    { wch: 15 },
    { wch: 20 },
    { wch: 20 },
    { wch: 40 },
    { wch: 18 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const blob = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
  });

  saveAs(blob, "contacts.xlsx");
};


const exportPDF = () => {
  const doc = new jsPDF("l", "mm", "a4");

  const tableColumn = [
    "S.No",
    "Name",
    "Email",
    "Mobile",
    "Project",
    "Subject",
    "Message",
    "Created"
  ];

  const tableRows = [];

  contacts.forEach((item, index) => {
    const date = item.createdAt
      ? new Date(item.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : "";

    tableRows.push([
      index + 1,
      item.name || "",
      item.email || "",
      item.mobile || "",
      item.project || "",
      item.subject || "",
      item.message || "",
      date
    ]);
  });

  doc.text("Contact List", 14, 15);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: "linebreak"
    },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 30 },
      2: { cellWidth: 40 },
      3: { cellWidth: 25 },
      4: { cellWidth: 30 },
      5: { cellWidth: 30 },
      6: { cellWidth: 60 },
      7: { cellWidth: 25 }
    },
    theme: "grid"
  });

  doc.save("contacts.pdf");
};
  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Contact Manager</h1>

            {/* search box */}
            <form onSubmit={searchContact}>
            <div className="row mt-3">

              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}  
                />
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e)=>setMobile(e.target.value)}
                />
              </div>

              <div className="col-md-3 d-flex">

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-50 mr-2"
                >
                  Search
                </button>

                <button
                  onClick={handleReset}
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

             <div className="dropdown ml-auto">
  <button
 style={{marginLeft:"0px"}}
    className="btn btn-primary  dropdown-toggle"
    type="button"
data-bs-toggle="dropdown"
  >
    Export
  </button>

  <div className="dropdown-menu dropdown-menu-right">
    <button className="dropdown-item" onClick={exportPDF}>
      Export PDF
    </button>

    <button className="dropdown-item" onClick={exportExcel}>
      Export Excel
    </button>
  </div>
</div>

              <div className="card-body">
                <table className="table table-bordered table-striped text-center">
                  <thead className="thead-dark">
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Project</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1 + indexOfFirstItem}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.mobile}</td>
                          <td>{item.project}</td>
                          <td>{item.subject}</td>

                          <td style={{ maxWidth: "200px" }}>
                            {item.message}
                          </td>

                          <td>
                            <Moment format="D MMM YYYY">
                              {item.createdAt}
                            </Moment>
                          </td>
                          <td>
<Switch
 checked={item.status === true}
 onChange={()=>handleupdatestatus(item._id, item.status)}
/>




                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(item._id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-danger">
                          No Contact Messages Found
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>

                {contacts.length > itemsPerPage && (
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

export default ContactManager;