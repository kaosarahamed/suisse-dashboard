import { useContext, useEffect } from "react";
import Footer from "./layouts/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import "./chart.css";
import "./step.css";
import Nav from "./layouts/nav";

import { ThemeContext } from "../context/ThemeContext";

function MainLayout() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  const adminAuth = localStorage.getItem("admin");
  const admin = JSON.parse(adminAuth);
  const { token } = admin || {};

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <>
      <div
        id="main-wrapper"
        className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        <Nav />
        <div
          className="content-body"
          style={{ minHeight: window.screen.height - 45 }}
        >
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
