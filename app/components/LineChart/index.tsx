import { FC, useEffect, useState } from 'react';
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
import { cn, getPercentDifference } from '@/app/lib/utils';
import { COMMENTS, ICoin } from '@/data';

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

  const [comments, setComments] = useState(COMMENTS.slice(0, 3))

  useEffect(() => {
    // get latest coin price and percent differences
    if (realMockData) {
      const dataArray = realMockData.datasets[0].data
      const latestPrice = dataArray[dataArray.length - 1] as number
      const previousValue = dataArray[dataArray.length - 2] as number
      const percentDifference = getPercentDifference({ currentValue: latestPrice, previousValue }).toFixed(2)
      getLatestCoinPrice(latestPrice, +percentDifference)
    }
  }, [realMockData])


  // comment section iteration
  useEffect(() => {
    if (COMMENTS.length === 0) return;
    let index = 0;
    const batchSize = Math.min(3, COMMENTS.length);

    const getBatch = () =>
      Array.from({ length: batchSize }, (_, i) => COMMENTS[(index + i) % COMMENTS.length]);

    // initialize
    setComments(getBatch());

    const interval = setInterval(() => {
      index = (index + 1) % COMMENTS.length;
      setComments(getBatch());
    }, 3000);

    return () => clearInterval(interval);
  }, []);



  return (
    <div className='w-full mt-16 mb-20 relative rounded-2xl aspect-3/1'>
      {realMockData && (
        <Line options={options} data={realMockData} />
      )}

      {/* latest comments section */}
      <div className=' p-2'>
        {comments.map(({ name, date, action, color }, idx) => {
          const isLast = idx === comments.length - 1
          const isFirst = idx === 0
          return (
            <div key={name} className={cn('not-last:mb-2 transition duration-500 absolute bottom-[40px]', isLast && 'text-red-500 translate-y-[110%]! opacity-0', isFirst && 'opacity-20 -translate-y-[110%]!')}>
              <div className='flex items-center gap-1'>
                <h4 style={{ color }} className="text-sm font-medium ">{name}</h4>
                <dl className='text-[#73767D] text-xs'>
                  <dt className="sr-only">Time</dt>
                  <time dateTime={date}>
                    {date}
                  </time>
                </dl>
              </div>
              <span className='text-sm font-medium'>{action}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
};
export default LineChart

