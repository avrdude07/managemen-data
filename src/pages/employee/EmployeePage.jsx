import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getAllEmployee } from "../../api/api";
import { format } from "date-fns";

export default function EmployeePage() {
  const { authUser } = useAuthContext();
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    const getEmployeeList = async () => {
      try {
        const employee = await getAllEmployee(authUser);
        setEmployeeList(employee);
      } catch (error) {
        console.log(error);
        setEmployeeList([]);
      }
    };
    getEmployeeList();
  }, []);
  return (
    <>
      <title>Employee</title>
      <div class="d-flex">
        <Sidebar />
        <div className="p-5" style={{ width: "100%" }}>
          <h2 class="text-center">Employee Views</h2>

          <table class="table mt-4">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Date of Join</th>
                <th>Manager</th>
                <th>Employee Email</th>
                <th>Employee Phone</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              {employeeList.map((employee) => (
                <tr>
                  <td>{employee.empId}</td>
                  <td>{employee.empName}</td>
                  <td>
                    {employee.dateOfJoin
                      ? format(employee.dateOfJoin, "dd/MM/yyyy")
                      : "-"}
                  </td>
                  <td>{employee.manaer ? employee.manaer.empName : "-"}</td>
                  <td>{employee.empEmail}</td>
                  <td>{employee.empPhone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
