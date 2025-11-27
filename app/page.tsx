'use client'
import { useState } from "react";
import { COINS } from "@/data";
import { CoinSelectComponent } from "./components/CoinSelectComponent";
import ConnectButton from "./components/ConnectButton";
import { HeartIcon, Settings } from "lucide-react";

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState(COINS[0].value)
  console.log('selectedCoin', selectedCoin);
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
            <h1 className="text-[48px] leading-[120%] ">113,610<span className="text-white/50">.07</span></h1>
            <span className="text-[#97FCA6]/90 text-3xl leading-[140%]">+2,3%</span>
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
      </section>
    </main>
  );
}
