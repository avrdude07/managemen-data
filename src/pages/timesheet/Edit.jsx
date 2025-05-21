import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "../../style/datePicker.css";
import * as Yup from "yup";
import { useAuthContext } from "../../context/AuthContext";
import {
  editTimesheet,
  findTimesheetById,
  getEmployeeSummaryList,
} from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";

function DatePickerFiled({ field, form }) {
  return (
    <DatePicker
      selected={field.value}
      onChange={(date) => form.setFieldValue(field.name, date)}
      dateFormat="yyyy-MM-dd"
      className="form-control"
      placeholderText="Select date"
    />
  );
}

export default function EditTimesheet() {
  const { timesheetId } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [timesheet, setTimesheet] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const getTimesheet = async () => {
      try {
        const timesheet = await findTimesheetById(authUser, timesheetId);
        setTimesheet(timesheet);
      } catch (error) {
        console.log(error);
      }
    };
    const getEmployeeList = async () => {
      try {
        const employee = await getEmployeeSummaryList(authUser);
        const filterdEmployee = employee.filter((emp) => emp.empName !== null);
        setEmployeeList(filterdEmployee);
      } catch (error) {
        console.log(error);
        setEmployeeList([]);
      }
    };
    getTimesheet();
    getEmployeeList();
  }, []);

  const initialValue = {
    name: timesheet.pname,
    leadId: timesheet.plead?.empId || "",
    location: timesheet.location,
    remarks: timesheet.remarks,
    checkerId: timesheet.checker?.empId || "",
  };
  const createSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    leadId: Yup.number().required("Lead ID is required"),
    location: Yup.string().required("Location is required"),
    remarks: Yup.string().nullable(),
    checkerId: Yup.number().required("Checker ID is required"),
  });

  const onSubmit = async (value) => {
    try {
      const status = await editTimesheet(
        authUser,
        {
          ...value,
          leadId: Number(value.leadId),
          checkerId: Number(value.checkerId),
        },
        timesheetId
      );
      if (status === 200) {
        setStatusMessage("Edit timesheet success");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setStatusMessage("Failed edit timesheet");
      console.log(error);
    } finally {
      setTimeout(() => {
        setStatusMessage("");
      }, 1000);
    }
  };
  return (
    <div class="container my-4">
      <div class="row">
        <div class="col-md-8 mx-auto rounded border p-4">
          <h2 class="text-center mb-5">Edit Timesheet</h2>

          <Formik
            enableReinitialize
            initialValues={initialValue}
            validationSchema={createSchema}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            <Form>
              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Project Name</label>
                <div class="col-sm-8 align-items-start">
                  <Field type="text" class="form-control" name="name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Project Leader</label>
                <div class="col-sm-8">
                  <Field class="form-select" name="leadId" as="select">
                    <option value="" disabled>
                      Select Leader
                    </option>
                    {employeeList.map((emp) => (
                      <option key={emp.empId} value={emp.empId}>
                        {emp.empName}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="leadId"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Location</label>
                <div class="col-sm-8">
                  <Field type="text" class="form-control" name="location" />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Remarks</label>
                <div class="col-sm-8">
                  <Field type="text" class="form-control" name="remarks" />
                  <ErrorMessage
                    name="remarks"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Checker Name</label>
                <div class="col-sm-8">
                  <Field class="form-select" name="checkerId" as="select">
                    <option value="" disabled>
                      Select Checker
                    </option>
                    {employeeList.map((emp) => (
                      <option key={emp.empId} value={emp.empId}>
                        {emp.empName}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="checkerId"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row">
                <div class="offset-sm-4 col-sm-4 d-grid">
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </div>
                <div class="col-sm-4 d-grid">
                  <Link class="btn btn-outline-primary" to="/">
                    Cancel
                  </Link>
                </div>
                {statusMessage && (
                  <p className="text-center mt-3">{statusMessage}</p>
                )}
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
