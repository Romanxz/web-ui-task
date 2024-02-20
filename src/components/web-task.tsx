import { Box, Button } from '@chakra-ui/react';
import { ResponsivePieCanvas } from '@nivo/pie';
import axios from 'axios';
import { useState } from 'react';

function randomRgbaString(alpha: number): string {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let a = alpha;
  return `rgba(${r},${g},${b},${a})`;
}

export default function WebTask() {
  const [isDataRequested, setDataRequested] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [pieData, setPieData] = useState<Array<{ id: string; label: string; value: number; color: string }>>(
    [],
  );

  const getData = async () => {
    setLoading(true);
    await axios({
      method: 'get',
      url: 'https://numbers.free.beeceptor.com/itmarketcap',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.data) {
          setLoading(false);
          console.log(res.data);
          console.log(typeof(res.data.data));
          generatePieChartData(res.data.data);
          setDataRequested(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const generatePieChartData = (rawData: any) => {
    const pieData = rawData.map((item: any) => {
      return { id: item.id, label: item.name, value: item.capitalization, color: randomRgbaString(1) };
    });
    console.log(pieData)
    setPieData(pieData);
  };

  return (
    <>
      {!isDataRequested ? (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(128, 128, 128, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1000}
          height="100vh"
          width="100vw"
        >
          <Button onClick={async ()=> await getData()} isLoading={isLoading} colorScheme="blue" size="lg">
            Load Data
          </Button>
        </Box>
      ) : pieData ? (
        <ResponsivePieCanvas
          data={pieData}
          margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: 'paired' }}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.6]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="#333333"
          // defs={[
          //   {
          //     id: 'dots',
          //     type: 'patternDots',
          //     background: 'inherit',
          //     color: 'rgba(255, 255, 255, 0.3)',
          //     size: 4,
          //     padding: 1,
          //     stagger: true,
          //   },
          //   {
          //     id: 'lines',
          //     type: 'patternLines',
          //     background: 'inherit',
          //     color: 'rgba(255, 255, 255, 0.3)',
          //     rotation: -45,
          //     lineWidth: 6,
          //     spacing: 10,
          //   },
          // ]}
          // fill={[
          //   {
          //     match: {
          //       id: 'ruby',
          //     },
          //     id: 'dots',
          //   },
          //   {
          //     match: {
          //       id: 'c',
          //     },
          //     id: 'dots',
          //   },
          //   {
          //     match: {
          //       id: 'go',
          //     },
          //     id: 'dots',
          //   },
          //   {
          //     match: {
          //       id: 'python',
          //     },
          //     id: 'dots',
          //   },
          //   {
          //     match: {
          //       id: 'scala',
          //     },
          //     id: 'lines',
          //   },
          //   {
          //     match: {
          //       id: 'lisp',
          //     },
          //     id: 'lines',
          //   },
          //   {
          //     match: {
          //       id: 'elixir',
          //     },
          //     id: 'lines',
          //   },
          //   {
          //     match: {
          //       id: 'javascript',
          //     },
          //     id: 'lines',
          //   },
          // ]}
          legends={[
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 140,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 60,
              itemHeight: 14,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 14,
              symbolShape: 'circle',
            },
          ]}
        />
      ): null}
    </>
  );
}
