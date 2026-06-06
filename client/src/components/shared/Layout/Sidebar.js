import React from "react";
// import { userMenu } from './Menus/userMenu'
import { Link, useLocation } from "react-router-dom";
import "../../../styles/Layout.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/admin" && "active"}`}
              >
                <i className="fa-solid fa-user-shield"></i>
                <Link to="/admin">Admin Dashboard</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                <i className="fa-solid fa-cubes"></i>
                <Link to="/">Global Inventory</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donar-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donar-list">Donar List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                }`}
              >
                <i className="fa-solid fa-truck-medical"></i>
                <Link to="/hospital-list">Hospital List</Link>
              </div>
            </>
          )}

          {(user?.role === "donar" || user?.role === "hospital") && (
            <div
              className={`menu-item ${location.pathname === "/" && "active"}`}
            >
              <i className="fa-solid fa-cubes"></i>
              <Link to="/">{user?.role === "hospital" ? "Request Blood" : "Donate Blood"}</Link>
            </div>
          )}

          {user?.role === "hospital" && (
            <div
              className={`menu-item ${
                location.pathname === "/consumer" && "active"
              }`}
            >
              <i className="fa-solid fa-users-between-lines"></i>
              <Link to="/consumer">Request History</Link>
            </div>
          )}
          {user?.role === "donar" && (
            <div
              className={`menu-item ${
                location.pathname === "/donation" && "active"
              }`}
            >
              <i className="fa-solid fa-book-medical"></i>
              <Link to="/donation">Donation History</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
