import { Nav } from "react-bootstrap";
import { useAuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { deleteToken } = useAuthContext();

  const handleLogout = () => {
    deleteToken();
  };
  return (
    <div
      className="bg-dark text-white py-5 px-3 min-vh-100"
      style={{ width: "250px", minWidth: "250px" }}
    >
      <h4 className="text-start px-3 mb-3">Timesheet App</h4>
      <Nav
        className="d-flex flex-column justify-content-between"
        style={{ height: "90%" }}
      >
        <div className="d-flex flex-column align-items-start">
          <Nav.Link href="/" className="text-white">
            Timesheet
          </Nav.Link>
          <Nav.Link href="/checker" className="text-white">
            Checker View
          </Nav.Link>
          <Nav.Link href="/employee" className="text-white">
            Employee
          </Nav.Link>
          <Nav.Link href="/my-profile" className="text-white">
            My Profile
          </Nav.Link>
          <Nav.Link href="/admin" className="text-white">
            Admin View
          </Nav.Link>
        </div>
        <button
          className="btn btn-danger mx-3"
          style={{ width: "100px" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </Nav>
    </div>
  );
}
