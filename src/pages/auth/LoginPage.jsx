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
        navigate("/home");
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
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          background: "linear-gradient(to right, #facc15, #f59e0b)", // kuning -> orange
        }}
      >
        <div
          className="card p-4 shadow-lg"
          style={{
            width: "380px",
            borderRadius: "16px",
          }}
        >
          <h2 className="text-center mb-1 fw-bold">CRUD DATA BIMAS KATOLIK</h2>
          <h5 className="text-center mb-4">LOGIN</h5>

          <Formik
            initialValues={initialValue}
            validationSchema={createSchema}
            onSubmit={onSubmit}
          >
            {({ status }) => (
              <Form>
                {/* Username */}
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className="form-label fw-semibold text-start"
                    style={{ width: "100%" }}
                  >
                    Email
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-start"
                    style={{ color: "red", fontSize: "0.9rem" }}
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label fw-semibold text-start"
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
                    style={{ color: "red", fontSize: "0.9rem" }}
                  />
                </div>

                {/* Tombol Login */}
                <div className="mt-3">
                  <button
                    type="submit"
                    className="btn w-100 text-white fw-bold"
                    style={{
                      backgroundColor: "#f59e0b",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  >
                    LOGIN
                  </button>
                </div>

                {/* Reset Password */}
                <p className="mt-3 text-center" style={{ fontSize: "0.9rem" }}>
                  Don't have an account ?{" "}
                  <Link to="/signup" style={{ color: "#f59e0b", fontWeight: "500" }}>
                    Sign Up
                  </Link>
                </p>

                {/* Error Status */}
                {status && (
                  <p className="text-danger text-center mt-3">{status}</p>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
