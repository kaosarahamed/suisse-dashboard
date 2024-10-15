import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { ThemeContext } from "../../../context/ThemeContext";
import CanvasChartTab from "../Jobick/Home/CanvasChartTab";
import FeaturedCompanies from "../Jobick/Home/FeaturedCompanies";
import RecentActivity from "../Jobick/Home/RecentActivity";
import HomeSlider from "../Jobick/Home/HomeSlider";
import pic1 from "./../../../assets/images/profile/pic1.jpg";
import { useGetOneAdminQuery } from "../../../redux/rtk/features/auth/authApi";
import { useGetAllJobDefaultQuery } from "../../../redux/rtk/features/job/jobApi";
import { useGetAllEmailDefaultQuery } from "../../../redux/rtk/features/email/emailApi";

//Components
const NewCustomers1 = loadable(() =>
  pMinDelay(import("../Jobick/Home/NewCustomers1"), 1000)
);
const NewCustomers3 = loadable(() =>
  pMinDelay(import("../Jobick/Home/NewCustomers3"), 1000)
);
const ApexPieChart = loadable(() =>
  pMinDelay(import("../Jobick/Home/ApexPieChart"), 1000)
);

const Home = () => {
  const adminAuth = localStorage.getItem("admin");
  const admin = JSON.parse(adminAuth);
  const id = admin?.admin?._id;
  const { data } = useGetOneAdminQuery(id);
  const { data: jobs } = useGetAllJobDefaultQuery();
  const { data: emails } = useGetAllEmailDefaultQuery();
  const {
    photoshop,
    microsoft,
    computer,
    fullname,
    title,
    profile,
    country,
    city,
    zip,
  } = data || {};

  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
  }, [changeBackground]);

  return (
    <>
      <div className="row">
        <div className="col-xl-6">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  <div className="row separate-row">
                    <div className="col-sm-12">
                      <div className="job-icon pb-4 d-flex justify-content-between">
                        <div>
                          <div className="d-flex align-items-center mb-1">
                            <h2
                              className="mb-0 lh-1"
                              style={{ fontSize: "40px" }}
                            >
                              {jobs?.length}
                            </h2>
                          </div>
                          <span className="fs-14 d-block mb-2">
                            Total Posted Jobs
                          </span>
                        </div>
                        <div id="NewCustomers">
                          <NewCustomers1 jobs={jobs} />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="job-icon pb-4 d-flex justify-content-between">
                        <div>
                          <div className="d-flex align-items-center mb-1">
                            <h2
                              className="mb-0 lh-1"
                              style={{ fontSize: "40px" }}
                            >
                              {emails?.length}
                            </h2>
                          </div>
                          <span className="fs-14 d-block mb-2">
                            Total Emails Received
                          </span>
                        </div>
                        <div id="NewCustomers">
                          <NewCustomers3 emails={emails} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-12">
              <CanvasChartTab />
            </div>
            <div className="col-xl-12">
              <FeaturedCompanies />
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  <div className="row ">
                    <div className="col-xl-8 col-xxl-7 col-sm-7">
                      <div className="update-profile d-flex">
                        <img src={profile ? profile : pic1} alt="" />
                        <div className="ms-4">
                          <h3 className="fs-24 font-w600 mb-0">
                            {fullname ? fullname : "Not Available"}
                          </h3>
                          <span className="text-primary d-block mb-4">
                            {title ? title : "Not Available"}
                          </span>
                          <span>
                            <i className="fas fa-map-marker-alt me-1"></i>
                            {city},{country} - {zip}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-xxl-5 col-sm-5 sm-mt-auto mt-3 text-sm-end">
                      <Link to="/profile-setting" className="btn btn-primary">
                        Update Profile
                      </Link>
                    </div>
                  </div>
                  <div className="row mt-4 align-items-center">
                    <h4 className="fs-20 mb-3">Skills</h4>
                    <div className="col-xl-6 col-sm-6">
                      <div className="progress default-progress">
                        <div
                          className="progress-bar bg-green progress-animated"
                          style={{
                            width: `${computer ? Number(computer) : 0}%`,
                            height: "13px",
                          }}
                          role="progressbar"
                        >
                          <span className="sr-only">
                            {computer ? computer : 0}% Complete
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-end mt-2 pb-4 justify-content-between">
                        <span className="fs-14 font-w500">Computer</span>
                        <span className="fs-16">
                          <span className="text-black pe-2"></span>
                          {computer ? computer : 0}%
                        </span>
                      </div>
                      <div className="progress default-progress">
                        <div
                          className="progress-bar bg-info progress-animated"
                          style={{
                            width: `${photoshop ? Number(photoshop) : 0}%`,
                            height: "13px",
                          }}
                          role="progressbar"
                        >
                          <span className="sr-only">
                            {photoshop ? photoshop : 0}% Complete
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-end mt-2 pb-4 justify-content-between">
                        <span className="fs-14 font-w500">Photoshop</span>
                        <span className="fs-16">
                          <span className="text-black pe-2"></span>
                          {photoshop ? photoshop : 0}%
                        </span>
                      </div>
                      <div className="progress default-progress">
                        <div
                          className="progress-bar bg-blue progress-animated"
                          style={{
                            width: `${microsoft ? Number(microsoft) : 0}%`,
                            height: "13px",
                          }}
                          role="progressbar"
                        >
                          <span className="sr-only">
                            {microsoft ? microsoft : 0}% Complete
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-end mt-2 pb-4 justify-content-between">
                        <span className="fs-14 font-w500">Microsoft</span>
                        <span className="fs-16">
                          <span className="text-black pe-2"></span>
                          {microsoft ? microsoft : 0}%
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-6 col-sm-6">
                      <div id="pieChart1">
                        <ApexPieChart
                          computer={computer ? Number(computer) : 0}
                          photoshop={photoshop ? Number(photoshop) : 0}
                          microsoft={microsoft ? Number(microsoft) : 0}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <RecentActivity emails={emails} />
            </div>
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header pb-0 border-0 flex-wrap">
                  <h4 className="fs-20 mb-3">Most recent jobs</h4>
                </div>
                <div className="card-body">
                  <div className="owl-carousel owl-carousel owl-loaded front-view-slider ">
                    <HomeSlider jobs={jobs} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
