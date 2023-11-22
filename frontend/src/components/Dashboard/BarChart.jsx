import React from "react";
import Chart from "react-apexcharts";



const BarChart = ({data, name, categories}) => {

    const barChartDataDailyTraffic = [
        {
          name: name,
          data: [...data],
        },
      ];
       const barChartOptionsDailyTraffic = {
        chart: {
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          style: {
            fontSize: "12px",
            fontFamily: undefined,
          },
          onDatasetHover: {
            style: {
              fontSize: "12px",
              fontFamily: undefined,
            },
          },
          theme: "dark",
        },
        xaxis: {
          categories: [...categories],
          show: false,
          labels: {
            show: true,
            style: {
              colors: "#A3AED0",
              fontSize: "14px",
              fontWeight: "500",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
          color: "black",
          labels: {
            show: true,
            style: {
              colors: "#CBD5E0",
              fontSize: "14px",
            },
          },
        },
        grid: {
          show: false,
          strokeDashArray: 5,
          yaxis: {
            lines: {
              show: true,
            },
          },
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            type: "vertical",
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStops: [
              [
                {
                  offset: 0,
                  color: "rgb(67 ,56 ,202)",
                  opacity: 1,
                },
                {
                  offset: 100,
                  color: "rgb(67 ,56 ,202)",
                  opacity: 0.28,
                },
              ],
            ],
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: "40px",
          },
        },
      };
  return (
    <Chart
      options={barChartOptionsDailyTraffic}
      series={barChartDataDailyTraffic}
      type="bar"
      width="100%"
      height="100%"
    />
  );
};

export default BarChart;
