// import { useEffect, useState } from "react";
// import Header from "../Header";
// import Footer from "../Footer";
// import SideMenu from "../SideMenu";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Moment from 'react-moment';
// import Swal from "sweetalert2";
// import { Switch } from "@mui/material";

// function Product() {


//     const [name, setname] = useState("");
//     const [cat_id, setcat_id] = useState("");

//     const [Product, setProduct] = useState([]);
//     const [category, setcategory] = useState("");
//     const [categories, setCategories] = useState([]);

//     const fetchUser = async () => {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8080/admin/viewproduct")
//         console.log("response", response)
//         if (response.data.success) {
//             setProduct(response.data.data || [])
//         } else {

//         }
//     }


//     const fetchcategory = async () => {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8080/admin/viewcategory")
//         console.log("response", response)
//         if (response.data.success) {
//             setCategories(response.data.data || [])
//         } else {

//         }
//     }

//     useEffect(() => {
//         fetchUser();
//         fetchcategory();
//     }, [])


//     const searchproduct = async (e) => {
//         e.preventDefault();


//         const response = await axios.get("http://localhost:8080/searchproduct",
//             {
//                 params: {
//                     name: name,
//                     cat_id: cat_id
//                 }
//             }
//         )



//         console.log("response", response.data.data)
//         if (response.data.success) {
//             setProduct(response.data.data);
//         }
//         else {
//             console.log(response.data.message);
//         }


//     }






//     // reset

//     const handleReset = async (e) => {
//         e.preventDefault();
//         setname("")
//         setcat_id("")
//         setcategory("")
//         fetchUser();
//     }





//     const handleDelete = async (itemId) => {
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: "You will not be able to recover this item!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#DD6B55',
//             confirmButtonText: 'Yes, delete it!',
//             cancelButtonText: 'No, cancel'
//         });

//         if (result.isConfirmed) {

//             Swal.showLoading();
//             const response = await axios.delete(`http://localhost:8080/deleteproduct/${itemId}`)


//             if (response.data.success) {
//                 fetchUser();
//                 Swal.fire(
//                     'Deleted!',
//                     'Your item has been deleted.',
//                     'success'
//                 );

//             } else {
//                 Swal.fire({
//                     title: "Ooops!!!",
//                     text: response.data.message,
//                     icon: "error"
//                 });
//             }
//         }

//     };

//     const handleupdatestatus = async (id, status) => {

//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: "you wan't to update",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#DD6B55',
//             confirmButtonText: 'Yes, change it!',
//             cancelButtonText: 'No, cancel'
//         });

//         if (result.isConfirmed) {

//             Swal.showLoading();

//             const body = {
//                 status: status
//             }

//             const response = await axios.put(`http://localhost:8080/product/statusupdate/${id}`, body)

//             if (response.data.success) {
//                 fetchUser();
//                 Swal.fire({
//                     title: "success!!!",
//                     text: response.data.message,
//                     icon: "success"
//                 });
//             }
//         }
//     };


//     return (
//         <div className="wrapper">
//             <Header />
//             <SideMenu />

//             <div className="content-wrapper">

//                 <div className="content-header">
//                     <div className="container-fluid">
//                         <h1 className="m-0">Product Manager</h1>

//                         <form onSubmit={searchproduct}>
//                             <div className="row mt-3">

//                                 <div className="col-md-3">
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         placeholder="Search by Productname"
//                                         value={name}
//                                         onChange={(e) => setname(e.target.value)}
//                                     />
//                                 </div>



//                                 <select
//                                     className="form-control col-md-4"
//                                     value={cat_id}
//                                     onChange={(e) => setcat_id(e.target.value)}
//                                 >
//                                     <option value="">Select Category</option>

//                                     {categories.map((cat) => (
//                                         <option key={cat._id} value={cat._id}>
//                                             {cat.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <div className="col-md-3 d-flex">

//                                     <button
//                                         type="submit"
//                                         className="btn btn-primary btn-lg w-50 mr-2"
//                                     >
//                                         Search
//                                     </button>

//                                     <button
//                                         type="reset"
//                                         onClick={handleReset}
//                                         className="btn btn-secondary btn-lg w-50"
//                                     >
//                                         Reset
//                                     </button>

//                                 </div>

//                             </div>
//                         </form>

//                     </div>
//                 </div>

//                 {/* TABLE SECTION */}
//                 <div className="content">
//                     <div className="container-fluid">
//                         <div className="card">

//                             <div className="card-header d-flex align-items-center">
//                                 <h3 className="card-title m-0 font-weight-bold">
//                                     Product List
//                                 </h3>

//                                 <div className="ml-auto">
//                                     <Link to="/admin/addproducts" className="btn btn-success">
//                                         <i className="fas fa-plus mr-2"></i>
//                                         Add Product
//                                     </Link>
//                                 </div>
//                             </div>

//                             <div className="card-body">
//                                 <table className="table table-bordered table-striped text-center">
//                                     <thead className="thead-dark">
//                                         <tr>
//                                             <th>S.No</th>
//                                             <th>Image</th>
//                                             <th>name</th>
//                                             <th>price</th>
//                                             <th>Category</th>
//                                             <th>stock</th>
//                                             <th>Created</th>

//                                             <th>Actions</th>
//                                         </tr>
//                                     </thead>

//                                     <tbody>
//                                         {Product.length > 0 ? (
//                                             Product.map((Product, index) => (
//                                                 <tr key={Product.id}>
//                                                     <td>{index + 1}</td>

//                                                     <td>
//                                                         <img
//                                                             src={Product.image || "https://via.placeholder.com/50"}
//                                                             alt="profile"
//                                                             style={{
//                                                                 width: "50px",
//                                                                 height: "50px",
//                                                                 borderRadius: "50%",
//                                                                 objectFit: "cover"
//                                                             }}
//                                                         />
//                                                     </td>

//                                                     <td>{Product.name}</td>
//                                                     <td>{Product.price.toLocaleString('en-US')}</td>
//                                                     <td>{Product.cat_id?.name}</td>
//                                                     <td>{Product.stock}</td>

//                                                     <td>
//                                                         <Moment format="D MMM YYYY">
//                                                             {Product.createdAt}
//                                                         </Moment>
//                                                     </td>



//                                                     <td>
//                                                         <Switch
//                                                             checked={Product.status == true}
//                                                             onChange={() => handleupdatestatus(Product._id, Product.status)}
//                                                         />
//                                                         <Link to={`/admin/edit-product?_id=${Product._id}`} className="btn btn-sm btn-primary mr-2">
//                                                             <i className="fas fa-edit"></i>
//                                                         </Link>
//                                                         <button className="btn btn-sm btn-danger" onClick={() => handleDelete(Product._id)}>
//                                                             <i className="fas fa-trash"></i>
//                                                         </button>
//                                                     </td>
//                                                 </tr>
//                                             ))
//                                         ) : (
//                                             <tr>
//                                                 <td colSpan="10" className="text-danger">
//                                                     No products Found
//                                                 </td>
//                                             </tr>
//                                         )}
//                                     </tbody>

//                                 </table>
//                             </div>

//                         </div>
//                     </div>
//                 </div>

//             </div>

//             <Footer />
//         </div>
//     );
// }

// export default Product;
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from 'react-moment';
import Swal from "sweetalert2";
import { Switch } from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Product() {


    const [name, setname] = useState("");
    const [cat_id, setcat_id] = useState("");

    const [Product, setProduct] = useState([]);
    const [category, setcategory] = useState("");
    const [categories, setCategories] = useState([]);

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/admin/viewproduct")
        console.log("response", response)
        if (response.data.success) {
            setProduct(response.data.data || [])
        } else {

        }
    }


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
        fetchUser();
        fetchcategory();
    }, [])


    const searchproduct = async (e) => {
        e.preventDefault();


        const response = await axios.get("http://localhost:8080/searchproduct",
            {
                params: {
                    name: name,
                    cat_id: cat_id
                }
            }
        )



        console.log("response", response.data.data)
        if (response.data.success) {
            setProduct(response.data.data);
        }
        else {
            console.log(response.data.message);
        }


    }

    const handleReset = async (e) => {
        e.preventDefault();
        setname("")
        setcat_id("")
        setcategory("")
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
            const response = await axios.delete(`http://localhost:8080/deleteproduct/${itemId}`)

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

    const handleupdatestatus = async (id, status) => {

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

            const body = {
                status: status
            }

            const response = await axios.put(`http://localhost:8080/product/statusupdate/${id}`, body)

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
    const currentItems = Product.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(Product.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);





    const exportExcel = () => {
  const data = Product.map((item, index) => ({
    "S.No": index + 1,
    "Name": item.name,
    "Price":  `₹${Number(item.price || 0).toLocaleString("en-IN")}`,
    "Category": item.cat_id?.name || "",
   "Stock": Number(item.stock || 0).toLocaleString("en-IN"),
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
    { wch: 25 },
    { wch: 12 },
    { wch: 20 },
    { wch: 10 },
    { wch: 18 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const blob = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
  });

  saveAs(blob, "products.xlsx");
};


const exportPDF = () => {
  const doc = new jsPDF("l", "mm", "a4");

  const tableColumn = [
    "S.No",
    "Name",
    "Price",
    "Category",
    "Stock",
    "Created"
  ];

  const tableRows = [];

  Product.forEach((item, index) => {
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
 ` ${(Number(item.price) || 0).toLocaleString("en-IN")}`,
      item.cat_id?.name || "",
      Number(item.stock || 0).toLocaleString("en-IN"),
      date
    ]);
  });

  doc.text("Product List", 14, 15);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    theme: "grid",
    styles: {
      fontSize: 8,
      cellPadding: 2
    }
  });

  doc.save("products.pdf");
};
    return (
        <div className="wrapper">
            <Header />
            <SideMenu />

            <div className="content-wrapper">

                <div className="content-header">
                    <div className="container-fluid">
                        <h1 className="m-0">Product Manager</h1>

                        <form onSubmit={searchproduct}>
                            <div className="row mt-3">

                                <div className="col-md-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by Productname"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                    />
                                </div>

                                <select
                                    className="form-control col-md-4"
                                    value={cat_id}
                                    onChange={(e) => setcat_id(e.target.value)}
                                >
                                    <option value="">Select Category</option>

                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>

                                <div className="col-md-3 d-flex">

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-50 mr-2"
                                    >
                                        Search
                                    </button>

                                    <button
                                        type="reset"
                                        onClick={handleReset}
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
    Product List
  </h3>

  <div className="ml-auto d-flex">

    {/* Add Product */}
    <Link to="/admin/addproducts" className="btn btn-success mr-2">
      <i className="fas fa-plus mr-2"></i>
      Add Product
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

      <div className="dropdown-menu dropdown-menu-right">
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
                                            <th>name</th>
                                            <th>price</th>
                                            <th>Category</th>
                                            <th>stock</th>
                                            <th>Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {currentItems.length > 0 ? (
                                            currentItems.map((Product, index) => (
                                                <tr key={Product.id}>
                                                    <td>{index + 1 + indexOfFirstItem}</td>

                                                    <td>
                                                        <img
                                                            src={Product.image || "https://via.placeholder.com/50"}
                                                            alt="profile"
                                                            style={{
                                                                width: "50px",
                                                                height: "50px",
                                                                borderRadius: "50%",
                                                                objectFit: "cover"
                                                            }}
                                                        />
                                                    </td>

                                                    <td>{Product.name}</td>
                                                    <td>{Product.price.toLocaleString('en-US')}</td>
                                                    <td>{Product.cat_id?.name}</td>
                                                    <td>{Product.stock.toLocaleString('en-US')}</td>

                                                    <td>
                                                        <Moment format="D MMM YYYY">
                                                            {Product.createdAt}
                                                        </Moment>
                                                    </td>

                                                    <td>
                                                        <Switch
                                                            checked={Product.status == true}
                                                            onChange={() => handleupdatestatus(Product._id, Product.status)}
                                                        />
                                                        <Link to={`/admin/edit-product?_id=${Product._id}`} className="btn btn-sm btn-primary mr-2">
                                                            <i className="fas fa-edit"></i>
                                                        </Link>
                                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(Product._id)}>
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="text-danger">
                                                    No products Found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                {/* pagination */}
                                {Product.length > itemsPerPage && (
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

export default Product;