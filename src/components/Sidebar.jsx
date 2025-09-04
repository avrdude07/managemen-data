import { Nav } from "react-bootstrap";
import { useAuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // Import icon panah

export default function Sidebar() {
  const { deleteToken, authUser } = useAuthContext();
  const location = useLocation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleLogout = () => {
    deleteToken();
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const menuItems = [
    { path: "/home", label: "Home", icon: "🏠" },
    { path: "/penyuluh", label: "Penyuluh Agama", icon: "👨‍💼" },
  ];

  // Jika sidebar disembunyikan, hanya tampilkan tombol show
  if (!isSidebarVisible) {
    return (
      <button
        onClick={toggleSidebar}
        className="show-sidebar-button"
        style={{
          position: "fixed",
          left: "0",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: "1000",
          backgroundColor: "#f59e0b",
          border: "none",
          borderRadius: "0 6px 6px 0",
          width: "30px",
          height: "60px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease"
        }}
        title="Tampilkan Sidebar"
      >
        <RightOutlined style={{ color: "white", fontSize: "16px" }} /> {/* Icon panah ke kanan */}
      </button>
    );
  }

  return (
    <div
      className="py-5 px-3 min-vh-100 position-relative"
      style={{
        width: "250px",
        minWidth: "250px",
        background: "linear-gradient(to bottom, #F2EAE1, #F2EAE1)",
        transition: "all 0.3s ease",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        zIndex: "999"
      }}
    >
      {/* Tombol hide dengan panah ke kiri */}
      <button
        onClick={toggleSidebar}
        className="hide-sidebar-button"
        style={{
          position: "absolute",
          right: "-30px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: "1001",
          backgroundColor: "#f59e0b",
          border: "none",
          borderRadius: "0 6px 6px 0",
          width: "30px",
          height: "60px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease"
        }}
        title="Sembunyikan Sidebar"
      >
        <LeftOutlined style={{ color: "white", fontSize: "16px" }} /> {/* Icon panah ke kiri */}
      </button>

      {/* Header */}
      <div
        className="text-white p-3 mb-4 rounded text-center"
        style={{
          backgroundColor: "#f59e0b",
          boxShadow: "0 8px 7px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h5
          style={{ 
            marginBottom: "4px", 
            fontWeight: "600", 
            lineHeight: "1.2",
            fontSize: "16px"
          }}
        >
          SISTEM PENGELOLAAN DATA
        </h5>
      </div>

      {/* Info Admin */}
      <div
        className="text-white p-3 mb-4 rounded"
        style={{
          backgroundColor: "#1e4a76",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#3b82f6",
              fontSize: "20px",
            }}
          >
            👤
          </div>
          <div>
            <div className="fw-bold">Admin</div>
            <div className="small">{authUser?.username || "User"}</div>
          </div>
        </div>
      </div>

      <Nav
        className="d-flex flex-column justify-content-between"
        style={{ height: "70%" }}
      >
        <div className="d-flex flex-column align-items-start">
          {menuItems.map((item) => (
            <Nav.Link
              as={Link}
              to={item.path}
              key={item.path}
              className={`text-black mb-2 w-100 d-flex align-items-center ${
                location.pathname === item.path ? "active-menu" : ""
              }`}
              style={{
                padding: "12px 15px",
                transition: "all 0.3s",
                borderRadius: "5px",
                backgroundColor:
                  location.pathname === item.path ? "#3b82f6" : "transparent",
              }}
            >
              <span className="me-3" style={{ fontSize: "1.2rem" }}>
                {item.icon}
              </span>
              {item.label}
            </Nav.Link>
          ))}
        </div>

        {/* Logout Button */}
        <button
          className="btn w-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "#e53e3e",
            color: "white",
            padding: "12px 15px",
            borderRadius: "5px",
            border: "none",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#c53030")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#e53e3e")}
          onClick={handleLogout}
        >
          <span className="me-2">🚪</span>
          Logout
        </button>
      </Nav>

      {/* Tambahkan style untuk hover effect */}
      <style>
        {`
          .active-menu {
            background-color: #f59e0b !important;
            color: white !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .nav-link:hover:not(.active-menu) {
            background-color: #2d4a6b !important;
            color: white !important;
          }
          
          .show-sidebar-button:hover {
            width: 35px !important;
            background-color: #e69008 !important;
            box-shadow: 3px 0 10px rgba(0,0,0,0.3);
          }
          
          .hide-sidebar-button:hover {
            width: 35px !important;
            background-color: #e69008 !important;
            box-shadow: 3px 0 10px rgba(0,0,0,0.3);
          }
        `}
      </style>
    </div>
  );
}
