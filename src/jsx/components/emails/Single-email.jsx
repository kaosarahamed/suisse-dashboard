import { Link, useParams } from "react-router-dom";
import "../news/news.css";
import SingleNewsLoading from "../../../loading/Single-news-loading";
import {
  useGetOneEmailQuery,
  useUpdateEmailStatusMutation,
} from "../../../redux/rtk/features/email/emailApi";
import { useEffect } from "react";

function SingleEmail() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, isError, error } = useGetOneEmailQuery(id);
  const [updateEmailStatus] = useUpdateEmailStatusMutation(id);
  const { name, email, phone, service, role, status } = data || {};

  useEffect(() => {
    if (data && status !== "seen") {
      const updatedStatus = "seen";
      updateEmailStatus({ status: updatedStatus, id });
    }
  }, [data, status, id, updateEmailStatus]);

  //   decide what to render
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
            <h2 className="table-label">Name</h2>
          </td>
          <td className="table-value">
            <h2>{name}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Email</h2>
          </td>
          <td className="table-value">
            <h2>{email}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Phone</h2>
          </td>
          <td className="table-value">
            <h2>{phone}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Role</h2>
          </td>
          <td className="table-value">
            <h2>{role}</h2>
          </td>
        </tr>
        <tr>
          <td className="label-column">
            <h2 className="table-label">Service</h2>
          </td>
          <td className="table-value">
            <h2>{service}</h2>
          </td>
        </tr>
      </table>
    );
  }

  return (
    <div className="news-wrap">
      <Link
        to={`/emails`}
        className="text-white py-1 px-5 rounded-md text-base font-normal hover:underline bg-[#0050B2]"
      >
        Back
      </Link>
      <div className="news-container">{content}</div>
    </div>
  );
}

export default SingleEmail;
