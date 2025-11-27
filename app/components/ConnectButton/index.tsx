import { FC } from 'react';

interface Props {};

const ConnectButton:FC<Props> = () => {
  return (
    <div className=''>
      <button className="min-h-9 text-nowrap px-3 flex items-center font-medium leading-[140%] text-sm  rounded-xl bg-linear-35 from-[#97FCA6]/10 to-[#F6C90F]/10">
        <span className='gradient-text'>Connect Wallet</span>
      </button>
    </div>
  )
};
export default ConnectButton