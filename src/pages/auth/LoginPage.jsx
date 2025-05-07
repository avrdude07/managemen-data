import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/api";
import { useAuthContext } from "../../context/AuthContext";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

export default function LoginPage() {
  const navigate = useNavigate();
  const { saveToken } = useAuthContext();

  const initialValue = {
    username: "",
    password: "",
  };

  const createSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (value, { setSubmitting, setStatus }) => {
    try {
      const accessToken = await login(value);

      if (accessToken) {
        saveToken(accessToken);
        navigate("/");
      } else {
        setStatus("Username or password is wrong");
      }
    } catch (error) {
      setStatus("Login Failed. Please try again");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <title>Login</title>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: "40vw" }}>
          <h2 className="mb-4 text-center">Login</h2>
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
                      Login
                    </button>
                  </div>
                  <p className="mt-3">
                    Don't have an account ? <Link to="/signup">Sign Up</Link>
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
