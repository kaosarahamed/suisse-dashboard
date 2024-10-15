import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

const HomeSlider = ({ jobs }) => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    variableWidth: true,
    speed: 500,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
    ],
  };
  return (
    <Slider className="card-slide owl-right-nav " {...settings}>
      {jobs?.map((item) => {
        const {
          _id,
          jobFiles,
          jobTitle,
          jobUsername,
          jobLocation,
          jobPostcode,
          jobCategoryCode,
        } = item || {};
        let words = jobCategoryCode.split("_");

        // Add a comma after the first word and join with hyphen for the rest
        let formatted = `${words[0]}, ${words.slice(1).join("-")}`;
        return (
          <div className="items p-2" key={_id}>
            <div className="jobs text-center">
              <div className="">
                <span>
                  {jobFiles.length > 0 ? (
                    <img
                      src={jobFiles[0]}
                      alt=""
                      style={{
                        width: "200px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  ) : (
                    <svg
                      className="mb-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="71"
                      height="71"
                      viewBox="0 0 71 71"
                    >
                      <g transform="translate(-457 -443)">
                        <rect
                          width="71"
                          height="71"
                          rx="12"
                          transform="translate(457 443)"
                          fill="#c5c5c5"
                        />
                        <g transform="translate(457 443)">
                          <rect
                            data-name="placeholder"
                            width="71"
                            height="71"
                            rx="12"
                            fill="#2769ee"
                          />
                          <circle
                            data-name="Ellipse 12"
                            cx="18"
                            cy="18"
                            r="18"
                            transform="translate(15 20)"
                            fill="#fff"
                          />
                          <circle
                            data-name="Ellipse 11"
                            cx="11"
                            cy="11"
                            r="11"
                            transform="translate(36 15)"
                            fill="#ffe70c"
                          />
                        </g>
                      </g>
                    </svg>
                  )}
                </span>
                <h4 className="mb-0">{jobTitle?.slice(0, 20)}..</h4>
                <span className="text-primary mb-3 d-block">{jobUsername}</span>
              </div>
              <div>
                <span className="d-block mb-1">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  {jobLocation},{jobPostcode}
                </span>
                <span>
                  <i className="fas fa-comments-dollar me-2"></i>
                  {jobCategoryCode === "Moving_moving_house"
                    ? formatted
                    : jobCategoryCode?.split("_")?.join(" ")}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

HomeSlider.propTypes = {
  jobs: PropTypes.array,
};

export default HomeSlider;
