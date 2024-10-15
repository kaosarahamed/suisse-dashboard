import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import { format, subDays } from "date-fns";

class NewCustomers3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Emails Received",
          data: [], // This will be updated dynamically with job counts for the last 7 days
        },
      ],
      options: {
        chart: {
          height: 300,
          width: "100%",
          type: "line",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          sparkline: {
            enabled: false,
          },
        },
        colors: ["#3385D6"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        stroke: {
          show: true,
          width: 6,
          curve: "smooth",
          colors: ["#3385D6"],
        },
        xaxis: {
          categories: [], // This will hold the dynamic categories (formatted dates for the last 7 days)
        },
        yaxis: {
          show: true,
        },
        fill: {
          opacity: 1,
          colors: "#FB3E7A",
        },
        tooltip: {
          enabled: true,
          style: {
            fontSize: "12px",
          },
          y: {
            formatter: function (val) {
              return val + " Emails";
            },
          },
        },
      },
    };
  }

  componentDidMount() {
    this.updateChartData();
  }

  updateChartData = () => {
    const { emails } = this.props; // Assuming jobs are passed as props

    // Step 1: Get the last 7 days
    const last7Days = Array.from(
      { length: 7 },
      (_, i) => format(subDays(new Date(), 6 - i), "dd MMM") // Format date as '24 Jul'
    );

    // Step 2: Filter and count the jobs for each of the last 7 days
    const emailsByDay = last7Days.map((day) => {
      const emailsOnDay = emails?.filter((job) => {
        const emailDate = format(new Date(job.createdAt), "dd MMM"); // Compare with formatted date
        return emailDate === day;
      });
      return emailsOnDay?.length > 0 ? emailsOnDay.length : 0;
    });

    // Step 3: Update the series data and categories
    this.setState({
      series: [
        {
          name: "Emails Received",
          data: emailsByDay, // Number of jobs posted per day
        },
      ],
      options: {
        ...this.state.options,
        xaxis: {
          ...this.state.options.xaxis,
          categories: last7Days, // Formatted dates for the last 7 days
        },
      },
    });
  };

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={200}
          width={500}
        />
      </div>
    );
  }
}

NewCustomers3.propTypes = {
  emails: PropTypes.array,
};

export default NewCustomers3;
