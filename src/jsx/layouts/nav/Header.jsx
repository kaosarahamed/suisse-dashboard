import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Dropdown } from "react-bootstrap";
import blank from "../../../assets/images/profile/pic1.jpg";
import { useDispatch } from "react-redux";
import { searchByNumber } from "../../../redux/rtk/features/filters/jobFilterSlice";
import CreateNewsModal from "./Create-news-modal";
import PropTypes from "prop-types";
import { useGetOneAdminQuery } from "../../../redux/rtk/features/auth/authApi";
import LogoutPage from "./Logout";
import {
  useGetAllEmailQuery,
  useUpdateEmailStatusMutation,
} from "../../../redux/rtk/features/email/emailApi";
import JobLoading from "../../../loading/Job-loading";

const Header = ({ admin }) => {
  const id = admin?.admin?._id;
  const { data: adminData } = useGetOneAdminQuery(id);
  const page = 1;
  const limit = 10;
  const status = "";
  const { data, isLoading, isError } = useGetAllEmailQuery({
    status,
    page,
    limit,
  });
  const [unreadEmailCount, setUnreadEmailCount] = useState(0);
  const [updateEmailStatus] = useUpdateEmailStatusMutation();
  const { profile } = adminData || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [jobModal, setJobModal] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchByNumber(search));
  };

  useEffect(() => {
    const storedCount = localStorage.getItem("unreadEmailCount");
    if (storedCount) {
      setUnreadEmailCount(Number(storedCount));
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isError && data?.emails?.length > 0) {
      const newUnreadEmails = data.emails.filter(
        (email) => email.status === "unread"
      );

      // Update unread email count and store it in localStorage
      setUnreadEmailCount(newUnreadEmails.length);
      localStorage.setItem("unreadEmailCount", newUnreadEmails.length);
    }
  }, [data, isLoading, isError]);

  const markAsSeen = async (id) => {
    await updateEmailStatus({ id, status: "seen" });
    setUnreadEmailCount((prevCount) => {
      const updatedCount = prevCount > 0 ? prevCount - 1 : 0;
      localStorage.setItem("unreadEmailCount", updatedCount);
      return updatedCount;
    });
  };

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
      </>
    );
  }

  if (!isLoading && !isError && data?.emails?.length === 0) {
    content = <p>Emails not found!</p>;
  }
  if (!isLoading && !isError && data?.emails?.length > 0) {
    content = data?.emails?.map((item) => {
      const { _id, name, createdAt } = item || {};
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
      return item.status === "unread" ? (
        <li
          key={_id}
          onClick={() => markAsSeen(_id)}
          style={{ cursor: "pointer" }}
        >
          <Link to={`/emails/${_id}`}>
            <div className="timeline-panel">
              <div className="media me-2">
                <div className="media me-2 media-danger">
                  {name?.slice(0, 2)?.toUpperCase()}
                </div>
              </div>
              <div className="media-body">
                <h6 className="mb-1">
                  {" "}
                  <strong>{name}</strong>{" "}
                </h6>
                <small className="d-block">{formatDate(createdAt)}</small>
              </div>
            </div>
          </Link>
        </li>
      ) : (
        <li
          key={_id}
          onClick={() => markAsSeen(_id)}
          style={{ cursor: "pointer" }}
        >
          <Link to={`/emails/${_id}`}>
            <div className="timeline-panel">
              <div className="media me-2">
                <div className="media me-2 media-danger">
                  {name?.slice(0, 2)?.toUpperCase()}
                </div>
              </div>
              <div className="media-body">
                <h6 className="mb-1">{name}</h6>
                <small className="d-block">{formatDate(createdAt)}</small>
              </div>
            </div>
          </Link>
        </li>
      );
    });
  }

  return (
    <>
      <div className="header">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left">
                <div
                  className="dashboard_bar"
                  style={{ textTransform: "capitalize" }}
                >
                  Dashboard
                </div>
                <div className="nav-item d-flex align-items-center">
                  <form onSubmit={handleSearch}>
                    <div className="input-group search-area">
                      <input
                        type="text"
                        className="form-control active"
                        placeholder="Search job by number"
                        onFocus={() => navigate("/job-list")}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <span className="input-group-text">
                        <Link to={"#"}>
                          <i className="flaticon-381-search-2"></i>
                        </Link>
                      </span>
                    </div>
                  </form>
                  <div className="plus-icon">
                    <Link to={"#"} onClick={() => setJobModal(true)}>
                      <i className="fas fa-plus" />
                    </Link>
                  </div>
                </div>
              </div>
              <ul className="navbar-nav header-right main-notification">
                <Dropdown
                  as="li"
                  className="nav-item dropdown notification_dropdown "
                >
                  <Dropdown.Toggle
                    className="nav-link i-false c-pointer"
                    variant=""
                    as="a"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      className="w-[35px] h-[35px] text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                        d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.029-4.46a2 2 0 0 0-1.942 0L3 8m18 0-9 6.5L3 8"
                      />
                    </svg>

                    <span className="badge light text-white bg-primary rounded-circle">
                      {unreadEmailCount}
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    align="right"
                    className="mt-2 dropdown-menu dropdown-menu-end"
                  >
                    <PerfectScrollbar className="widget-media dlab-scroll p-3 height380">
                      <ul className="timeline">{content}</ul>
                      <div
                        className="ps__rail-x"
                        style={{ left: 0, bottom: 0 }}
                      >
                        <div
                          className="ps__thumb-x"
                          tabIndex={0}
                          style={{ left: 0, width: 0 }}
                        />
                      </div>
                      <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                        <div
                          className="ps__thumb-y"
                          tabIndex={0}
                          style={{ top: 0, height: 0 }}
                        />
                      </div>
                    </PerfectScrollbar>
                    <Link className="all-notification" to="/emails">
                      See all notifications <i className="ti-arrow-right" />
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>

                <li className="nav-item header-profile">
                  <Dropdown as="div" className=" header-profile2 dropdown">
                    <Dropdown.Toggle
                      as="div"
                      variant=""
                      className=" i-false c-pointer"
                      // href="#"
                      role="button"
                      data-toggle="dropdown"
                    >
                      <Link
                        to={"#"}
                        className="nav-link"
                        role="button"
                        data-bs-toggle="dropdown"
                      >
                        <img
                          src={profile ? profile : blank}
                          width="20"
                          alt=""
                        />
                      </Link>
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      align="end"
                      className=" dropdown-menu dropdown-menu-end"
                    >
                      <Link to="/my-profile" className="dropdown-item ai-icon">
                        <svg
                          id="icon-user1"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-primary"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx={12} cy={7} r={4} />
                        </svg>
                        <span className="ms-2">Profile </span>
                      </Link>
                      <Link
                        to="/profile-setting"
                        className="dropdown-item ai-icon"
                      >
                        <svg
                          id="icon-inbox"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-success"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <span className="ms-2">Settings </span>
                      </Link>
                      <LogoutPage />
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <CreateNewsModal jobModal={jobModal} setJobModal={setJobModal} />
    </>
  );
};

Header.propTypes = {
  admin: PropTypes.any,
};

export default Header;
