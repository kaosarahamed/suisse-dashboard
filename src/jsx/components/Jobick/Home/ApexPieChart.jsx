import React from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

class ApexPieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        Number(props.computer) || 0,
        Number(props.microsoft) || 0,
        Number(props.photoshop) || 0,
      ], // Dynamically setting series
      options: {
        chart: {
          height: 250,
          type: "donut",
        },
        labels: ["Computer", "Microsoft", "Photoshop"], // Custom labels for the series
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 0,
        },
        colors: ["#1D92DF", "#4754CB", "#D55BC1"],
        legend: {
          position: "bottom",
          show: false,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "%"; // Add '%' to tooltip value
            },
          },
        },
        responsive: [
          {
            breakpoint: 1400,
            options: {
              chart: {
                height: 200,
              },
            },
          },
        ],
      },
    };
  }

  componentDidUpdate(prevProps) {
    // Check if the props have changed and update the series if needed
    if (
      prevProps.computer !== this.props.computer ||
      prevProps.microsoft !== this.props.microsoft ||
      prevProps.photoshop !== this.props.photoshop
    ) {
      this.setState({
        series: [
          Number(this.props.computer) || 0,
          Number(this.props.microsoft) || 0,
          Number(this.props.photoshop) || 0,
        ],
      });
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          height={250}
        />
      </div>
    );
  }
}

// Ensure that the props are numbers
ApexPieChart.propTypes = {
  computer: PropTypes.number.isRequired,
  photoshop: PropTypes.number.isRequired,
  microsoft: PropTypes.number.isRequired,
};

export default ApexPieChart;
