import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "../../style/datePicker.css";
import * as Yup from "yup";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import {
  editEmployee,
  getEmployeeSummaryList,
  getMyProfile,
} from "../../api/api";
import { useNavigate } from "react-router-dom";

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

export default function EditEmployee() {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [myProfile, setMyProfile] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const getEmployeeProfile = async () => {
      const response = await getMyProfile(authUser);
      setMyProfile(response);
    };
    getEmployeeProfile();
    getEmployeeList();
  }, [authUser]);

  const initialValue = {
    empName: myProfile.empName,
    dateOfJoin: myProfile.dateOfJoin,
    managerId: myProfile.manager?.empId || "",
    empEmail: myProfile.empEmail,
    empPhone: myProfile.empPhone,
    empRole: myProfile.empRole,
  };

  const createSchema = Yup.object().shape({
    empName: Yup.string().required("Employee Name is required"),
    dateOfJoin: Yup.date().required("Date of Join is required"),
    managerId: Yup.number().required("Manager ID is required"),
    empEmail: Yup.string()
      .email("Invalid email")
      .required("Employee Email is required"),
    empPhone: Yup.string().required("Employee Phone is required"),
    empRole: Yup.string().required("Employee Role is required"),
  });

  const onSubmit = async (value) => {
    try {
      const status = await editEmployee(authUser, value);
      if (status === 200) {
        setStatusMessage("Updated Successfully");
        setTimeout(() => {
          navigate("/employee");
        }, 1000);
      }
    } catch (error) {
      setStatusMessage("Something went wrong");
      console.log(error);
    } finally {
      setTimeout(() => {
        setStatusMessage("");
      }, 1000);
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
  return (
    <>
      <title>Edit Profile</title>
      <div class="d-flex">
        <Sidebar />
        <div class="row p-5" style={{ width: "100%", height: "fit-content" }}>
          {!myProfile ? (
            <div>Loading...</div>
          ) : (
            <div class="col-md-8 mx-auto rounded border p-4">
              <h2 class="text-center mb-5">My Profile</h2>

              <Formik
                enableReinitialize
                initialValues={initialValue}
                validationSchema={createSchema}
                onSubmit={(values) => {
                  onSubmit({ ...values, managerId: Number(values.managerId) });
                }}
              >
                <Form>
                  <div class="row mb-3">
                    <label class="col-sm-4 col-from-label">Employee Name</label>
                    <div class="col-sm-8 align-items-start">
                      <Field type="text" class="form-control" name="empName" />
                      <ErrorMessage
                        name="empName"
                        component="div"
                        className="text-start"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-4 col-from-label">Employee Role</label>
                    <div class="col-sm-8 align-items-start">
                      <Field type="text" class="form-control" name="empRole" />
                      <ErrorMessage
                        name="empRole"
                        component="div"
                        className="text-start"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>

                  <div class="row mb-3">
                    <label class="col-sm-4 col-from-label">Date of Join</label>
                    <div class="col-sm-3">
                      <Field
                        class="form-control"
                        name="dateOfJoin"
                        component={DatePickerFiled}
                      />
                      <ErrorMessage
                        name="dateOfJoin"
                        component="div"
                        className="text-start"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>

                  <div class="row mb-3">
                    <label class="col-sm-4 col-from-label">Manager</label>
                    <div class="col-sm-8">
                      <Field class="form-select" name="managerId" as="select">
                        <option value="" disabled>
                          Select manager
                        </option>
                        {employeeList.map((emp) => (
                          <option key={emp.empId} value={emp.empId}>
                            {emp.empName}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="managerId"
                        component="div"
                        className="text-start"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>

                  <div class="row mb-3">
                    <label class="col-sm-4 col-from-label">
                      Employee Email
                    </label>
                    <div class="col-sm-8">
                      <Field type="text" class="form-control" name="empEmail" />
                      <ErrorMessage
                        name="empEmail"
                        component="div"
                        className="text-start"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>

                  <div class="row mb-3">
                    <label class="col-sm-4 col-from-label">
                      Employee Phone
                    </label>
                    <div class="col-sm-8">
                      <Field type="text" class="form-control" name="empPhone" />
                      <ErrorMessage
                        name="empPhone"
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
                      <a class="btn btn-outline-primary" href="/">
                        Cancel
                      </a>
                    </div>
                    {statusMessage && (
                      <p className="text-center mt-3">{statusMessage}</p>
                    )}
                  </div>
                </Form>
              </Formik>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
