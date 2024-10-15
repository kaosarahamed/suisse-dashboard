import { Link, useParams } from "react-router-dom";
import "../news/news.css";
import SingleCreditLoading from "../../../loading/Single-credit";
import { useGetOneCategoryQuery } from "../../../redux/rtk/features/categorie/categorieApi";

function SingleCategory() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, isError, error } = useGetOneCategoryQuery(id);
  const { title, logo, image, category, status } = data || {};
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
            <h2 className="table-label">Main Category</h2>
          </td>
          <td className="table-value">
            <h2>{category}</h2>
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
        to={`/categories`}
        className="text-white py-1 px-5 rounded-md text-base font-normal hover:underline bg-[#0050B2]"
      >
        Back
      </Link>
      <div className="news-container">{content}</div>
      <div>
        <div className="image-box">
          <div className="image-wraper">
            <h2>Category Logo</h2>
            <img src={logo} alt="" />
          </div>
          <div className="image-wraper">
            <h2>Category Image</h2>
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCategory;
