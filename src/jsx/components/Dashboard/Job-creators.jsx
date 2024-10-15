import { useState } from "react";
import { Nav, Tab } from "react-bootstrap";

import AllStatus from "../Jobick/Applications/AllStatus";

const JobCreators = () => {
  const [statusFilter, setStatusFilter] = useState("AllStatus");
  return (
    <>
      <div className="d-flex align-items-center mb-4 flex-wrap">
        <h4 className="fs-20 font-w600 me-auto">Job Creators</h4>
        <Tab.Container
          defaultActiveKey="AllStatus"
          onSelect={(status) => setStatusFilter(status)}
        >
          <div className="card-action coin-tabs mt-3 mt-sm-0">
            <Nav as="ul" className="nav nav-tabs" role="tablist">
              <Nav.Item as="li" className="nav-item">
                <Nav.Link eventKey="AllStatus">All Status</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link eventKey="pending">Pending</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link eventKey="verified">Verified</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Tab.Container>
      </div>
      <div className="row">
        <div className="col-xl-12">
          {/* Pass the statusFilter as a prop to JobApplicationBlog */}
          <AllStatus statusFilter={statusFilter} />
        </div>
      </div>
    </>
  );
};
export default JobCreators;
