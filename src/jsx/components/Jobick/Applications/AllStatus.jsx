import { useGetAllClientsQuery } from "../../../../redux/rtk/features/client/clientApi";
import { useState } from "react";
import Pagination from "../../Jobs/Pagination";
import PropTypes from "prop-types";
import CreatorsLoading from "../../../../loading/Creators-loading";

const AllStatus = ({ statusFilter }) => {
  const [page, setPage] = useState(1);
  const limit = 20;

  const statusMap = {
    AllStatus: "", // Show all if no specific status
    pending: "pending",
    verified: "verified",
  };
  const { data, isLoading, isError } = useGetAllClientsQuery({
    page,
    limit,
    status: statusMap[statusFilter] || "",
  });
  console.log(data);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const totalItems = data?.totalClients;

  // decide what to render
  let content;

  if (isLoading) {
    content = (
      <>
        <CreatorsLoading />
        <CreatorsLoading />
        <CreatorsLoading />
        <CreatorsLoading />
        <CreatorsLoading />
      </>
    );
  }
  if (!isLoading && !isError && data?.clients?.length === 0) {
    content = (
      <p style={{ padding: "20px", fontSize: "20px" }}>
        Job Creator not found!
      </p>
    );
  }
  if (!isLoading && !isError && data?.clients?.length > 0) {
    content = data?.clients?.map((item, index) => {
      const {
        _id,
        username,
        email,
        phone,
        firstname,
        lastname,
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
        <tr role="row" className="odd" key={_id}>
          <td>{index + 1}</td>
          <td className="wspace-no">{username}</td>
          <td className="wspace-no">{email}</td>
          <td className="wspace-no">{createdJobs}</td>
          <td className="wspace-no">
            <span className="text-secoundry fs-14 font-w600">
              <i className="fas fa-phone-alt me-2"></i>
              {phone ? phone : "not-available"}
            </span>
          </td>
          <td>{firstname ? firstname + " " + lastname : "not-available"}</td>

          <td>
            <span className="btn btn-outline-light btn-rounded btn-sm">
              {status}
            </span>
          </td>
          <td className="wspace-no">{formatDate(createdAt)}</td>
        </tr>
      );
    });
  }

  return (
    <>
      <div
        className="table-responsive dataTables_wrapper"
        id="applications-data"
      >
        <table
          className="table dataTable display mb-4 dataTablesCard order-table  card-table text-black  application no-footer ms-0"
          id="example5"
        >
          <thead>
            <tr role="row">
              <th className="sorting_asc">No</th>
              <th className="sorting_asc">Username</th>
              <th className="sorting_asc">Email</th>
              <th className="sorting_asc">Created Jobs</th>
              <th className="sorting_asc">Phone</th>
              <th className="sorting_asc">Full Name</th>
              <th className="sorting_asc">Status</th>
              <th className="sorting_asc">Joined</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
        <div className="d-sm-flex text-center justify-content-between align-items-center">
          <div className="dataTables_info" id="example5_info">
            Showing {totalItems} entries
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
      </div>
    </>
  );
};

AllStatus.propTypes = {
  statusFilter: PropTypes.any,
};

export default AllStatus;
