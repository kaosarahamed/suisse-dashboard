import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo-text.png";
import { useRegisterAdminMutation } from "../../redux/rtk/features/auth/authApi";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    password: "",
    agreement: false,
  });
  const [registerAdmin, { data, isLoading, isSuccess, isError, error }] =
    useRegisterAdminMutation();
  const { username, email, password, agreement } = admin || {};
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdmin({
      ...admin,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  function onSignUp(e) {
    e.preventDefault();
    registerAdmin(admin);
  }
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message, {
        duration: 800,
      });
      setAdmin({
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  }, [isError, isSuccess, data, error, navigate]);
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-8 col-lg-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/login">
                        <img src={logo} alt="" className="singup-logo" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Sign up your account</h4>

                    <form onSubmit={onSignUp}>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Username</strong>
                          <span className="required"> *</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="username"
                          name="username"
                          value={username}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                          <span className="required"> *</span>
                        </label>
                        <input
                          value={email}
                          name="email"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="hello@example.com"
                          required
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Password</strong>
                          <span className="required"> *</span>
                        </label>
                        <input
                          value={password}
                          name="password"
                          onChange={handleChange}
                          className="form-control"
                          defaultValue="Password"
                          placeholder="xxxxxxxxxx"
                          required
                        />
                      </div>
                      <div className="form-group mb-3 access-req">
                        <div className="custom-control custom-checkbox ml-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="basic_checkbox_1"
                            onChange={handleChange}
                            checked={agreement}
                            name="agreement"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                          >
                            Agree with our terms & condtions
                          </label>
                        </div>
                      </div>
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block loading"
                        >
                          {isLoading ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="spinner"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                              </svg>
                              <p className="loading-text">Loading...</p>
                            </>
                          ) : (
                            "Register"
                          )}
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        Already have an account?{" "}
                        <Link className="text-primary" to="/login">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Register;
