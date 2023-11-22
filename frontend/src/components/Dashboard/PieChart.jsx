import React from "react";
import Chart from "react-apexcharts";

const pieChartOptions = {
  labels: ["Your files", "System", "Empty"],
  colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
  chart: {
    width: "50px",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};

const pieChartData = [63, 25, 12];

const PieChart = ({ labels, data }) => {
  const pieChartOptions = {
    labels: [...labels],
    colors: [
      "rgb(204 ,251 ,241)",
      "rgb(251 ,191, 36)",
      "rgb(109 ,40 ,217)",
      "rgb(67 ,56 ,202)",
      "rgb(192 ,38 ,211)",
    ],
    chart: {
      width: "50px",
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: [
        "rgb(204 ,251 ,241)",
        "rgb(251 ,191, 36)",
        "rgb(109 ,40 ,217)",
        "rgb(67 ,56 ,202)",
        "rgb(192 ,38 ,211)",
      ],
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
  };

  const pieChartData = [...data];
  return (
    <Chart
      options={pieChartOptions}
      series={pieChartData}
      type="pie"
      width="100%"
      height="100%"
    />
  );
};

export default PieChart;
