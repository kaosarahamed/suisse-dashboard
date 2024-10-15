import { Nav, Tab } from "react-bootstrap";
import PropTypes from "prop-types";

const PageTitle = ({ setStatusFilter }) => {
  return (
    <div className="d-flex align-items-center mb-4 flex-wrap">
      <h4 className="fs-20 font-w600 me-auto">All Sellers</h4>
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
              <Nav.Link eventKey="pending">Not Verify</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="nav-item">
              <Nav.Link eventKey="verified">verified</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </Tab.Container>
    </div>
  );
};

PageTitle.propTypes = {
  setStatusFilter: PropTypes.any,
};

export default PageTitle;
