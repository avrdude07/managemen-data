import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  return (
    <div className="d-flex gap-5">
      <Sidebar />
      <div>
        <h1>Welcome!</h1>
        <div className="d-flex flex-column align-items-center gap-3 mt-3">
          <div className="d-flex gap-1">
            <Link to="/timesheet" className="btn btn-primary">
              Timesheet
            </Link>
            <Link to="/employee" className="btn btn-primary">
              Employee
            </Link>
            <Link to="/hr" className="btn btn-primary">
              HR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
