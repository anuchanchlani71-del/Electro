// import React from "react";

// import { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";
// import Hearder from "../Header";
// import SideMenu from "../SideMenu";

// export default function MyOrders() {


//  const [order, setorder] = useState([]);
//   const userId = localStorage.getItem("user_id"); 

//   useEffect(() => {

//     if (userId) {
//       getCart(userId);
//     } else {
//       console.log("User not logged in");

//     }
//   }, []);

//   const getCart = async (userId) => {
//     try {
//       const res = await axios.get(
//        `http://localhost:8080/api/v1/myorders?userId=${userId}`
//       );

//       console.log("VIEW order RESPONSE ", res.data);

//       setorder(res.data.data );

//     } catch (err) {
//       console.log(err);

//     }
//   };



//   return (


// <div className="wrapper">
//   <Hearder/>
//   <SideMenu/>

//   <div className="content-wrapper">
//     <div className="content-header">
//       <div className="container-fluid">
//         <h1 className="m-0">My Orders</h1>
//       </div>
//     </div>

//     <div className="content">
//       <div className="container-fluid">
//         <div className="card">

//           <div className="card-header">
//             <h3 className="card-title font-weight-bold">
//               Order List
//             </h3>
//           </div>

//           <div className="card-body">
//             <table className="table table-bordered table-striped text-center">
//               <thead className="thead-dark">
//                 <tr>
//                   <th>S.No</th>
//                    <th>image</th>
//                   <th>Order ID</th>


//                    <th>products</th>
//                    <th>Date</th>
//                   <th>Total</th>
//                   <th>Payment Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {order.length > 0 ? (
//                   order.map((ord, index) => (
//                     <tr key={ord._id}>
//                       <td>{index + 1}</td>
//  <td>
//                         {ord.products?.map((product, i) => (
//                           <div
//                             key={i}
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "8px",
//                               marginBottom: "5px",
//                               alignItems: "center",
//                                justifyContent: "center" 
//                             }}
//                           >
//                             <img
//                               src={product.image}
//                               alt={product.name}
//                               style={{
//                                 width: "60px",
//                                 height: "40px",
//                                 borderRadius: "5px",
//                                 objectFit: "cover",


//                               }}
//                             />
//                             {/* <span>
//                               {product.name} (x{product.quantity})
//                             </span> */}
//                           </div>
//                         ))}

//                       </td>
//                       <td>{ord._id}</td>




//                        <td>
//           {ord.products?.map((product, i) => (
//             <div key={i} style={{ marginBottom: "5px" }}>
//               {product.name} ({product.quantity})
//             </div>
//           ))}
//         </td>
//         <td>
//                         {new Date(ord.createdAt).toLocaleDateString()}
//                       </td>

//                       <td>₹{ord.totalAmount}</td>

//                       <td>
//                         <span className="badge badge-success">
//                           {ord.paymentStatus}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="text-danger">
//                       No Orders Found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>

//             </table>
//           </div>

//         </div>
//       </div>
//     </div>

//   </div>
// </div>
//   );
// }
import React from "react";

import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Hearder from "../Header";
import SideMenu from "../SideMenu";
import Moment from "react-moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function MyOrders() {


  const [order, setorder] = useState([]);
  // const userId = localStorage.getItem("user_id"); 

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/admin/myorders"
      );

      console.log("VIEW order RESPONSE ", res.data);

      setorder(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  // const getCart = async (userId) => {
  //   try {
  //     const res = await axios.get(
  //      `http://localhost:8080/admin/myorders`
  //     );

  //     console.log("VIEW order RESPONSE ", res.data);

  //     setorder(res.data.data );

  //   } catch (err) {
  //     console.log(err);

  //   }
  // };


  // pagination logic
  const safeOrders = Array.isArray(order) ? order : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = safeOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(safeOrders.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

//pdf
const exportPDF = () => {
  const doc = new jsPDF("l", "mm", "a4");

  const tableColumn = [
    "S.No",
    "User",
    "Order ID",
    "Products",
    "Date",
    "Total",
    "Payment Status"
  ];

  const tableRows = [];

  safeOrders.forEach((ord, index) => {
    const products = ord.products
      ?.map(p => `${p.name} (${p.quantity})`)
      .join(", ");

   const date = ord.createdAt
  ? new Date(ord.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  : "";

    const total = `${(Number(ord.totalAmount) || 0).toLocaleString("en-IN")}`;

    tableRows.push([
      index + 1,
      `${ord.user?.first_name || ""} ${ord.user?.last_name || ""}`,
      ord._id || "",
      products || "",
      date,
      total,
      ord.paymentStatus || ""
    ]);
  });

  doc.text("Orders List", 14, 15);

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
      1: { cellWidth: 35 },
      2: { cellWidth: 45 },
      3: { cellWidth: 80 },
      4: { cellWidth: 25 },
      5: { cellWidth: 25 },
      6: { cellWidth: 30 }
    },
    theme: "grid"
  });

  doc.save("orders.pdf");
};


//excel
const exportExcel = () => {
  const data = safeOrders.map((ord, index) => ({
    "S.No": index + 1,
    "User Name": `${ord.user?.first_name} ${ord.user?.last_name}`,
    "Email": ord.user?.email,
    "Mobile": ord.user?.mobile,
    "Order ID": ord._id,
    "Products": ord.products
      ?.map(p => `${p.name} (${p.quantity})`)
      .join(", "),

    "Date": ord.createdAt
      ? new Date(ord.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : "",

    "Total": `₹${Number(ord.totalAmount || 0).toLocaleString("en-IN")}`,
    "Payment Status": ord.paymentStatus
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  worksheet["!cols"] = [
    { wch: 6 },   // S.No
    { wch: 22 },  // User Name
    { wch: 25 },  // Email
    { wch: 16 },  // Mobile
    { wch: 25 },  // Order ID
    { wch: 40 },  // Products
    { wch: 15 },  // Date
    { wch: 18 },  // Total
    { wch: 18 }   // Payment Status
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const blob = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
  });

  saveAs(blob, "orders.xlsx");
};


  return (


    <div className="wrapper">
      <Hearder />
      <SideMenu />

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">My Orders</h1>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">
            <div className="card">

              {/* <div className="card-header">
                <h3 className="card-title font-weight-bold">
                  Order List
                </h3>
              </div> */}
       <div className="card-header d-flex justify-content-between align-items-center">
  <h3 className="card-title font-weight-bold">
    Order List
  </h3>

  {/* <div className="dropdown"     style={{marginLeft:"80%"}}>
    <button
  
      className="btn btn-primary  dropdown-toggle"
      type="button"
      data-toggle="dropdown"
     
    >
      Export
    </button>

    <div className="dropdown-menu dropdown-menu-right">
      <button
        className="dropdown-item"
        onClick={exportPDF}
      >
        Export PDF
      </button>

      <button
        className="dropdown-item"
        onClick={exportExcel}
      >
        Export Excel
      </button>
    </div>
  </div> */}
  <div className="dropdown" style={{ marginLeft: "80%" }}>
  <button
    className="btn btn-primary dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
  >
    Export
  </button>

  <div className="dropdown-menu dropdown-menu-right">
    <button
      className="dropdown-item"
      onClick={exportPDF}
    >
      Export PDF
    </button>

    <button
      className="dropdown-item"
      onClick={exportExcel}
    >
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
                      <th>user</th>
                      <th>Order ID</th>
                      <th>products</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((ord, index) => (
                        <tr key={ord._id}>
                          <td>{index + 1 + indexOfFirstItem}</td>
                          <td>

                            <td style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%"
                            }}>
                              <div style={{ fontWeight: "600", fontSize: "14px" }}>
                                {ord.user?.first_name} <span>{ord.user?.last_name}</span>
                              </div>

                              <div style={{ fontSize: "13px", color: "#6c757d" }}>
                                {ord.user?.email}
                              </div>

                              <div style={{ fontSize: "13px", color: "#6c757d" }}>
                                {ord.user?.mobile}
                              </div>
                            </td>


                          </td>
                          <td>{ord._id}</td>

                          <td>
                            {ord.products?.map((product, i) => (
                              <div key={i} style={{ marginBottom: "5px" }}>
                                {product.name} ({product.quantity})
                              </div>
                            ))}
                          </td>
                          <td>
                            <Moment format="D MMM YYYY">
                              {ord.createdAt}
                            </Moment>
                          </td>

                          <td>₹{ord.totalAmount?.toLocaleString("en-IN")}</td>

                          <td>
                            <span className="badge badge-success">
                              {ord.paymentStatus}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-danger">
                          No Orders Found
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>

                {/* pagination */}
                {safeOrders.length > itemsPerPage && (
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
    </div>
  );
}