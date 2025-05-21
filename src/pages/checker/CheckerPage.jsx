import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getAllTimesheetByChecker } from "../../api/api";
import { format } from "date-fns";
import ConfirmDialog from "../../components/ConfirmationModal";

export default function CheckerPage() {
  const { authUser } = useAuthContext();
  const [tsList, setTsList] = useState([]);

  useEffect(() => {
    const getTsList = async () => {
      try {
        const ts = await getAllTimesheetByChecker(authUser);
        setTsList(ts);
      } catch (error) {
        console.log(error);
        setTsList([]);
      }
    };
    getTsList();
  }, [authUser]);

  return (
    <div class="d-flex">
      <Sidebar />

      <div className="p-5" style={{ width: "100%" }}>
        <h2 class="text-center">Checker Views</h2>

        <div className="mt-4 d-flex justify-content-between">
          <Link to="/" class="btn btn-primary mb-3">
            Home
          </Link>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>Project Lead</th>
              <th>Location</th>
              <th>Maker</th>
              <th>Remarks</th>
              <th>Submit Date</th>
              <th>Checker</th>
              <th>Checker Status</th>
              <th>Checker Remark</th>
              <th>Checker Submit Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {tsList.map((ts, index) => (
              <tr key={index}>
                <td className="text-center align-middle">{ts.id}</td>
                <td className="text-center align-middle">{ts.pname}</td>
                <td className="text-center align-middle">{ts.plead.empName}</td>
                <td className="text-center align-middle">{ts.location}</td>
                <td className="text-center align-middle">{ts.maker.empName}</td>
                <td className="text-center align-middle">{ts.remarks}</td>
                <td className="text-center align-middle">
                  {format(ts.submitDate, "dd/MM/yyyy")}
                </td>
                <td className="text-center align-middle">
                  {ts.checker.empName}
                </td>
                <td className="text-center align-middle">{ts.checkerStatus}</td>
                <td className="text-center align-middle">
                  {ts.checkerRemark ? ts.checkerRemark : "-"}
                </td>
                <td className="text-center align-middle">
                  {ts.checkerSubmitDate
                    ? format(ts.checkerSubmitDate, "dd/MM/yyyy")
                    : "-"}
                </td>
                <td className="text-center align-middle">
                  {ts.checkerStatus === "Pending" && (
                    <Link
                      class="btn btn-primary btn-sm"
                      to={`/timesheet/proceed/${ts.id}`}
                      style={{ width: "70px" }}
                    >
                      Proceed
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
