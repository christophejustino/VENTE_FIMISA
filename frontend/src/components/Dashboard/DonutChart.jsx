import React from "react";
import Chart from "react-apexcharts";

const DonutChart = ({ data, labels }) => {
  const donutChartOptionsCharts1 = {
    series: [...data],
    labels: [...labels],
    colors: [
      "rgb(204 ,251 ,241)",
      "rgb(251 ,191, 36)",
      "rgb(109 ,40 ,217)",
      "rgb(67 ,56 ,202)",
      "rgb(192 ,38 ,211)",
    ],
    chart: {
      width: "100%",
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

  const donutChartDataCharts1 = [...data];
  return (
    <Chart
      options={donutChartOptionsCharts1}
      series={donutChartDataCharts1}
      type="donut"
      width="100%"
      height="100%"
    />
  );
};

export default DonutChart;
