import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function SignupPage() {
  const navigate = useNavigate();
  const initialValue = {
    username: "",
    email: "",
    password: "",
  };
  const createSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (value, { setSubmitting, setStatus }) => {
    try {
      const response = await register(value);
      if (response.error) {
        setStatus(response.error);
      } else {
        navigate("/login");
      }
    } catch (error) {
      setStatus("Register failed. Please try again");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <title>Sign Up</title>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          background: "linear-gradient(to right, #facc15, #f59e0b)", // kuning → orange
        }}
      >
        <div class="card p-4 shadow" style={{ width: "40vw" }}>
          <h2 class="text-center mb-5">Sign Up</h2>

          <Formik
            initialValues={initialValue}
            validationSchema={createSchema}
            onSubmit={onSubmit}
          >
            {({ status }) => (
              <Form>
                <div className="mb-3 ">
                  <label
                    htmlFor="username"
                    className="form-label text-start"
                    style={{ width: "100%" }}
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Enter your username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="mb-3 ">
                  <label
                    htmlFor="email"
                    className="form-label text-start"
                    style={{ width: "100%" }}
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>

                <div className="mb-3 ">
                  <label
                    htmlFor="password"
                    className="form-label text-start"
                    style={{ width: "100%" }}
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-start"
                    style={{ color: "red" }}
                  />
                </div>

                <div class="row" style={{ width: "100%" }}>
                  <div class="mt-3">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      style={{ width: "100%" }}
                    >
                      Sign Up
                    </button>
                  </div>
                  <p className="mt-3">
                    Already have an account ? <Link to="/login">Login</Link>
                  </p>
                  {status && (
                    <p className="text-danger text-center mt-3">{status}</p>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
