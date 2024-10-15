import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useCreateNewsMutation } from "../../../redux/rtk/features/news/newsApi";
import toast, { Toaster } from "react-hot-toast";
import PropTypes from "prop-types";

function CreateNewsModal({ jobModal, setJobModal }) {
  const [createNews, { data, isLoading, isSuccess, isError, error }] =
    useCreateNewsMutation();
  const [formData, setFormData] = useState({
    nameOfStation: "",
    senderEmail: "",
    reference: "",
    news: "",
    sendName: "",
    status: "",
  });
  const { nameOfStation, senderEmail, reference, news, sendName, status } =
    formData || {};

  const hadnleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNews(formData);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
      setFormData({
        nameOfStation: "",
        senderEmail: "",
        reference: "",
        news: "",
        sendName: "",
        status: "",
      });
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Modal
      className="modal fade bd-example-modal-lg"
      show={jobModal}
      onHide={setJobModal}
      centered
      size="lg"
    >
      <div className="modal-header">
        <h5 className="modal-title">Create News</h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => setJobModal(false)}
        ></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xl-6  col-md-6 mb-4">
              <label className="form-label font-w600">
                Name of Station<span className="text-danger ms-1">*</span>
              </label>
              <input
                type="text"
                className="form-control solid"
                name="nameOfStation"
                value={nameOfStation}
                onChange={hadnleChange}
                placeholder="Enter name of station"
                required
              />
            </div>
            <div className="col-xl-6  col-md-6 mb-4">
              <label className="form-label font-w600">
                Creator Email<span className="text-danger ms-1">*</span>
              </label>
              <input
                type="email"
                className="form-control solid"
                name="senderEmail"
                value={senderEmail}
                onChange={hadnleChange}
                placeholder="Enter creator email"
                required
              />
            </div>
            <div className="col-xl-6  col-md-6 mb-4">
              <label className="form-label font-w600">
                Creatoe Name<span className="text-danger ms-1">*</span>
              </label>
              <input
                type="text"
                className="form-control solid"
                name="sendName"
                value={sendName}
                onChange={hadnleChange}
                placeholder="Enter creator name"
                required
              />
            </div>
            <div className="col-xl-6  col-md-6 mb-4">
              <label className="form-label font-w600">
                News Reference<span className="text-danger ms-1">*</span>
              </label>
              <input
                type="text"
                className="form-control solid"
                name="reference"
                value={reference}
                onChange={hadnleChange}
                placeholder="Enter reference"
                required
              />
            </div>
            <div className="col-xl-12 mb-4">
              <label className="form-label font-w600">
                News Status<span className="text-danger ms-1">*</span>
              </label>
              <select
                value={status}
                onChange={hadnleChange}
                name="status"
                className="nice-select default-select wide form-control solid"
                required
              >
                <option value="">Choose...</option>
                <option value="draft">Draft</option>
                <option value="publish">Publish</option>
              </select>
            </div>
            <div className="col-xl-12 mb-4">
              <label className="form-label font-w600">
                News<span className="text-danger ms-1">*</span>
              </label>
              <textarea
                className="form-control solid"
                name="news"
                value={news}
                onChange={hadnleChange}
                rows="5"
                placeholder="Enter your news"
                required
              ></textarea>
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
                  "Create News"
                )}
              </button>
              <button
                type="button"
                onClick={() => setJobModal(false)}
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

CreateNewsModal.propTypes = {
  jobModal: PropTypes.bool,
  setJobModal: PropTypes.func,
};

export default CreateNewsModal;
