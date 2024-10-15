import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo-text.png";
import loginbg from "../../assets/images/pic1.png";
import { useLoginAdminMutation } from "../../redux/rtk/features/auth/authApi";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [loginAdmin, { data, isLoading, isSuccess, isError, error }] =
    useLoginAdminMutation();
  const [isShow, setIsshow] = useState(false);
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = admin || {};

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAdmin(admin);
  };

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
    <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
      <div className="login-aside text-center  d-flex flex-column flex-row-auto">
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <div className="text-center mb-4 pt-5">
            <img src={logo} alt="" className="logo" />
          </div>
          <h3 className="mb-2">Welcome back!</h3>
          <p>
            Managaing everything here <br />
            Login now!
          </p>
        </div>
        <div
          className="aside-image"
          style={{ backgroundImage: "url(" + loginbg + ")" }}
        ></div>
      </div>
      <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
        <div className="d-flex justify-content-center h-100 align-items-center">
          <div className="authincation-content style-2">
            <div className="row no-gutters">
              <div className="col-xl-12 tab-content">
                <div id="sign-in" className="auth-form form-validation">
                  <form onSubmit={handleSubmit} className="form-validate">
                    <h3 className="text-center mb-4 text-black text-3xl">
                      Sign in your account
                    </h3>
                    <div className="form-group mb-3">
                      <label className="mb-1" htmlFor="val-email">
                        <strong>Email</strong>{" "}
                        <span className="required">*</span>
                      </label>
                      <div>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={handleChange}
                          name="email"
                          required
                          placeholder="Type Your Email Address"
                        />
                      </div>
                    </div>
                    <div className="form-group mb-3 password-wrap">
                      <label className="mb-1">
                        <strong>Password</strong>{" "}
                        <span className="required">*</span>
                      </label>
                      <input
                        type={isShow ? "text" : "password"}
                        className="form-control"
                        value={password}
                        placeholder="Type Your Password"
                        onChange={handleChange}
                        name="password"
                      />
                      <span className="show-eye">
                        {isShow ? (
                          <i
                            className="fa-solid fa-eye-low-vision cursor-pointer"
                            onClick={() => setIsshow(!isShow)}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-eye cursor-pointer"
                            onClick={() => setIsshow(!isShow)}
                          ></i>
                        )}
                      </span>
                    </div>
                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                      <div className="form-group mb-3 access-req">
                        <div className="custom-control custom-checkbox ml-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="basic_checkbox_1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                          >
                            Remember my preference
                          </label>
                        </div>
                        <div>
                          <Link to="/forgot-password">forget password?</Link>
                        </div>
                      </div>
                    </div>
                    <div className="text-center form-group mb-3">
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
                          "Login"
                        )}
                      </button>
                    </div>
                  </form>
                  <div className="new-account mt-3">
                    <p>
                      Do not have an account?{" "}
                      <Link className="text-primary" to="/register">
                        Sign up
                      </Link>
                    </p>
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

export default Login;
