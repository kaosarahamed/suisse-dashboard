import { Component } from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

class CanvasChart2 extends Component {
  processData = () => {
    const { transactions } = this.props;

    // Filter transactions by status
    const fulfilledTransactions = transactions?.filter(
      (t) => t.status === "fulfill"
    );
    const failedTransactions = transactions?.filter(
      (t) => t.status === "failed"
    );

    // Calculate costs for each day (assuming transactions array has date information)
    const fulfilledCosts = fulfilledTransactions?.map((t) => t.cost);
    const failedCosts = failedTransactions?.map((t) => t.cost);

    // Labels for the chart (assuming transactions have a 'date' field formatted as 'DD')
    const labels = transactions?.map((t) =>
      new Date(t.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      })
    );
    console.log(labels);
    return { fulfilledCosts, failedCosts, labels };
  };

  render() {
    const { fulfilledCosts, labels } = this.processData();
    console.log(labels);
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Costs",
          backgroundColor: "#F73A0B",
          borderColor: "var(--primary)",
          data: fulfilledCosts,
          borderWidth: 0,
          barThickness: "flex",
          minBarLength: 10,
          barPercentage: 0.3,
        },
      ],
    };
    const options = {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: false,
      },
      scales: {
        y: {
          grid: {
            color: "rgba(255,255,255,0.2)",
            drawBorder: true,
          },
          ticks: {
            fontColor: "#6E6E6E",
            max: 60,
            min: 0,
            stepSize: 20,
          },
        },
        x: {
          grid: {
            display: false,
            zeroLineColor: "transparent",
          },
          ticks: {
            stepSize: 20,
            fontColor: "#6E6E6E",
            fontFamily: "Nunito, sans-serif",
          },
        },
      },
      tooltips: {
        mode: "index",
        intersect: false,
        titleFontColor: "#888",
        bodyFontColor: "#555",
        titleFontSize: 12,
        bodyFontSize: 15,
        backgroundColor: "rgba(255,255,255,1)",
        displayColors: true,
        xPadding: 10,
        yPadding: 7,
        borderColor: "rgba(220, 220, 220, 1)",
        borderWidth: 1,
        caretSize: 6,
        caretPadding: 10,
      },
    };

    return (
      <div style={{ minHeight: "200px" }}>
        <Bar data={data} width={433} height={200} options={options} />
      </div>
    );
  }
}

CanvasChart2.propTypes = {
  transactions: PropTypes.array,
};

export default CanvasChart2;
