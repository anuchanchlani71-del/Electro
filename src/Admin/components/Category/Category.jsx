// import { useEffect, useState } from "react";
// import Header from "../Header";
// import Footer from "../Footer";
// import SideMenu from "../SideMenu";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Moment from "react-moment";
// import Swal from 'sweetalert2';
// import { Switch } from "@mui/material";

// function Category() {

//   const [category, setcategory] = useState([]);
//   const [name, setname] = useState("");

//   const fetchUser = async () => {
//     const response = await axios.get("http://localhost:8080/api/category/list");
//     console.log("response", response);
//     if (response.data.success) {
//       setcategory(response.data.data || []);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const searchcategory = async (e) => {
//     e.preventDefault();
//     const response = await axios.get("http://localhost:8080/searchcategory",
//       {
//         params: {
//           name: name,

//         }
//       }
//     )
//     if (response.data.success) {
//       setcategory(response.data.data);
//     }
//     else {
//       console.log(response.data.message);
//     }
//   }

//   // reset
//   const handleReset = async (e) => {
//     e.preventDefault();
//     setname("")
//     fetchUser();
//   }



//   const handleDelete = async (itemId) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You will not be able to recover this item!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#DD6B55',
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'No, cancel'
//     });

//     if (result.isConfirmed) {
//       // User clicked 'Yes', proceed with the async delete operation
//       Swal.showLoading(); // Show a loading state
//       const response = await axios.delete(`http://localhost:8080/admin/deletecategory/${itemId}`)
//       // const isDeleted = await deleteItemFromServer(itemId);

//       if (response.data.success) {
//         fetchUser();
//         Swal.fire(
//           'Deleted!',
//           'Your item has been deleted.',
//           'success'
//         );
//         // You can also add logic here to update the UI (e.g., remove the item from a list in state)
//       } else {
//         Swal.fire({
//           title: "Ooops!!!",
//           text: response.data.message,
//           icon: "error"
//         });
//       }
//     } 
//     // else if (result.dismiss === Swal.DismissReason.cancel) {
//     //   // User clicked 'No, cancel' or dismissed the dialog
//     //   Swal.fire(
//     //     'Cancelled',
//     //     'Your item is safe :)',
//     //     'info'
//     //   );
//     // }
//   };



//   const handleupdatestatus = async (id,status) => {

// const result = await Swal.fire({
// title: 'Are you sure?',
// text: "you wan't to update",
// icon: 'warning',
// showCancelButton: true,
// confirmButtonColor: '#DD6B55',
// confirmButtonText: 'Yes, change it!',
// cancelButtonText: 'No, cancel'
// });

// if (result.isConfirmed) {

// Swal.showLoading();

// const body={
//  status:status
// }

// const response = await axios.put(`http://localhost:8080/category/statusupdate/${id}`,body)

// if (response.data.success) {
// fetchUser();
// Swal.fire({
// title: "success!!!",
// text: response.data.message,
// icon: "success"
// });
// }
// }
// };









//   return (
//     <div className="wrapper">
//       <Header />
//       <SideMenu />

//       <div className="content-wrapper">

//         <div className="content-header">
//           <div className="container-fluid">
//             <h1 className="m-0">Category Manager</h1>

//             {/* Search + Reset */}
//             <form onSubmit={searchcategory}>
//               <div className="row mt-3">
//                 <div className="col-md-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Category Name"
//                     name="categoryname"
//                     value={name}
//                     onChange={(e) => {
//                       setname(e.target.value)
//                     }}
//                   />
//                 </div>

//                 <div className="col-md-3 d-flex">
//                   <button
//                     type="submit"
//                     className="btn btn-primary btn-lg w-50 mr-2"
//                   >
//                     Search
//                   </button>

//                   <button onClick={handleReset}
//                     type="reset"
//                     className="btn btn-secondary btn-lg w-50"
//                   >
//                     Reset
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* TABLE SECTION */}
//         <div className="content">
//           <div className="container-fluid">
//             <div className="card">

//               <div className="card-header d-flex align-items-center">
//                 <h3 className="card-title m-0 font-weight-bold">
//                   Category List
//                 </h3>

//                 <div className="ml-auto">
//                   <Link to="/admin/AddCategory" className="btn btn-success">
//                     <i className="fas fa-plus mr-2"></i>
//                     Add Category
//                   </Link>
//                 </div>
//               </div>

//               <div className="card-body">
//                 <table className="table table-bordered table-striped text-center">
//                   <thead className="thead-dark">
//                     <tr>
//                       <th>S.No</th>
//                       <th>Image</th>
//                       <th>Name</th>
//                       <th>Description</th>
//                       <th>Created</th>
                    
//                       <th>Actions</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {category.length > 0 ? (
//                       category.map((category, index) => (
//                         <tr key={category.id}>
//                           <td>{index + 1}</td>

//                           <td>
//                             <img
//                               src={category.image || "https://via.placeholder.com/50"}
//                               alt="category"
//                               style={{
//                                 width: "50px",
//                                 height: "50px",
//                                 borderRadius: "50%",
//                                 objectFit: "cover"
//                               }}
//                             />
//                           </td>

//                           <td>{category.name}</td>
//                           <td>{category.description}</td>

//                           <td>
//                             <Moment format="D MMM YYYY">
//                               {category.createdAt}
//                             </Moment>
//                           </td>

//                           {/* <td>
//                             {category.status ? (
//                               <span className="badge badge-success">Active</span>
//                             ) : (
//                               <span className="badge badge-danger">Inactive</span>
//                             )}
//                           </td> */}

//                           <td>


//                             <Switch
//                              checked={category.status == true}
//                              onChange={()=>handleupdatestatus(category._id, category.status)}
//                             />
//                             <Link
//                               to={`/admin/edit-category?_id=${category._id}`}
//                               className="btn btn-sm btn-primary mr-2"
//                             >
//                               <i className="fas fa-edit"></i>
//                             </Link>

//                             <button className="btn btn-sm btn-danger" onClick={() => handleDelete(category._id)}>
//                               <i className="fas fa-trash"></i>
//                             </button>
//                           </td>

//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="7" className="text-danger">
//                           No Category Found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>

//                 </table>
//               </div>

//             </div>

//           </div>

//         </div>


//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Category;

import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import Swal from 'sweetalert2';
import { Switch } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Category() {

  const [category, setcategory] = useState([]);
  const [name, setname] = useState("");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchUser = async () => {
    const response = await axios.get("http://localhost:8080/api/category/list");
    console.log("response", response);
    if (response.data.success) {
      setcategory(response.data.data || []);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const searchcategory = async (e) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:8080/searchcategory",
      {
        params: {
          name: name,

        }
      }
    )
    if (response.data.success) {
      setcategory(response.data.data);
    }
    else {
      console.log(response.data.message);
    }
  }

  // reset
  const handleReset = async (e) => {
    e.preventDefault();
    setname("")
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
      const response = await axios.delete(`http://localhost:8080/admin/deletecategory/${itemId}`)

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

const response = await axios.put(`http://localhost:8080/category/statusupdate/${id}`,body)

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
const currentItems = category.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(category.length / itemsPerPage);
const paginate = (pageNumber) => setCurrentPage(pageNumber);





const exportPDF = () => {
  const doc = new jsPDF("l", "mm", "a4");

  const tableColumn = [
    "S.No",
    "Name",
    "Description",
    "Created Date",
    "Status"
  ];

  const tableRows = [];

  category.forEach((cat, index) => {
    const date = cat.createdAt
      ? new Date(cat.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : "";

    tableRows.push([
      index + 1,
      cat.name || "",
      cat.description || "",
      date,
      cat.status ? "Active" : "Inactive"
    ]);
  });

  doc.text("Category List", 14, 15);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 9, cellPadding: 2 },
    theme: "grid"
  });

  doc.save("category.pdf");
};


const exportExcel = () => {
  const data = category.map((cat, index) => ({
    "S.No": index + 1,
    "Name": cat.name,
    "Description": cat.description,

    "Created Date": cat.createdAt
      ? new Date(cat.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : "",

    "Status": cat.status ? "Active" : "Inactive"
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 25 },
    { wch: 40 },
    { wch: 20 },
    { wch: 15 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Category");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const blob = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
  });

  saveAs(blob, "category.xlsx");
};

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Category Manager</h1>

            <form onSubmit={searchcategory}>
              <div className="row mt-3">
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Category Name"
                    name="categoryname"
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value)
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

  <div className="ml-auto d-flex align-items-center">

  {/* Add Category Button */}
  <Link
    to="/admin/AddCategory"
    className="btn btn-success mr-2 d-flex align-items-center"
  >
    <i className="fas fa-plus mr-2"></i>
    Add Category
  </Link>

  {/* Dropdown */}
  <div className="dropdown d-flex align-items-center" style={{ alignSelf: "center" }}>

    <button
      className="btn btn-primary dropdown-toggle"
      type="button"
     data-bs-toggle="dropdown"
      style={{
        lineHeight: "1.5",
        display: "flex",
        alignItems: "center"
      }}
    >
      Export
    </button>

    <div className="dropdown-menu dropdown-menu-end">

      <button className="dropdown-item" onClick={exportPDF}>
        Export PDF
      </button>

      <button className="dropdown-item" onClick={exportExcel}>
        Export Excel
      </button>

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
                      <th>Description</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((category, index) => (
                        <tr key={category.id}>
                          <td>{index + 1 + indexOfFirstItem}</td>

                          <td>
                            <img
                              src={category.image || "https://via.placeholder.com/50"}
                              alt="category"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                objectFit: "cover"
                              }}
                            />
                          </td>

                          <td>{category.name}</td>
                          <td>{category.description}</td>

                          <td>
                            <Moment format="D MMM YYYY">
                              {category.createdAt}
                            </Moment>
                          </td>

                          <td>
                            <Switch
                             checked={category.status == true}
                             onChange={()=>handleupdatestatus(category._id, category.status)}
                            />
                            <Link
                              to={`/admin/edit-category?_id=${category._id}`}
                              className="btn btn-sm btn-primary mr-2"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>

                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(category._id)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-danger">
                          No Category Found
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>

                {/* pagination */}
                {category.length > itemsPerPage && (
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

export default Category;