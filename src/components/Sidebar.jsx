import { Nav } from "react-bootstrap";
import { useAuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { deleteToken, authUser } = useAuthContext();
  const location = useLocation();

  const handleLogout = () => {
    deleteToken();
  };

  const menuItems = [
    { path: "/home", label: "Home", icon: "🏠" },
    { path: "/penyuluh", label: "Penyuluh Agama", icon: "👨‍💼" },
  ];

  return (
    <div
      className="py-5 px-3 min-vh-100"
      style={{ 
        width: "250px", 
        minWidth: "250px",
        background: "linear-gradient(to bottom, #F2EAE1, #F2EAE1)" // Gradien biru tua
      }}
    >
      {/* Header dengan warna biru lebih tua */}
      <div 
        className="text-white p-3 mb-4 rounded text-center"
        style={{ 
          backgroundColor: "#0f2a47",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
        }}
      >
        <h5 className="mb-1">SISTEM PENGELOLAAN</h5>
        <h5 className="mb-1">DATA</h5>
        <h5 className="mb-0">BIMAS KATOLIK</h5>
      </div>

      {/* Info Admin */}
      <div 
        className="text-white p-3 mb-4 rounded"
        style={{ 
          backgroundColor: "#1e4a76",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
        }}
      >
        <div className="d-flex align-items-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{ 
              width: "40px", 
              height: "40px", 
              backgroundColor: "#3b82f6",
              fontSize: "20px"
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
                backgroundColor: location.pathname === item.path ? "#3b82f6" : "transparent",
              }}
            >
              <span className="me-3" style={{ fontSize: "1.2rem" }}>{item.icon}</span>
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
            transition: "all 0.3s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#c53030"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#e53e3e"}
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
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .nav-link:hover:not(.active-menu) {
            background-color: #2d4a6b !important;
          }
        `}
      </style>
    </div>
  );
}