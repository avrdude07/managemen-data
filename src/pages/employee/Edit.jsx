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
  const [myProfile, setMyProfile] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const { authUser } = useAuthContext();
  console.log(myProfile);

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
    managerId: myProfile.managerId,
    empEmail: myProfile.empEmail,
    empPhone: myProfile.empPhone,
    empRole: myProfile.empRole,
  };
  const createSchema = Yup.object().shape({
    empName: Yup.string().required("Employee Name is required"),
    dateOfJoin: Yup.date().required("Date of Join is required"),
    managerId: Yup.string().required("Manager ID is required"),
    empEmail: Yup.string()
      .email("Invalid email")
      .required("Employee Email is required"),
    empPhone: Yup.string().required("Employee Phone is required"),
    empRole: Yup.string().required("Employee Role is required"),
  });

  const onSubmit = async (value) => {
    try {
      await editEmployee(authUser, value);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployeeList = async () => {
    try {
      const employee = await getEmployeeSummaryList(authUser);
      setEmployeeList(employee);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <title>Edit Profile</title>
      <div class="d-flex">
        <Sidebar />
        <div class="row p-5" style={{ width: "100%", height: "fit-content" }}>
          <div class="col-md-8 mx-auto rounded border p-4">
            <h2 class="text-center mb-5">My Profile</h2>

            <Formik
              initialValues={initialValue}
              validationSchema={createSchema}
              onSubmit={(values) => {
                console.log(values);
                onSubmit(values);
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
                  <Field
                    class="col-sm-3 form-select"
                    name="managerId"
                    as="select"
                  >
                    {myProfile.manager === null ? (
                      <option value="" disabled>
                        Select manager
                      </option>
                    ) : (
                      <option value={myProfile.manager.empId}>
                        {myProfile.manager.empName}
                      </option>
                    )}
                    {employeeList.map((emp) => {
                      return <option value={emp.empId}>{emp.empName}</option>;
                    })}
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>

                <div class="row mb-3">
                  <label class="col-sm-4 col-from-label">Employee Email</label>
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
                  <label class="col-sm-4 col-from-label">Employee Phone</label>
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
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
