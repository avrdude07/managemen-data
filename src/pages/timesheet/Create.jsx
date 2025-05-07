import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "../../style/datePicker.css";
import * as Yup from "yup";

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

export default function CreateTimesheet() {
  const initialValue = {
    username: "",
    date: "",
    task: "",
    hr: "",
    status: "",
    remark: "",
    reportManager: "",
    rmStatus: "",
    rmRemark: "",
  };
  const createSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    date: Yup.string().required("Date is required"),
    task: Yup.string().required("Task is required"),
    hr: Yup.string().required("HR is required"),
    status: Yup.string().required("Status is required"),
    remark: Yup.string().required("Remark is required"),
    reportManager: Yup.string().required("Report Manager is required"),
    rmStatus: Yup.string().required("RM Status is required"),
    rmRemark: Yup.string().required("RM Remark is required"),
  });
  return (
    <div class="container my-4">
      <div class="row">
        <div class="col-md-8 mx-auto rounded border p-4">
          <h2 class="text-center mb-5">New Timesheet</h2>

          <Formik
            initialValues={initialValue}
            validationSchema={createSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form>
              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Username</label>
                <div class="col-sm-8 align-items-start">
                  <Field type="text" class="form-control" name="username" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Submit Date</label>
                <div class="col-sm-8">
                  <Field
                    type="date"
                    class="form-control"
                    name="date"
                    component={DatePickerFiled}
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Task</label>
                <div class="col-sm-8">
                  <Field type="text" class="form-control" name="task" />
                  <ErrorMessage
                    name="task"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">HR</label>
                <div class="col-sm-8">
                  <Field type="text" class="form-control" name="hr" />
                  <ErrorMessage
                    name="hr"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Status</label>
                <div class="col-sm-8">
                  <Field type="text" class="form-control" name="status" />
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Remark</label>
                <div class="col-sm-8">
                  <Field type="text" class="form-control" name="remark" />
                  <ErrorMessage
                    name="remark"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Report Manager</label>
                <div class="col-sm-8">
                  <Field
                    type="text"
                    class="form-control"
                    name="reportManager"
                  />
                  <ErrorMessage
                    name="reportManager"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">
                  Report Manager Status
                </label>
                <div class="col-sm-8">
                  <Field class="form-select" name="rmStatus" as="select">
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </Field>
                  <ErrorMessage
                    name="rmStatus"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">
                  Report Manager Remark
                </label>
                <div class="col-sm-8">
                  <Field type="text" class="form-control" name="rmRemark" />
                  <ErrorMessage
                    name="rmRemark"
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
                  <a class="btn btn-outline-primary" href="/timesheet">
                    Cancel
                  </a>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
