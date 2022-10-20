import React from "react";
import Chart from "react-apexcharts";

const CandleStickChart = ({ chartData, symbol, chartType,company }) => {
  const options = {
    chart: {
      type: "candlestick",
    },
    title: {
      text: `${company}(${symbol})`,
      align: "center",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      decimalsInFloat: 0,
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div
      style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
      className="mt-5 p-4 shadow-sm bg-white"
    >
      {chartData.day && chartData.week && chartData.year && (
        <Chart
          options={options}
          series={[
            {
              data:
                chartType === "day"
                  ? chartData.day
                  : chartType === "week"
                  ? chartData.week
                  : chartData.year,
            },
          ]}
          type="candlestick"
          width="80%"
        />
      )}
    </div>
  );
};
export default CandleStickChart;
