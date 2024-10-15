import { useState } from "react";
import JobQuestions from "./Job-questions";
import { useGetOneJobQuery } from "../../../redux/rtk/features/job/jobApi";
import { Link, useParams } from "react-router-dom";
import SingleJobLoading from "../../../loading/Single-job-loading";

function SingleJob() {
  const params = useParams();
  const id = params?.id;
  const { data, isLoading } = useGetOneJobQuery(id);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    jobTitle,
    createdAt,
    jobUsername,
    jobDescription,
    jobNumber,
    jobFiles,
    jobCompletionDate,
    jobSiteVisitPossible,
    jobPostcode,
    jobLocation,
    status,
  } = data || {};

  function formatDate(isoString) {
    const date = new Date(isoString);

    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const year = date.getFullYear();

    // Return in the format DD-MM-YYYY
    return `${day}-${month}-${year}`;
  }
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Link to="/job-list" className="back-button">
        back
      </Link>
      {isLoading ? (
        <SingleJobLoading />
      ) : (
        <div className="custom-shadow">
          <h2 className="job-title">{jobTitle}</h2>

          <div className="flex-container border-bottom">
            <div className="custom-flex">
              <span className="info-box">
                <i className="fa-regular fa-clock"></i>
                <h3 className="text-red">{formatDate(createdAt)}</h3>
              </span>
              <p className="text-blue">{jobUsername}</p>
              <p className="text-black">Order Number: {jobNumber}</p>
              <span className="status-btn">{status}</span>
            </div>
          </div>

          <p className="job-description">{jobDescription}</p>

          <div className="image-gallery">
            {jobFiles?.map((item, index) => (
              <img
                key={index}
                src={item}
                alt=""
                className="gallery-image"
                onClick={() => handleImageClick(item)}
              />
            ))}
          </div>

          {isPopupOpen && selectedImage && (
            <div className="popup-overlay">
              <div className="popup-content">
                <img src={selectedImage} alt="Full Size" />
                <button
                  className="popup-close-button"
                  onClick={handleClosePopup}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <div>
            <JobQuestions data={data} />

            <div className="flex flex-col gap-2 py-5">
              <span className="icon-text">
                <i className="fa-regular fa-clock"></i>
                <p className="text-black">{jobCompletionDate}</p>
              </span>
              <span className="icon-text">
                <i className="fa-solid fa-magnifying-glass"></i>
                <p className="text-black">
                  {jobSiteVisitPossible === "yes"
                    ? "Visit possible"
                    : "Visit not possible"}
                </p>
              </span>
              <span className="icon-text">
                <i className="fa-solid fa-location-dot"></i>
                <p className="text-black">{jobPostcode + " " + jobLocation}</p>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleJob;
