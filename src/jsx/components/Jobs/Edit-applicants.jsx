import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useGetOneProposalQuery,
  useUpdateProposalStatusMutation,
} from "../../../redux/rtk/features/proposal/proposalApi";

function EditApplicants({ editModal, setEditModal, id }) {
  const [status, setStatus] = useState("");
  const { data } = useGetOneProposalQuery(id);

  const [
    updateProposalStatus,
    { data: upData, isLoading, isSuccess, isError, error },
  ] = useUpdateProposalStatusMutation();

  useEffect(() => {
    if (data) {
      setStatus(data?.status);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(upData?.message);
    }
  }, [upData, isSuccess, isError, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { status, id };
    updateProposalStatus(formData);
  };

  return (
    <Modal className="modal fade" show={editModal} onHide={setEditModal}>
      <div role="document">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h4 className="modal-title fs-20">Update Applicants Status</h4>
              <button
                type="button"
                className="btn-close"
                onClick={() => setEditModal(false)}
                data-dismiss="modal"
              >
                <span></span>
              </button>
            </div>
            <div className="modal-body">
              <i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
              <div className="add-contact-box">
                <div className="add-contact-content">
                  <div className="form-group mb-3">
                    <label className="text-black font-w500">
                      Applicants Status
                    </label>
                    <div className="contact-name">
                      <select
                        name=""
                        className="form-control"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                      >
                        <option value="">Select...</option>
                        <option value="accept">Accept</option>
                        <option value="pending">Pending</option>
                        <option value="reject">Reject</option>
                        <option value="close">Close</option>
                        <option value="complete">Complete</option>
                        <option value="archived">Archived</option>
                      </select>
                      <span className="validation-text"></span>
                    </div>
                  </div>
                </div>
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
                  "Save Changes"
                )}
              </button>
              <button
                type="button"
                onClick={() => setEditModal(false)}
                className="btn btn-danger"
              >
                {" "}
                <i className="flaticon-delete-1"></i> Discard
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </Modal>
  );
}
EditApplicants.propTypes = {
  setEditModal: PropTypes.func,
  editModal: PropTypes.bool,
  id: PropTypes.string,
};
export default EditApplicants;
