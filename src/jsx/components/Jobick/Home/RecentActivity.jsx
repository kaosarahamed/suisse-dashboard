import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RecentActivity = ({ emails }) => {
  return (
    <>
      <div className="card">
        <div className="card-header border-0">
          <h4 className="fs-20 mb-1">Recent emails recived</h4>
        </div>
        <div
          className="card-body loadmore-content  recent-activity-wrapper"
          id="RecentActivityContent"
        >
          {emails?.map((item, index) => {
            const { name, createdAt } = item || {};

            function formatDate(dateString) {
              const date = new Date(dateString);

              // Extract date and time in the desired format
              const day = date.getDate();
              const month = date.toLocaleString("default", { month: "long" });
              const year = date.getFullYear();

              const time = date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });

              // Return formatted date and time
              return `${day} ${month} ${year} - ${time}`;
            }
            return (
              <div className="d-flex recent-activity" key={index}>
                <span className="me-3 activity">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                  >
                    <circle cx="8.5" cy="8.5" r="8.5" fill="#f93a0b" />
                  </svg>
                </span>
                <p
                  style={{
                    backgroundColor: "#2769EE",
                    color: "white",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "Center",
                    alignItems: "center",
                    borderRadius: "5px",
                    fontSize: "20px",
                  }}
                >
                  {name?.slice(0, 2)}
                </p>
                <div className="ms-3">
                  <h5 className="mb-1">{name}</h5>
                  <span>{formatDate(createdAt)}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="card-footer border-0 m-auto pt-0">
          <Link
            to="/emails"
            className="btn btn-outline-primary m-auto dlab-load-more"
          >
            View more
          </Link>
        </div>
      </div>
    </>
  );
};

RecentActivity.propTypes = {
  emails: PropTypes.array,
};

export default RecentActivity;
