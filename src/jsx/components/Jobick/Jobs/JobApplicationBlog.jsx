import { Link } from "react-router-dom";
import {
  useDeleteProposalMutation,
  useGetAllProposalsByAdminQuery,
} from "../../../../redux/rtk/features/proposal/proposalApi";
import { useEffect, useState } from "react";
import Pagination from "../../Jobs/Pagination";
import ApplicantsLoading from "../../../../loading/Applicants-loading";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import EditApplicants from "../../Jobs/Edit-applicants";

const JobApplicationBlog = ({ statusFilter }) => {
  const [page, setPage] = useState(1);
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const limit = 20;
  const statusMap = {
    AllStatus: "", // Show all if no specific status
    pending: "pending",
    close: "close",
    complete: "complete",
    rejected: "rejected",
    accept: "accept",
    archived: "archived",
  };
  const { data, isLoading, isError } = useGetAllProposalsByAdminQuery({
    status: statusMap[statusFilter] || "",
    page,
    limit,
  });
  const [
    deleteProposal,
    {
      data: deleteData,
      isLoading: deleteLoading,
      isSuccess: deleteSuccess,
      isError: deleteIsError,
      error: deleteError,
    },
  ] = useDeleteProposalMutation();
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const totalItems = data?.totalProposals || 0;
  const handleDelete = (id) => {
    deleteProposal(id);
    setDeleteId(id);
  };

  const handleEditClick = (event, id) => {
    event.preventDefault();
    setEditModal(true);
    setEditId(id);
  };

  useEffect(() => {
    if (deleteIsError) {
      toast.error(deleteError?.data?.message);
    }
    if (deleteSuccess) {
      toast.success(deleteData?.message);
    }
  }, [deleteData, deleteSuccess, deleteIsError, deleteError]);

  //   decide what to render
  let content;

  if (isLoading) {
    content = (
      <>
        <ApplicantsLoading />
        <ApplicantsLoading />
        <ApplicantsLoading />
        <ApplicantsLoading />
        <ApplicantsLoading />
        <ApplicantsLoading />
        <ApplicantsLoading />
      </>
    );
  }
  if (!isLoading && !isError && data?.proposals?.length === 0) {
    content = (
      <p style={{ padding: "20px", fontSize: "20px" }}>Applicants not found!</p>
    );
  }
  if (!isLoading && !isError && data?.proposals?.length > 0) {
    content = data?.proposals?.map((item) => {
      const {
        _id,
        priceUnit,
        offerPrice,

        status,
        jobNumber,
        jobTitle,
        sellerName,
        createdAt,
        compititor,
      } = item || {};

      function formatDate(isoString) {
        const date = new Date(isoString);

        // Extract the day, month, and year
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
        const year = date.getFullYear();

        // Return in the format DD-MM-YYYY
        return `${day}-${month}-${year}`;
      }

      return (
        <tr role="row" className="odd" key={_id}>
          <td>{jobNumber}</td>
          <td className="wspace-no" style={{ width: "50px" }}>
            {jobTitle}
          </td>
          <td>{compititor}</td>
          <td>{offerPrice}</td>
          <td>{priceUnit}</td>

          <td>{sellerName}</td>
          <td style={{ width: "200px" }}>{formatDate(createdAt)}</td>
          <td>
            {status === "pending" ? (
              <span className="btn btn-info btn-sm btn-rounded">
                {status?.slice(0, 20)}
              </span>
            ) : status === "complete" ? (
              <span className="btn btn-success btn-sm btn-rounded">
                {status}
              </span>
            ) : status === "close" ? (
              <span className="btn btn-success btn-sm btn-rounded">
                {status}
              </span>
            ) : status === "rejected" ? (
              <span className="btn btn-danger btn-sm btn-rounded">
                {status}
              </span>
            ) : status === "accept" ? (
              <span className="btn btn-primary btn-sm btn-rounded">
                {status}
              </span>
            ) : status === "archived" ? (
              <span className="btn btn-danger btn-sm btn-rounded">
                {status}
              </span>
            ) : null}
          </td>
          <td
            className="action-btn wspace-no"
            style={{ display: "flex", gap: "10px" }}
          >
            <span>
              <Link
                className="btn btn-secondary light mr-2 p-2"
                onClick={(event) => handleEditClick(event, _id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  className="svg-main-icon"
                >
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <rect x="0" y="0" width="24" height="24"></rect>
                    <path
                      d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z"
                      fill="#000000"
                      fillRule="nonzero"
                      transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "
                    ></path>
                    <rect
                      fill="#000000"
                      opacity="0.3"
                      x="5"
                      y="20"
                      width="15"
                      height="2"
                      rx="1"
                    ></rect>
                  </g>
                </svg>
              </Link>
            </span>
            <span>
              <Link
                className="btn btn-danger light p-2"
                onClick={() => handleDelete(_id)}
              >
                {deleteId === _id && deleteLoading ? (
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
                  </>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    version="1.1"
                    className="svg-main-icon"
                  >
                    <g
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <rect x="0" y="0" width="24" height="24"></rect>
                      <path
                        d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z"
                        fill="#000000"
                        fillRule="nonzero"
                      ></path>
                      <path
                        d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
                        fill="#000000"
                        opacity="0.3"
                      ></path>
                    </g>
                  </svg>
                )}
              </Link>
            </span>
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <div className="applicants-table" id="application-data">
        <table
          className="table display mb-4 dataTablesCard job-table table-responsive-xl card-table dataTable no-footer"
          id="example5"
        >
          <thead>
            <tr role="row">
              <th className="sorting_asc">Job Number</th>
              <th className="sorting_asc">Job Title</th>
              <th className="sorting_asc">Compititor</th>
              <th className="sorting_asc">Price</th>
              <th className="sorting_asc">Unit</th>

              <th className="sorting_asc">Applicants</th>
              <th className="sorting_asc">Created</th>
              <th className="sorting_asc">Status</th>
              <th className="sorting_asc text-center">Actions</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
        <div className="d-sm-flex text-center justify-content-between align-items-center">
          <div className="dataTables_info" id="example5_info">
            Showing {totalItems} entries
          </div>
          <div>
            {totalItems > 0 && (
              <Pagination
                handlePageChange={handlePageChange}
                page={page}
                totalItems={totalItems}
                itemsPerPage={limit}
              />
            )}
          </div>
        </div>
      </div>
      <Toaster />
      <EditApplicants
        editModal={editModal}
        setEditModal={setEditModal}
        id={editId}
      />
    </>
  );
};

JobApplicationBlog.propTypes = {
  statusFilter: PropTypes.any,
};

export default JobApplicationBlog;
