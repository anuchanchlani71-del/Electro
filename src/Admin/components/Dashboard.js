import { useEffect, useState } from "react";
import axios from "axios";

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';
import Moment from "react-moment";

function Dashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/dashboard");
      setStats(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper">

      <Header />
      <SideMenu />

      <div className="content-wrapper">

        {/* HEADER */}
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Dashboard</h1>
          </div>
        </div>

        {/* STATS */}
        <div className="content">
          <div className="container-fluid">

            <div className="row">

              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{stats.totalUsers || 0}</h3>
                    <p>Total Users</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{stats.totalOrders || 0}</h3>
                    <p>Total Orders</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                 <h3>₹{(stats.revenue || 0).toLocaleString("en-IN")}</h3>
                    <p>Revenue</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>{stats.pendingOrders || 0}</h3>
                    <p>Pending Orders</p>
                  </div>
                </div>
              </div>

              {/* CATEGORIES */}
              <div className="col-lg-3 col-6 mt-3">
                <div className="small-box bg-primary">
                  <div className="inner">
                    <h3>{stats.totalCategories || 0}</h3>
                    <p>Categories</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RECENT ORDERS TABLE */}
            <div className="card mt-4">

              <div className="card-header">
                <h3 className="card-title">Recent Orders</h3>
              </div>

              <div className="card-body p-0">

                <table className="table table-bordered text-center mb-0">

                  <thead className="thead-dark">
                    <tr>
                            <th>S.No</th>
                      <th>Order ID</th>
                      <th>User</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>

                    {stats.recentOrders?.length > 0 ? (
                      stats.recentOrders.map((order,index) => (
                        <tr key={order._id}>
  <td>{index + 1}</td>
                          <td>{order._id}</td>
                         
                          

                          <td>
                            {order.userId?.first_name} {order.userId?.last_name}
                          </td>

                          <td>₹{order.totalAmount.toLocaleString("en-IN")}</td>

                          <td>
                            <span className="badge badge-success">
                              {order.paymentStatus}
                            </span>
                          </td>

                          <td>
                              <Moment format="D MMM YYYY">{new Date(order.createdAt).toLocaleDateString()}</Moment>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-danger">
                          No Recent Orders Found
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>
        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Dashboard;   