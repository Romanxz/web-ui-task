import { ICompanyMarketCap } from "@/pages";
import { Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silver", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 14, "red"], // CSS-style declaration
  ["Platinum", 5, "green"], // CSS-style declaration
  ["Platinum", 16, "blue"], // CSS-style declaration
  ["Platinum", 11, "orange"], // CSS-style declaration
  ["Platinum", 3, "teal"], // CSS-style declaration
  ["Platinum", 1, "violet"], // CSS-style declaration
];

export default function CustomColumnChart({ rawData }: { rawData: ICompanyMarketCap[] }) {

  const columnData = useMemo(() => {
    const columnData = rawData.map((item: ICompanyMarketCap) => {
      return [item.name, item.capitalization];
    });
    columnData.unshift(["Company", "Capitalization"]);
    console.log("Generated New ColumnChart Data:", columnData)
    return columnData as Array<(string | number)[]>;
  }, [rawData])

  return (<>
    {columnData?.length > 1 ? (
      <Chart
        chartType="ColumnChart"
        data={columnData}
        options={{
          hAxis: {
            textStyle: { color: '#FFF' }
          },
          vAxis: {
            textStyle: { color: '#FFF' }
          },
          tooltip: {
            showColorCode: true
          },
          legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
              color: "white",
              fontSize: 14
            }
          },
          backgroundColor: "#1b607d",
        }}
        width={"95%"}
        height={"95%"}
      />
    ) : (
      <Text align="center" color="red">No Data Avaliable</Text>
    )}
  </>
  );
}