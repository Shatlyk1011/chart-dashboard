import { FC } from 'react';
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
  selectedCoin: string
};


const LineChart:FC<Props> = ({selectedCoin}) => {
  const { realMockData, options } = useChartData(selectedCoin)

  return (
    <div className='w-full py-16 rounded-2xl'>
      {realMockData && (
        <Line options={options} data={realMockData} />
      )}
    </div>
  )
};
export default LineChart

