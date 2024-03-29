import React, { useMemo, useState } from "react";
import { Chart } from "react-google-charts";
import { ICompanyMarketCap } from "@/pages";
import { CircularProgress, Text } from "@chakra-ui/react";

export default function CustomPieChart({ rawData, isLoading }: { rawData: ICompanyMarketCap[]; isLoading: boolean }) {

  const pieData = useMemo(() => {
    const pieData = rawData.map((item: ICompanyMarketCap) => {
      return [item.name, item.capitalization];
    });
    pieData.unshift(["Company", "Capitalization"]);
    console.log("Generated New PieChart Data:", pieData)
    return pieData as Array<(string | number)[]>;
  }, [rawData])

  return (<>
    {pieData?.length > 1 ? (
      <Chart
        chartType="PieChart"
        data={pieData}
        options={{
          is3D: true,
          pieSliceText: 'label',
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
          chartArea: {
            left: 0,
            top: 0,
            width: "100%",
            height: "90%"
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
