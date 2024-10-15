import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { useGetOneAdminQuery } from "../../../redux/rtk/features/auth/authApi";
import ImageLoading from "../../../loading/Image-loading";

const ApexPieChart = loadable(() =>
  pMinDelay(import("../Jobick/Home/ApexPieChart"), 1000)
);

const MyProfile = () => {
  const auth = localStorage.getItem("admin");
  const jsonCon = JSON.parse(auth);
  const id = jsonCon?.admin?._id;
  const { data, isLoading } = useGetOneAdminQuery(id);

  const {
    fullname,
    email,
    phone,
    followers,
    about,
    facebook,
    instagram,
    linkedin,
    youtube,
    following,
    title,
    city,
    zip,
    country,
    businesId,
    computer,
    photoshop,
    microsoft,
    headline,
    profile,
    cover,
  } = data || {};
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="profile-back">
            <img src={cover} alt="" />
            <div className="social-btn">
              <Link to={"#"} className="btn btn-light social">
                {following ? following : 0} Following
              </Link>
              <Link to={"#"} className="btn btn-light social">
                {followers ? followers : 0} Followers
              </Link>
              <Link to={"#"} className="btn btn-primary">
                Update Profile
              </Link>
            </div>
          </div>
          <div className="profile-pic d-flex">
            <img src={profile} alt="" />
            <div className="profile-info2">
              <h2 className="mb-0">{fullname ? fullname : "not available"}</h2>
              <h4>{title ? title : "not available"}</h4>
              <span className="d-block">
                <i className="fas fa-map-marker-alt me-2"></i>
                {city ? city + " " + country + " " + zip : "not available"} -
                {businesId ? businesId : "not available"}
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 mt-5">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header border-0">
                  <h4 className="fs-20">Skills</h4>
                </div>
                <div className="card-body">
                  <div id="pieChart2" className="mb-4">
                    <ApexPieChart
                      computer={computer ? computer : 0}
                      photoshop={photoshop ? photoshop : 0}
                      microsoft={microsoft ? microsoft : 0}
                    />
                  </div>
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
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-xxl-8 col-lg-6 mt-lg-5 mt-0">
          <div className="row">
            <div className="col-xl-8 col-xxl-7">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h4 className="fs-20 font-w600">About Me</h4>
                </div>
                <div className="card-body pt-4">
                  <p className="fs-18">
                    {isLoading ? (
                      <ImageLoading />
                    ) : about ? (
                      about
                    ) : (
                      "not available"
                    )}
                  </p>
                  <h4 className="fs-20 font-w600 my-4">Contact</h4>
                  <div className="d-flex flex-wrap">
                    <div className="d-flex contacts-social align-items-center mb-3  me-sm-5 me-0">
                      <span className="me-3">
                        <i className="fas fa-phone-alt"></i>
                      </span>
                      <div>
                        <span>Phone</span>
                        <h5 className="mb-0 fs-18">
                          {isLoading ? (
                            <ImageLoading />
                          ) : phone ? (
                            phone
                          ) : (
                            "xxxxx-xxxx"
                          )}
                        </h5>
                      </div>
                    </div>
                    <div className="d-flex contacts-social align-items-center mb-3">
                      <span className="me-3">
                        <i className="fas fa-envelope-open"></i>
                      </span>
                      <div>
                        <span>Email</span>
                        <h5 className="mb-0 fs-18">
                          {isLoading ? <ImageLoading /> : email}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-xxl-5">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h4 className="fs-20 font-w600">Socials</h4>
                </div>
                <div className="card-body pt-4">
                  {isLoading ? (
                    <>
                      <ImageLoading />
                      <hr />
                      <ImageLoading />
                      <hr />
                      <ImageLoading />
                      <hr />
                      <ImageLoading />
                      <hr />
                      <ImageLoading />
                    </>
                  ) : (
                    <div>
                      <Link
                        to={"#"}
                        className="btn text-start d-block mb-3 bg-facebook light"
                      >
                        <i className="fab fa-facebook-f scale5 me-4 text-facebook" />{" "}
                        {facebook ? facebook : "https://example.com"}
                      </Link>
                      <Link
                        to={"#"}
                        className="btn text-start d-block mb-3 bg-linkedin light"
                      >
                        <i className="fab fa-linkedin-in scale5 me-4 text-linkedin" />{" "}
                        {linkedin ? linkedin : "https://example.com"}
                      </Link>
                      <Link
                        to={"#"}
                        className="btn text-start d-block mb-3 bg-dribble light"
                      >
                        <i className="fa-brands fa-instagram scale5 me-4 text-dribble" />{" "}
                        {instagram ? instagram : "https://example.com"}
                      </Link>
                      <Link
                        to={"#"}
                        className="btn text-start d-block mb-3 bg-youtube light"
                      >
                        <i className="fab fa-youtube scale5 me-4 text-youtube" />{" "}
                        {youtube ? youtube : "https://example.com"}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card bg-dark">
                <div className="card-body d-flex align-items-center">
                  <div>
                    <h4 className="fs-20 font-w600 mb-2 text-white">
                      {headline ? headline : "not available"}
                    </h4>
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
export default MyProfile;
