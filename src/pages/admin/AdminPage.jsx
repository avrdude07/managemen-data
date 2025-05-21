import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getRolesFromToken } from "../../helpers/helpers";
import { Link } from "react-router-dom";
import { getAllTimesheetByAdmin } from "../../api/api";
import { format } from "date-fns";
import Sidebar from "../../components/Sidebar";

export function AdminPage() {
  const { authUser } = useAuthContext();

  const userRole = getRolesFromToken(authUser);

  const [tsList, setTsList] = useState([]);

  useEffect(() => {
    const getTsList = async () => {
      try {
        const ts = await getAllTimesheetByAdmin(authUser);
        setTsList(ts);
      } catch (error) {
        console.log(error);
        setTsList([]);
      }
    };
    getTsList();
  }, [authUser]);

  if (userRole?.includes("admin")) {
    return (
      <div class="d-flex">
        <Sidebar />

        <div className="p-5" style={{ width: "100%" }}>
          <h2 class="text-center">Admin Views</h2>

          <div className="mt-4 d-flex justify-content-between">
            <Link to="/" class="btn btn-primary mb-3">
              Home
            </Link>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>Maker</th>
                <th>Checker</th>
                <th>Checker Status</th>
                <th>Checker Remark</th>
                <th>Submit Date</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              {tsList.map((ts, index) => (
                <tr key={index}>
                  <td>{ts.maker}</td>
                  <td>{ts.checker}</td>
                  <td>{ts.status}</td>
                  <td>{ts.checkerRemark ? ts.checkerRemark : "-"}</td>
                  <td>{format(ts.submitDate, "dd/MM/yyyy")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    window.location.href = "/";
  }
}
