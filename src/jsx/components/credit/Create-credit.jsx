import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useCreateCreditsMutation } from "../../../redux/rtk/features/credit/creditApi";

const CreateCredit = () => {
  const [createCredits, { data, isLoading, isSuccess, isError, error }] =
    useCreateCreditsMutation();

  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    credits: 0,
    status: "",
  });

  const { title, price, credits, status } = formData || {};

  const hadnleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCredits(formData);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
      setFormData({
        title: "",
        price: 0,
        credits: 0,
        status: "",
      });
    }
  }, [data, isSuccess, isError, error]);

  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <h3 className="mb-0 me-auto">Create New Credit</h3>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Credit Title<span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      name="title"
                      value={title}
                      onChange={hadnleChange}
                      required
                      placeholder="Enter title"
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Credit Price
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control solid"
                      name="price"
                      value={price}
                      onChange={hadnleChange}
                      placeholder="Enter save price"
                      required
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Credits<span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control solid"
                      name="credits"
                      value={credits}
                      onChange={hadnleChange}
                      placeholder="Enter old price"
                      required
                    />
                  </div>

                  <div className="col-xl-6 col-md-12 mb-4">
                    <label className="form-label font-w600">
                      Credit Status
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <select
                      value={status}
                      onChange={hadnleChange}
                      name="status"
                      className="nice-select default-select wide form-control solid"
                      required
                    >
                      <option value="">Choose...</option>
                      <option value="pending">Pending</option>
                      <option value="publish">Publish</option>
                    </select>
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
                        "Create Membership"
                      )}
                    </button>
                  </div>
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
export default CreateCredit;