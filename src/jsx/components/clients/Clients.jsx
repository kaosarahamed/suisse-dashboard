import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Jobs/Pagination";
import toast, { Toaster } from "react-hot-toast";
import ClientHeader from "./Client-header";
import {
  useDeleteClientMutation,
  useGetAllClientsQuery,
} from "../../../redux/rtk/features/client/clientApi";
import ApproveEmail from "./Approve-email";
import ClientLoading from "../../../loading/Client-loading";

const Clients = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("AllStatus");
  const [showEmail, setShowEmail] = useState(false);
  const [emailId, setEmailId] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [
    deleteClient,
    {
      data: deleteData,
      isLoading: deleteLoading,
      isSuccess: deleteSuccess,
      isError: deleteIsError,
      error: deleteError,
    },
  ] = useDeleteClientMutation();
  const limit = 20;
  const statusMap = {
    AllStatus: "", // Show all if no specific status
    pending: "pending",
    verified: "verified",
    rejected: "rejected",
  };
  const { data, isLoading, isError } = useGetAllClientsQuery({
    status: statusMap[statusFilter] || "",
    page,
    limit,
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const totalItems = data?.totalClients || 0;

  const handleEditEmail = (event, id) => {
    event.preventDefault();
    setShowEmail(true);
    setEmailId(id);
  };

  const handleDelete = (id) => {
    deleteClient(id);
    setDeleteId(id);
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
        <ClientLoading />
        <ClientLoading />
        <ClientLoading />
        <ClientLoading />
        <ClientLoading />
        <ClientLoading />
        <ClientLoading />
      </>
    );
  }
  if (!isLoading && !isError && data?.clients?.length === 0) {
    content = (
      <p style={{ padding: "20px", fontSize: "20px" }}>Clients not found!</p>
    );
  }
  if (!isLoading && !isError && data?.clients?.length > 0) {
    content = data?.clients?.map((item) => {
      const {
        _id,
        firstname,
        lastname,
        username,
        email,
        phone,
        status,
        createdJobs,
        createdAt,
      } = item || {};
      function formatDate(isoString) {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const month = monthNames[date.getMonth()];
        return `${day} ${month} - ${year}`;
      }

      return (
        <tr className="btn-reveal-trigger" key={_id}>
          <td className="customer_shop_single">
            {firstname ? firstname + " " + lastname : "Not Available"}
          </td>
          <td className="py-3">
            <Link to="/ecom-customers">
              <div className="media d-flex align-items-center ">
                <div className="avatar avatar-xl me-2">
                  <div className="">
                    <p
                      style={{
                        backgroundColor: "#7ED321",
                        color: "white",
                        fontSize: "20px",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50px",
                        margin: "0px",
                      }}
                    >
                      {username?.slice(0, 1)}
                    </p>
                  </div>
                </div>
                <div className="media-body">
                  <h5 className="mb-0 fs--1">{username}</h5>
                </div>
              </div>
            </Link>
          </td>
          <td className="py-2">
            <a href={`mailto:${email}`}>{email}</a>
          </td>
          <td className="py-2">
            {" "}
            <a href={`tel:${phone}`}>{phone ? phone : "Not Available"}</a>
          </td>
          <td className="py-2">
            {" "}
            <a href="tel:2012001851">{createdJobs}</a>
          </td>

          <td className="">
            <div className="action-buttons d-flex justify-content-start align-items-center">
              {status === "pending" || status === "rejected" ? (
                <span className="badge badge-lg light badge-danger custom-verify">
                  {status}
                </span>
              ) : (
                <span className="badge badge-lg light badge-success custom-verify">
                  {status}
                </span>
              )}
              <Link
                className="btn btn-secondary light mr-2"
                onClick={(event) => handleEditEmail(event, _id)}
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
            </div>
          </td>
          <td>{formatDate(createdAt)}</td>
          <td className="py-2">
            <div className="action-buttons d-flex justify-content-end align-items-center">
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
    <Fragment>
      <ClientHeader setStatusFilter={setStatusFilter} />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table mb-0 table-striped">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Created Jobs</th>
                      <th>Email Verify</th>
                      <th>Joined</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody id="customers">{content}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-md-flex d-block align-items-center justify-content-between text-center  flex-wrap mt-md-0 mt-3">
        <div className="mb-md-0 mb-2">
          <h5 className="mb-0">Showing {totalItems} Clients</h5>
        </div>
        {totalItems > 0 && (
          <Pagination
            handlePageChange={handlePageChange}
            page={page}
            totalItems={totalItems}
            itemsPerPage={limit}
          />
        )}
      </div>
      <ApproveEmail
        showEmail={showEmail}
        setShowEmail={setShowEmail}
        id={emailId}
      />
      <Toaster />
    </Fragment>
  );
};

export default Clients;
