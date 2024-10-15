import { Link, useParams } from "react-router-dom";
import "../news/news.css";
import SingleNewsLoading from "../../../loading/Single-news-loading";
import { useGetOneReviewQuery } from "../../../redux/rtk/features/review/reviewApi";

function SingleReview() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, isError, error } = useGetOneReviewQuery(id);
  const { clinetName, review, rating, jobTitle, jobCategory, useful } =
    data || {};

  // decide what to render
  let content;
  if (isError) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <SingleNewsLoading />;
  }
  if (!isLoading && !isError) {
    content = (
      <table>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Job Title</h2>
          </td>
          <td className="table-value">
            <h2>{jobTitle}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Job Category</h2>
          </td>
          <td className="table-value">
            <h2>{jobCategory}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Job Creator Name</h2>
          </td>
          <td className="table-value">
            <h2>{clinetName}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Review Rating</h2>
          </td>
          <td className="table-value">
            <h2>{rating}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Review Liked Count</h2>
          </td>
          <td className="table-value">
            <h2>{useful?.length}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Review</h2>
          </td>
          <td className="table-value">
            <h2>{review}</h2>
          </td>
        </tr>
      </table>
    );
  }

  return (
    <div className="news-wrap">
      <Link
        to={`/reviews`}
        className="text-white py-1 px-5 rounded-md text-base font-normal hover:underline bg-[#0050B2]"
      >
        Back
      </Link>
      <div className="news-container">{content}</div>
    </div>
  );
}

export default SingleReview;
