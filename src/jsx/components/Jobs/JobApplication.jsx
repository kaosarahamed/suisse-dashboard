import JobApplicationBlog from "../Jobick/Jobs/JobApplicationBlog";
import { Nav, Tab } from "react-bootstrap";
import { useState } from "react";

const JobApplication = () => {
  const [statusFilter, setStatusFilter] = useState("AllStatus");

  return (
    <>
      <div className="d-flex align-items-center mb-4 flex-wrap">
        <h4 className="fs-20 font-w600 me-auto">Job Applicants</h4>
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
                <Nav.Link eventKey="close">Close</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link eventKey="complete">Complete</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link eventKey="rejected">Reject</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link eventKey="accept">Accept</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item">
                <Nav.Link eventKey="archived">Archived</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Tab.Container>
      </div>
      <div className="row">
        <div className="col-xl-12">
          {/* Pass the statusFilter as a prop to JobApplicationBlog */}
          <JobApplicationBlog statusFilter={statusFilter} />
        </div>
      </div>
    </>
  );
};

export default JobApplication;
