import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo-text.png";
import { useEffect, useState } from "react";
import { useCheckOTPAdminMutation } from "../../redux/rtk/features/auth/authApi";
import toast, { Toaster } from "react-hot-toast";

const CheckOto = () => {
  const [code, setCode] = useState();
  const navigate = useNavigate();
  const [checkOTPAdmin, { data, isLoading, isSuccess, isError, error }] =
    useCheckOTPAdminMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    checkOTPAdmin({ code });
  };
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message, {
        duration: 800,
      });
      setCode("");
      setTimeout(() => {
        navigate("/change-password");
      }, 1500);
    }
  }, [isError, isSuccess, data, error, navigate]);
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        {" "}
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/dashboard">
                        <img src={logo} alt="" className="singup-logo" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Check OTP</h4>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label className="">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
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
                            "Check OTP"
                          )}
                        </button>
                      </div>
                    </form>
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
};

export default CheckOto;
