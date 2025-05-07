import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function TimesheetPage() {
  return (
    <div class="d-flex">
      <Sidebar />

      <div className="p-5" style={{ width: "100%" }}>
        <h2 class="text-center">Timesheet Views</h2>

        <div className="mt-4 d-flex justify-content-between">
          <Link to="/timesheet/create" class="btn btn-primary mb-3">
            New Timesheet
          </Link>
          <Link to="/" class="btn btn-primary mb-3">
            Home
          </Link>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Date</th>
              <th>Task</th>
              <th>HR</th>
              <th>Status</th>
              <th>Remark</th>
              <th>Report Manager</th>
              <th>RM Status</th>
              <th>RM Remark</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* <tbody class="table-group-divider">
    <tr th:each="sheet : ${timesheet}">
      <td th:text="${sheet.id}"></td>
      <td th:text="${sheet.username}"></td>
      <td th:text="${sheet.date.toString().substring(0, 10)}"></td>
      <td th:text="${sheet.task}"></td>
      <td th:text="${sheet.hrUsername}"></td>
      <td th:text="${sheet.status}"></td>
      <td th:text="${sheet.remark}"></td>
      <td th:text="${sheet.reportManager}"></td>
      <td th:text="${sheet.reportStatus}"></td>
      <td th:text="${sheet.reportRemark}"></td>
      <td style="white-space:nowrap">
        <Link
          class="btn btn-primary btn-sm"
          th:href="@{/timesheet/edit(id=${sheet.id})}"
          th:classappend="${sheet.reportStatus == 'Approved'} ? ' disabled opacity-50 pointer-events-none' : ''"
        >
          EDIT
        </Link>

        <Link
          class="btn btn-danger btn-sm"
          to="@{/timesheet/delete(id=${sheet.id})}"
          th:classappend="${sheet.reportStatus == 'Approved'} ? ' disabled opacity-50 pointer-events-none' : ''"
          onclick="return confirm('Are you sure?')"
        >
          DELETE
        </Link>
      </td>
    </tr>
  </tbody> */}
        </table>
      </div>
    </div>
  );
}
