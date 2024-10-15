import { Link, useParams } from "react-router-dom";
import "../news/news.css";
import { useGetOneCreditsQuery } from "../../../redux/rtk/features/credit/creditApi";
import SingleCreditLoading from "../../../loading/Single-credit";

function SingleCredit() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, isError, error } = useGetOneCreditsQuery(id);
  const { title, price, credits, status } = data || {};
  let content;
  if (isError) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <SingleCreditLoading />;
  }
  if (!isLoading && !isError) {
    content = (
      <table>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Title</h2>
          </td>
          <td className="table-value">
            <h2>{title}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Credit Price</h2>
          </td>
          <td className="table-value">
            <h2>{price}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Total Credit</h2>
          </td>
          <td className="table-value">
            <h2>{credits}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Status</h2>
          </td>
          <td className="table-value">
            <h2>{status}</h2>
          </td>
        </tr>
      </table>
    );
  }

  return (
    <div className="news-wrap">
      <Link
        to={`/credit`}
        className="text-white py-1 px-5 rounded-md text-base font-normal hover:underline bg-[#0050B2]"
      >
        Back
      </Link>
      <div className="news-container">{content}</div>
    </div>
  );
}

export default SingleCredit;
