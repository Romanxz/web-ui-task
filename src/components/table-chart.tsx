import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Department", "Revenues Change"],
  ["Shoes", 10700],
  ["Sports", -15400],
  ["Toys", 12500],
  ["Electronics", -2100],
  ["Food", 22600],
  ["Art", 1100],
];

export const options = {
  allowHtml: true,
  showRowNumber: true,
  backgroundColor: "#1b607d",
};

export const formatters = [
  {
    type: "NumberFormat" as const,
    column: 1,
    options: {
      prefix: "$",
      negativeColor: "red",
      negativeParens: true,
    },
  },
];

export function CustomTableChart() {
  return (
    <Chart
      chartType="Table"
      width="95%"
      height="95%"
      data={data}
      options={options}
      formatters={formatters}
    />
  );
}

