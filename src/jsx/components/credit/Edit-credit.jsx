import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useGetOneCreditsQuery,
  useUpdateCreditsMutation,
} from "../../../redux/rtk/features/credit/creditApi";

function EditCredit({ isShow, setIsShow, id }) {
  const { data } = useGetOneCreditsQuery(id);
  const [
    updateCredits,
    { data: upData, isLoading, isSuccess, isError, error },
  ] = useUpdateCreditsMutation();
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    credits: 0,
    status: "",
  });

  const { title, price, credits, status } = formData || {};

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const hadnleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCredits({ formData, id });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(upData?.message);
    }
  }, [upData, isSuccess, isError, error]);

  return (
    <Modal
      className="modal fade bd-example-modal-lg"
      show={isShow}
      onHide={setIsShow}
      centered
      size="lg"
    >
      <div className="modal-header">
        <h5 className="modal-title">Update Credit</h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => setIsShow(false)}
        ></button>
      </div>
      <div className="modal-body">
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
              />
            </div>
            <div className="col-xl-6  col-md-6 mb-4">
              <label className="form-label font-w600">
                Credit Price<span className="text-danger ms-1">*</span>
              </label>
              <input
                type="number"
                className="form-control solid"
                name="price"
                value={price}
                onChange={hadnleChange}
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
                required
              />
            </div>
            <div className="col-xl-6 mb-4">
              <label className="form-label font-w600">
                Credit Status<span className="text-danger ms-1">*</span>
              </label>
              <select
                value={status}
                onChange={hadnleChange}
                name="status"
                className="nice-select default-select wide form-control solid"
                required
              >
                <option selected>Choose...</option>
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
                  "Save Changes"
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsShow(false)}
                className="btn btn-danger"
              >
                {" "}
                <i className="flaticon-delete-1"></i> Discard
              </button>
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </Modal>
  );
}

EditCredit.propTypes = {
  isShow: PropTypes.bool,
  setIsShow: PropTypes.func,
  id: PropTypes.any,
};

export default EditCredit;
