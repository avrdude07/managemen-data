import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "../../style/datePicker.css";
import * as Yup from "yup";
import { useAuthContext } from "../../context/AuthContext";
import { findTimesheetById, proceedTimesheetByChecker } from "../../api/api";
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

export default function ProceedTimesheet() {
  const { timesheetId } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [timesheet, setTimesheet] = useState({});
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

    getTimesheet();
  }, []);

  const initialValue = {
    checkerStatus: timesheet.checkerStatus,
    checkerRemark: timesheet.checkerRemark,
  };
  const createSchema = Yup.object().shape({
    checkerStatus: Yup.string().required("Status is required"),
    checkerRemark: Yup.string().nullable(),
  });

  const onSubmit = async (value) => {
    try {
      const status = await proceedTimesheetByChecker(
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
                <label class="col-sm-4 col-from-label">Checker Remark</label>
                <div class="col-sm-8">
                  <Field
                    type="text"
                    class="form-control"
                    name="checkerRemark"
                  />
                  <ErrorMessage
                    name="checkerRemark"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-from-label">Checker Status</label>
                <div class="col-sm-8">
                  <Field class="form-select" name="checkerStatus" as="select">
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </Field>
                  <ErrorMessage
                    name="checkerStatus"
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
                  <Link class="btn btn-outline-primary" to="/checker">
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
