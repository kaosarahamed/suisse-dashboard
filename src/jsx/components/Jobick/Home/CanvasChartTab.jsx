import { Tab, Nav } from "react-bootstrap";
import CanvasChart2 from "./TabChart/CanvasChart2";
import { useGetAllTransactionsQuery } from "../../../../redux/rtk/features/payment/paymentApi";

const CanvasChartTab = () => {
  const { data } = useGetAllTransactionsQuery();
  const totalSales = data?.reduce((sum, item) => sum + item.cost, 0);

  return (
    <>
      <Tab.Container defaultActiveKey="Monthly">
        <div className="card">
          <div className="card-header border-0 pb-0">
            <h4 className="fs-20 mb-1">Chart</h4>
            <div className="card-action coin-tabs mt-3 mt-sm-0">
              <Nav className="nav nav-tabs">
                <Nav.Item>
                  <Nav.Link eventKey="Daily">Day</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Weekly">Weekly</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Monthly">Monthly</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
          <div className="card-body">
            <div className="pb-4 d-flex flex-wrap">
              <span className="me-sm-5 me-3 font-w500">
                <svg
                  className="me-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                >
                  <rect width="13" height="13" fill="#f73a0b" />
                </svg>
                Sales : CHF-₣{totalSales}
              </span>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="Daily">
                <CanvasChart2
                  className="chartjs"
                  dataActive={0}
                  transactions={data}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="Weekly">
                <CanvasChart2
                  className="chartjs"
                  dataActive={1}
                  transactions={data}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="Monthly">
                <CanvasChart2
                  className="chartjs"
                  dataActive={2}
                  transactions={data}
                />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </>
  );
};

export default CanvasChartTab;
