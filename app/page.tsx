"use client";
import { useEffect, useState } from "react";
import { COINS } from "@/data";
import { cn } from "./lib/utils";

import { HeartIcon, Settings } from "lucide-react";

//components
import { CoinSelectComponent } from "./components/CoinSelectComponent";
import ConnectButton from "./components/ConnectButton";
import LineChart from "./components/LineChart";
import CustomTabs from "./components/CustomTabs";

type CurrentCoin = { latestPrice: null | number; percentDifference: null | number };

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState(COINS[0].value);
  const [currentCoinPrice, setCurrentCoinPrice] = useState<CurrentCoin>({ latestPrice: null, percentDifference: null });

  const selectedCoinObject = COINS.find(({ value }) => value === selectedCoin);

  const isMinusPercentage = currentCoinPrice.percentDifference && +currentCoinPrice?.percentDifference <= 0;

  const getLatestCoinPrice = (latestPrice: number, percentDifference: number) => {
    setCurrentCoinPrice({ latestPrice, percentDifference });
  };

  return (
    <main className="flex min-h-screen px-12 py-20 font-sans">
      <section className="mx-auto w-full max-w-5xl">
        <div className="mb-10 flex justify-between">
          <CoinSelectComponent items={COINS} onChange={(val) => setSelectedCoin(val)} value={selectedCoin} />
          <div>
            <ConnectButton />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          {currentCoinPrice.latestPrice && (
            <div className="flex items-center justify-between gap-2">
              {/* <span className="text-white/50">.07</span> */}
              <h1 className="text-[48px] leading-[120%]">
                {currentCoinPrice.latestPrice?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>
              <span
                className={cn("text-3xl leading-[140%]", isMinusPercentage ? "text-red-600/80" : "text-[#97FCA6]/90")}
              >
                {currentCoinPrice.percentDifference}%
              </span>
            </div>
          )}
          <div className="flex flex-1 items-center justify-end gap-2">
            <button className="group flex h-12 w-12 items-center justify-center rounded-lg bg-[#222]">
              <HeartIcon className="fill-current text-[#646464] transition group-hover:text-red-400 group-focus:text-red-400" />
            </button>
            <button className="group flex h-12 w-12 items-center justify-center rounded-lg bg-[#222]">
              <Settings className="text-[#646464] transition group-hover:text-gray-300" />
            </button>
          </div>
        </div>

        <LineChart selectedCoin={selectedCoinObject!} getLatestCoinPrice={getLatestCoinPrice} />
        <CustomTabs />
      </section>
    </main>
  );
}
