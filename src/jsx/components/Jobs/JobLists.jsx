import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import {
  useDeleteJobMutation,
  useGetAllJobByAdminQuery,
} from "../../../redux/rtk/features/job/jobApi";
import JobLoading from "../../../loading/Job-loading";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import EditJob from "./Edit-job";
import toast, { Toaster } from "react-hot-toast";

const JobLists = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("AllStatus");
  const state = useSelector((state) => state.jobFilter);
  const search = state?.search;
  const [editModal, setEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [id, setId] = useState(null);
  const [
    deleteJob,
    {
      data: deleteData,
      isLoading: deleteLoading,
      isSuccess: deleteSuccess,
      isError: deleteIsError,
      error: deleteError,
    },
  ] = useDeleteJobMutation();
  const limit = 20;
  const statusMap = {
    AllStatus: "", // Show all if no specific status
    Pending: "pending",
    close: "close",
    active: "active",
  };
  const { data, isLoading, isError } = useGetAllJobByAdminQuery({
    page,
    limit,
    search: search,
    status: statusMap[statusFilter] || "",
  });

  const handleDelete = (id) => {
    deleteJob(id);
    setDeleteId(id);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const totalJobs = data?.totalJobs;
  const totalItems = data?.totalJobs || 0;

  const handleEditClick = (event, id) => {
    event.preventDefault();
    setEditModal(true);
    setId(id);
  };

  useEffect(() => {
    if (deleteIsError) {
      toast.error(deleteError?.data?.message);
    }
    if (deleteSuccess) {
      toast.success(deleteData?.message);
    }
  }, [deleteData, deleteSuccess, deleteIsError, deleteError]);

  // decide what to render
  let content;

  if (isLoading) {
    content = (
      <>
        <JobLoading />
        <JobLoading />
        <JobLoading />
        <JobLoading />
        <JobLoading />
        <JobLoading />
        <JobLoading />
      </>
    );
  }
  if (!isLoading && !isError && data?.jobs?.length === 0) {
    content = (
      <p style={{ padding: "20px", fontSize: "20px" }}>Jobs not found!</p>
    );
  }
  if (!isLoading && !isError && data?.jobs?.length > 0) {
    content = data?.jobs?.map((item) => {
      const {
        jobTitle,
        jobNumber,
        jobUsername,
        jobFiles,
        jobLocation,
        createdAt,
        status,
        _id,
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
        <tr key={_id}>
          <td>{jobNumber}</td>
          <td>{jobTitle?.slice(0, 20)}...</td>
          <td className="wspace-no">{jobUsername?.slice(0, 20)}</td>
          <td
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              width: "200px",
            }}
          >
            {jobFiles?.slice(0, 3)?.map((item, index) => (
              <img
                src={item}
                key={index}
                alt=""
                style={{
                  width: "50px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            ))}
          </td>
          <td>{jobLocation}</td>
          <td>{formatDate(createdAt)}</td>
          <td>
            <span
              className={`badge badge-lg light badge-${
                status === "active" ? "success" : "danger"
              }`}
            >
              {status}
            </span>
          </td>
          <td>
            <div className="action-buttons d-flex justify-content-end">
              <Link
                to={`/job-list/${_id}`}
                className="btn btn-success light mr-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-main-icon"
                  width="24px"
                  height="24px"
                  viewBox="0 0 32 32"
                  x="0px"
                  y="0px"
                >
                  <g data-name="Layer 21">
                    <path
                      d="M29,14.47A15,15,0,0,0,3,14.47a3.07,3.07,0,0,0,0,3.06,15,15,0,0,0,26,0A3.07,3.07,0,0,0,29,14.47ZM16,21a5,5,0,1,1,5-5A5,5,0,0,1,16,21Z"
                      fill="#000000"
                      fillRule="nonzero"
                    ></path>
                    <circle
                      cx="16"
                      cy="16"
                      r="3"
                      fill="#000000"
                      fillRule="nonzero"
                    ></circle>
                  </g>
                </svg>
              </Link>
              <Link
                className="btn btn-secondary light mr-2"
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
              <Link
                className="btn btn-danger light"
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
            </div>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="custom-position">
      <div className="d-flex align-items-center mb-4 flex-wrap ">
        <h4 className="fs-20 font-w600  me-auto">All Jobs</h4>
        <Tab.Container
          defaultActiveKey="AllStatus"
          onSelect={(status) => setStatusFilter(status)}
        >
          <div className="card-action coin-tabs mt-3 mt-sm-0">
            <Nav as="ul" className="nav nav-tabs" role="tablist">
              <Nav.Item as="li" className="nav-item">
                <Nav.Link eventKey="AllStatus">All Status</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link eventKey="Pending">Pending</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link eventKey="close">Close</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link eventKey="active">Active</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Tab.Container>
      </div>
      <div className="row ">
        <div className="col-xl-12">
          <div className="table-responsive">
            <table className="table display mb-4 dataTablesCard job-table table-responsive-xl card-table dataTable no-footer">
              <thead>
                <tr>
                  <th>Job Number</th>
                  <th>Job Title</th>
                  <th>Job Creator</th>
                  <th>Job Files</th>
                  <th>Job Location</th>
                  <th>Job Created</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{content}</tbody>
            </table>
          </div>
        </div>
        <div className="d-md-flex d-block align-items-center justify-content-between text-center  flex-wrap mt-md-0 mt-3">
          <div className="mb-md-0 mb-2">
            <h5 className="mb-0">Showing {totalJobs} Jobs</h5>
          </div>
          {totalItems > 0 && (
            <Pagination
              handlePageChange={handlePageChange}
              page={page}
              totalItems={totalItems}
              itemsPerPage={limit}
            />
          )}
          <EditJob editModal={editModal} setEditModal={setEditModal} id={id} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};
export default JobLists;
