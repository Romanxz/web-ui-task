import { Box, Button, Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import CustomPieChart from '@/components/pie-chart';
import CustomColumnChart from '@/components/column-chart';
import CustomDataTable from '@/components/data-table';

export interface ICompanyMarketCap {
  id: string,
  name: string,
  capitalization: number
}


export default function WebTask() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rawData, setRawData] = useState<ICompanyMarketCap[]>([]);

  const getData = (endpoint: string) => {
    setLoading(true);
    axios.get<ICompanyMarketCap[]>(`https://numbers.free.beeceptor.com/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.data) {
        console.log("raw data:", res.data);
        setRawData(res.data);
      }
    }).catch((error: unknown) => {
      if (axios.isAxiosError<{ error?: { message: string[] } }>(error) && error.response?.status === 401) {
        console.log(error);
        setError(`${error.response?.data} Status Code: ${error.response?.status}.`)
      }
    }).finally(() => setLoading(false));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" style={{ width: "100vw", height: "100vh", background: "#5e807f" }}>
      <Grid
        h='98vh'
        w="99vw"
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(7, 1fr)'
        gap={4}
      >
        <GridItem as={Flex} direction="column" justify="center" align="center" boxShadow="5px 5px 8px 0px rgba(14, 63, 84, 0.3)" borderRadius={8} rowSpan={2} colSpan={1} bg='#1b607d'>
          <Stack w="70%" spacing={4} direction='column' align='center'>
            <Button w="100%" onClick={() => getData("itmarketcap")} isLoading={isLoading} colorScheme="teal" size="lg">
              Load Mocked Data
            </Button>
            <Button w="100%" onClick={() => { setRawData([]); getData("error"); }} isLoading={isLoading} colorScheme="teal" size="lg">
              Get Mocked Error
            </Button>
            <Button w="100%" onClick={() => { setError(''); setRawData([]); }} isLoading={isLoading} colorScheme="teal" size="lg">
              Reset
            </Button>
            {error ? (
              <Text align="center" color="red">{error}</Text>
            ) : null}
          </Stack>
        </GridItem>
        <GridItem overflowY="auto" as={Flex} justify="center" align="start" boxShadow="5px 5px 8px 0px rgba(14, 63, 84, 0.3)" borderRadius={8} colSpan={3} bg='#1b607d'><CustomDataTable rawData={rawData} isLoading={isLoading} /></GridItem>
        <GridItem as={Flex} justify="center" align="center" boxShadow="5px 5px 8px 0px rgba(14, 63, 84, 0.3)" borderRadius={8} colSpan={3} bg='#1b607d'><CustomPieChart rawData={rawData} isLoading={isLoading} /></GridItem>
        <GridItem as={Flex} justify="center" align="center" boxShadow="5px 5px 8px 0px rgba(14, 63, 84, 0.3)" borderRadius={8} colSpan={6} bg='#1b607d'><CustomColumnChart rawData={rawData} isLoading={isLoading} /></GridItem>
      </Grid>
    </Box>
  );
}
