import { Link } from "react-router-dom";

export default function HrPage() {
  return (
    <>
      <title>HR</title>
      <div class="container mt-4">
        <h2 class="text-center">Employee Views</h2>

        <div className="mt-4 d-flex justify-content-end">
          <Link to="/" class="btn btn-primary mb-3">
            Home
          </Link>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Manager Name</th>
              <th>Submission Date</th>
              <th>Approval Status</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {/* <tr th:each="ds : ${dashboard}">
            <td th:text="${ds.employeeName}"></td>
            <td th:text="${ds.managerName}"></td>
            <td th:text="${#dates.format(ds.submissionDate, 'dd/MM/yyyy')}"></td>
            <td th:text="${ds.approvalStatus}"></td>
        </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}
