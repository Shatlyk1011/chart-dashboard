'use client'
import { useEffect, useState } from "react";
import { COINS } from "@/data";
import { cn } from "./lib/utils";

import { HeartIcon, Settings } from "lucide-react";

//components
import { CoinSelectComponent } from "./components/CoinSelectComponent";
import ConnectButton from "./components/ConnectButton";
import LineChart from "./components/LineChart";
import CustomTabs from "./components/CustomTabs";

type CurrentCoin = { latestPrice: null | number, percentDifference: null | number }

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState(COINS[0].value)
  const [currentCoinPrice, setCurrentCoinPrice] = useState<CurrentCoin>({ latestPrice: null, percentDifference: null })

  const selectedCoinObject = COINS.find(({ value }) => value === selectedCoin)

  const isMinusPercentage = currentCoinPrice.percentDifference && +currentCoinPrice?.percentDifference <= 0

  const getLatestCoinPrice = (latestPrice: number, percentDifference: number) => {
    setCurrentCoinPrice({ latestPrice, percentDifference })
  }

  return (
    <main className="flex min-h-screen font-sans py-20 px-12">
      <section className="max-w-5xl w-full mx-auto ">
        <div className="flex justify-between mb-10">
          <CoinSelectComponent items={COINS} onChange={(val) => setSelectedCoin(val)} value={selectedCoin} />
          <div>
            <ConnectButton />
          </div>
        </div>

        <div className="flex gap-2 items-center justify-between">
          <div className="flex items-center gap-2 justify-between">
            {/* <span className="text-white/50">.07</span> */}
            <h1 className="text-[48px] leading-[120%] ">{currentCoinPrice.latestPrice?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
            <span className={cn("text-3xl leading-[140%]", isMinusPercentage ? 'text-red-600/80' : 'text-[#97FCA6]/90')}>{currentCoinPrice.percentDifference}%</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center group w-12 h-12 rounded-lg bg-[#222]">
              <HeartIcon className="fill-current group-focus:text-red-400 text-[#646464] group-hover:text-red-400 transition" />
            </button>
            <button className="flex items-center justify-center group w-12 h-12 rounded-lg bg-[#222]">
              <Settings className="text-[#646464] group-hover:text-gray-300 transition" />
            </button>
          </div>
        </div>

        <LineChart selectedCoin={selectedCoinObject!} getLatestCoinPrice={getLatestCoinPrice} />
        <div>
          <CustomTabs />
        </div>
      </section>
    </main>
  );
}
