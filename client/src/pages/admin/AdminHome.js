import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import API from "../../services/API";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  const [summary, setSummary] = useState({
    donors: 0,
    hospitals: 0,
    inventory: 0,
  });

  const getSummary = async () => {
    try {
      const [donorsRes, hospitalsRes, inventoryRes] = await Promise.all([
        API.get("/admin/donar-list"),
        API.get("/admin/hospital-list"),
        API.get("/inventory/get-inventory"),
      ]);

      setSummary({
        donors: donorsRes.data?.donarData?.length || 0,
        hospitals: hospitalsRes.data?.hospitalData?.length || 0,
        inventory: inventoryRes.data?.inventory?.length || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <Layout>
      <div className="container p-3">
        <div className="d-flex flex-column mt-4">
          <h1>Welcome Admin <i className="text-success">{user?.name}</i></h1>
          <p className="text-muted">Manage users and monitor blood inventory activity.</p>

          <div className="row mt-3">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Donors</h5>
                  <h2>{summary.donors}</h2>
                  <Link className="btn btn-outline-primary" to="/donar-list">Manage Donors</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Hospitals</h5>
                  <h2>{summary.hospitals}</h2>
                  <Link className="btn btn-outline-primary" to="/hospital-list">Manage Hospitals</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Blood Records</h5>
                  <h2>{summary.inventory}</h2>
                  <Link className="btn btn-outline-primary" to="/">View Inventory</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
