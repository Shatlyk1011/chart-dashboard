import { FC, useState } from 'react';
import { cn } from '../lib/utils';

interface Props {};

const TABS = ['15S', '1M', '1H', '1D']

const CustomTabs:FC<Props> = () => {
  const [selected, setSelected] = useState(0)
  const [pagination, setPagination] = useState(0)

  return (
    <div className="flex flex-col gap-5">
      <div className='flex items-center gap-4 overflow-hidden '>
        {TABS.map((label, idx) => {
          const isSelected = selected === idx
          return (
            <div key={label} className='relative w-full rounded-xl overflow-hidden h-12 p-px'>
              <button
                  onClick={() => setSelected(idx)}
                  className={cn(`w-full z-10 flex rounded-xl items-center h-full justify-center transition bg-[#222]`, isSelected ? 'text-[#F4A42C]  bg-[#28241E]' : '')}
                >
                <span>{label}</span>
              </button>

              {/* custom gradient border */}
            {isSelected && (
              <div
                className={cn("absolute inset-0 z-[-1] ",)}
                style={{
                  backgroundImage: "linear-gradient(60deg, #ECBD75 10%, #EC6633 100%)",
                }}
              ></div>
              )}
            </div>
          )
        }
      )}
    </div>

      {/* pagination */}
        <ul className='flex gap-2 self-center'>
          {Array.from({length: 5}).map((_, idx) => {
            const isActive = pagination === idx

            return (
              <li role="button" key={idx}>
                <button onClick={(() => setPagination(idx))} className={cn('rounded-full transition-[width] cursor-pointer bg-[#2E2E2E] w-3 h-3', isActive && 'w-16 bg-[#ECBD75]')}></button>
              </li>
            )
          })}
        </ul>
    </div>
  )
};
  export default CustomTabs