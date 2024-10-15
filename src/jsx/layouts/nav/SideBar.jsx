import { useReducer, useContext, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Collapse, Dropdown } from "react-bootstrap";
import blank from "../../../assets/images/profile/pic1.jpg";
import { Link } from "react-router-dom";
import { MenuList } from "./Menu";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import LogoutPage from "./Logout";
import { useGetOneAdminQuery } from "../../../redux/rtk/features/auth/authApi";

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "",
  activeSubmenu: "",
};

const SideBar = ({ admin }) => {
  const id = admin?.admin?._id;
  const { data } = useGetOneAdminQuery(id);

  const { fullname, email, profile, username } = data || {};

  let d = new Date();
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
    ChangeIconSidebar,
  } = useContext(ThemeContext);

  const [state, setState] = useReducer(reducer, initialState);

  const [hideOnScroll, setHideOnScroll] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  const handleMenuActive = (status) => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }
  };
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status });
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" });
    }
  };

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  useEffect(() => {
    MenuList.forEach((data) => {
      data.content?.forEach((item) => {
        if (path === item.to) {
          setState({ active: data.title });
        }
        item.content?.forEach((ele) => {
          if (path === ele.to) {
            setState({ activeSubmenu: item.title, active: data.title });
          }
        });
      });
    });
  }, [path]);

  return (
    <div
      onMouseEnter={() => ChangeIconSidebar(true)}
      onMouseLeave={() => ChangeIconSidebar(false)}
      className={`dlabnav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <Dropdown as="div" className=" header-profile2 dropdown">
          <Dropdown.Toggle
            as="div"
            variant=""
            className=" i-false c-pointer"
            // href="#"
            role="button"
            data-toggle="dropdown"
          >
            <div className="header-info2 d-flex align-items-center">
              <img src={profile ? profile : blank} width={20} alt="" />
              <div className="d-flex align-items-center sidebar-info">
                <div>
                  <span className="font-w400 d-block">
                    {fullname ? fullname?.slice(0, 10) : username}...
                  </span>
                  <small className="text-end font-w400">
                    {email?.slice(0, 15)}...
                  </small>
                </div>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
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
            <Link to="/profile-setting" className="dropdown-item ai-icon">
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
        <ul className="metismenu" id="menu">
          {MenuList.map((data, index) => {
            let menuClass = data.classsChange;
            if (menuClass === "menu-title") {
              return (
                <li className={menuClass} key={index}>
                  {data.title}
                </li>
              );
            } else {
              return (
                <li
                  className={` mega-menu-lg ${
                    state.active === data.title ? "mm-active" : ""
                  } ${data.to === path ? "mm-active" : ""}`}
                  key={index}
                >
                  {data.content && data.content.length > 0 ? (
                    <>
                      <Link
                        to={"#"}
                        className="has-arrow"
                        onClick={() => {
                          handleMenuActive(data.title);
                        }}
                      >
                        {data.iconStyle}
                        <span className="nav-text">{data.title}</span>
                        <span className="badge badge-xs style-1 badge-danger">
                          {data.update}
                        </span>
                      </Link>
                      <Collapse in={state.active === data.title ? true : false}>
                        <ul
                          className={`${
                            menuClass === "mm-collapse" ? "mm-show" : ""
                          }`}
                        >
                          {data.content &&
                            data.content.map((data, index) => {
                              return (
                                <li
                                  key={index}
                                  className={`${
                                    state.activeSubmenu === data.title
                                      ? "mm-active"
                                      : ""
                                  }`}
                                >
                                  {data.content && data.content.length > 0 ? (
                                    <>
                                      <Link
                                        to={data.to}
                                        className={`$ {data.hasMenu ? 'has-arrow' : ''} ${
                                          data.to === path ? "mm-active" : ""
                                        } `}
                                        onClick={() => {
                                          handleSubmenuActive(data.title);
                                        }}
                                      >
                                        {data.title}
                                      </Link>
                                      <Collapse
                                        in={
                                          state.activeSubmenu === data.title
                                            ? true
                                            : false
                                        }
                                      >
                                        <ul
                                          className={`${
                                            menuClass === "mm-collapse"
                                              ? "mm-show"
                                              : ""
                                          }`}
                                        >
                                          {data.content &&
                                            data.content.map((data, index) => {
                                              return (
                                                <Fragment key={index}>
                                                  <li>
                                                    <Link
                                                      className={`${
                                                        path === data.to
                                                          ? "mm-active"
                                                          : ""
                                                      }`}
                                                      to={data.to}
                                                    >
                                                      {data.title}
                                                    </Link>
                                                  </li>
                                                </Fragment>
                                              );
                                            })}
                                        </ul>
                                      </Collapse>
                                    </>
                                  ) : (
                                    <Link
                                      to={data.to}
                                      className={`${
                                        data.to === path ? "mm-active" : ""
                                      }`}
                                    >
                                      {data.title}
                                    </Link>
                                  )}
                                </li>
                              );
                            })}
                        </ul>
                      </Collapse>
                    </>
                  ) : (
                    <Link to={data.to}>
                      {data.iconStyle}
                      <span className="nav-text">{data.title}</span>
                    </Link>
                  )}
                </li>
              );
            }
          })}
        </ul>

        <div className="plus-box">
          <p className="fs-14 font-w600 mb-2">
            Let Managed Everything
            <br />
            Create - Read - Update - Delete
            <br />
          </p>
          <p className="plus-box-p">Suisse-Offerten Admin Panel</p>
        </div>
        <div className="copyright">
          <p>
            <strong>Suisse-Offertend Dashboard</strong> © {d.getFullYear()} All
            Rights Reserved
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

SideBar.propTypes = {
  admin: PropTypes.any,
};

export default SideBar;
