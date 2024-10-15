import { Link, useParams } from "react-router-dom";
import "../news/news.css";
import { useGetOneMembershipQuery } from "../../../redux/rtk/features/membership/membershipApi";
import SingleMembershipLoading from "../../../loading/Single-membership-loading";

function SingleMembership() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, isError, error } = useGetOneMembershipQuery(id);
  const {
    title,
    savePrice,
    existPrice,
    currentPrice,
    credit,
    plan,
    shortNote,
    featureOne,
    featureTow,
    featureThree,
    featureFour,
    featureFive,
    status,
  } = data || {};
  let content;
  if (isError) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <SingleMembershipLoading />;
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
            <h2 className="table-label">Save Price</h2>
          </td>
          <td className="table-value">
            <h2>{savePrice}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Old Price</h2>
          </td>
          <td className="table-value">
            <h2>{existPrice}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Current Price</h2>
          </td>
          <td className="table-value">
            <h2>{currentPrice}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Credits</h2>
          </td>
          <td className="table-value">
            <h2>{credit}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Plan</h2>
          </td>
          <td className="table-value">
            <h2>{plan}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Short Note</h2>
          </td>
          <td className="table-value">
            <h2>{shortNote}</h2>
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
        <tr>
          <td className="label-column">
            <h2 className="table-label">Feature One</h2>
          </td>
          <td className="table-value">
            <h2>{featureOne}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Feature Tow</h2>
          </td>
          <td className="table-value">
            <h2>{featureTow}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Feature Three</h2>
          </td>
          <td className="table-value">
            <h2>{featureThree}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Feature Four</h2>
          </td>
          <td className="table-value">
            <h2>{featureFour}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Feature Five</h2>
          </td>
          <td className="table-value">
            <h2>{featureFive}</h2>
          </td>
        </tr>
      </table>
    );
  }

  return (
    <div className="news-wrap">
      <Link
        to={`/membership`}
        className="text-white py-1 px-5 rounded-md text-base font-normal hover:underline bg-[#0050B2]"
      >
        Back
      </Link>
      <div className="news-container">{content}</div>
    </div>
  );
}

export default SingleMembership;
