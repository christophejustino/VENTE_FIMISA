import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({name, data, categories}) => {
    const lineChartDataProjectStatus = [
        {
          name,
          data: [...data]
        }
      ];
      
      const lineChartOptionsProjectStatus = {
        chart: {
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: true,
            top: 13,
            left: 0,
            blur: 10,
            opacity: 0.1,
            color: "#4318FF"
          }
        },
        colors: ["#1d4ed8"],
        markers: {
          size: 0,
          colors: "white",
          strokeColors: "#1d4ed8",
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          showNullDataPoints: true
        },
        tooltip: {
          theme: "dark"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth",
          type: "gradient"
        },
        xaxis: {
          categories: [...categories],
          labels: {
            style: {
              colors: "#A3AED0",
              fontSize: "14px",
              fontWeight: "500"
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          show: false
        },
        legend: {
          show: false
        },
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 3,
          opacity: 0.5
        },
        grid: {
          show: false,
          column: {
            colors: ["transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        }
      };
    
  return (
    <Chart
      options={lineChartOptionsProjectStatus}
      series={lineChartDataProjectStatus}
      type="area"
      width="100%"
      height="100%"
    />
  );
};

export default LineChart;
