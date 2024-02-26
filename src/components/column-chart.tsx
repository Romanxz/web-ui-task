import { ICompanyMarketCap } from "@/pages";
import { CircularProgress, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Chart } from "react-google-charts";

export default function CustomColumnChart({ rawData, isLoading }: { rawData: ICompanyMarketCap[]; isLoading: boolean }) {

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
        width={"98%"}
        height={"98%"}
      />
    ) : isLoading ? <CircularProgress isIndeterminate color='green.300' /> : (
      <Text align="center" color="red">No Data Avaliable</Text>
    )}
  </>
  );
}