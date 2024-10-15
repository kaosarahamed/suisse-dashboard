import { Link, useParams } from "react-router-dom";
import "./news.css";
import { useGetOneNewsQuery } from "../../../redux/rtk/features/news/newsApi";
import SingleNewsLoading from "../../../loading/Single-news-loading";

function SingleNews() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, isError, error } = useGetOneNewsQuery(id);
  const { news, senderEmail, reference, nameOfStation, sendName } = data || {};
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
            <h2 className="table-label">Name of station</h2>
          </td>
          <td className="table-value">
            <h2>{nameOfStation}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Creator email</h2>
          </td>
          <td className="table-value">
            <h2>{senderEmail}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Creator name</h2>
          </td>
          <td className="table-value">
            <h2>{sendName}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Reference</h2>
          </td>
          <td className="table-value">
            <h2>{reference}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">News</h2>
          </td>
          <td className="table-value">
            <h2>{news}</h2>
          </td>
        </tr>
      </table>
    );
  }

  return (
    <div className="news-wrap">
      <Link
        to={`/news`}
        className="text-white py-1 px-5 rounded-md text-base font-normal hover:underline bg-[#0050B2]"
      >
        Back
      </Link>
      <div className="news-container">{content}</div>
    </div>
  );
}

export default SingleNews;
