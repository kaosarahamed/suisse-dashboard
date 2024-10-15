import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import pic1 from "./../../../../assets/images/comapny/1.png";
import { useGetAllSellersQuery } from "../../../../redux/rtk/features/seller/sellerApi";

const FeaturedCompanies = () => {
  const { data } = useGetAllSellersQuery({ status: "", page: 1, limit: 10 });

  return (
    <>
      <div className="card">
        <div className="card-header border-0 pb-0">
          <h4 className="fs-20 mb-1">Featured Companies</h4>
          <Dropdown>
            <Dropdown.Toggle as="div" className="btn-link i-false">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                  stroke="#342E59"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                  stroke="#342E59"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                  stroke="#342E59"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-right" align="end">
              <Link to="/sellers">
                <Dropdown.Item>Delete</Dropdown.Item>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="card-body pt-3 featured-scroll loadmore-content dlab-scroll height370 ">
          <div className="row" id="FeaturedCompaniesContent">
            {data?.sellers?.map((item, index) => {
              const { companyPictures, companyName, companyTitle } = item || {};

              return (
                <div className="col-xl-6 col-sm-6 mt-4 " key={index}>
                  <div className="d-flex">
                    <img
                      src={companyPictures[0] ? companyPictures[0] : pic1}
                      alt=""
                      style={{
                        width: "100px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    <div className="ms-3 featured">
                      <h4 className="fs-20 mb-1">
                        {companyName ? companyName : "Not Available"}
                      </h4>
                      <span>
                        {companyTitle ? companyTitle : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card-footer border-0 m-auto">
          <Link
            to="/sellers"
            className="btn btn-outline-primary  m-auto dlab-load-more"
          >
            View more
          </Link>
        </div>
      </div>
    </>
  );
};
export default FeaturedCompanies;
