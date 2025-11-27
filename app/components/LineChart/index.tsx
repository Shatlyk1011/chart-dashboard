import { FC, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import useChartData from '@/app/lib/chartjs/useChartMockData';
import { getPercentDifference } from '@/app/lib/utils';
import { ICoin } from '@/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  selectedCoin: ICoin
  getLatestCoinPrice: (latestPrice: number, percentDifference: number) => void
};


const LineChart: FC<Props> = ({ selectedCoin, getLatestCoinPrice }) => {
  const { realMockData, options } = useChartData(selectedCoin.label, selectedCoin.min, selectedCoin.max)

  useEffect(() => {
    if (realMockData) {
      const dataArray = realMockData.datasets[0].data
      const latestPrice = dataArray[dataArray.length - 1] as number
      const previousValue = dataArray[dataArray.length - 2] as number
      const percentDifference = getPercentDifference({ currentValue: latestPrice, previousValue }).toFixed(2)
      getLatestCoinPrice(latestPrice, +percentDifference)
    }
  }, [realMockData])


  return (
    <div className='w-full py-16 rounded-2xl'>
      {realMockData && (
        <Line options={options} data={realMockData} />
      )}
    </div>
  )
};
export default LineChart

