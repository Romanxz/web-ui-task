import { Box, Button } from '@chakra-ui/react';
import { ResponsivePieCanvas } from '@nivo/pie';
import axios from 'axios';
import { useState } from 'react';
import { data } from './data';
import PieChart from './pie-chart';

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
      ) : null}
      <PieChart data={data} />
    </>
  );
}
