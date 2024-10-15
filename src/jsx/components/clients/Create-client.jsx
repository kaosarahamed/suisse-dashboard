import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useCreateClientMutation } from "../../../redux/rtk/features/client/clientApi";

const CreateClient = () => {
  const [createSeller, { data, isLoading, isSuccess, isError, error }] =
    useCreateClientMutation();

  const [client, setClient] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const { username, email, password, phone } = client || {};

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSeller(client);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
      setClient({
        username: "",
        phone: "",
        email: "",
        password: "",
      });
    }
  }, [data, isSuccess, isError, error]);

  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <h3 className="mb-0 me-auto">Create New Client</h3>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Client Username
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      placeholder="username"
                      name="username"
                      value={username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Client Phone Number
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="phone"
                      className="form-control solid"
                      placeholder="phone"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Client Email
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control solid"
                      placeholder="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Client Password
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control solid"
                      placeholder="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary save-btn">
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
                      "Create Account"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
export default CreateClient;
