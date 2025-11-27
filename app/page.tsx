'use client'
import { COINS } from "@/data";
import { CoinSelectComponent } from "./components/CoinSelectComponent";
import { useState } from "react";

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState(COINS[0].value)
  console.log('selectedCoin', selectedCoin);
  return (
    <main className="flex min-h-screen font-sans py-20 px-12">
      <section className="max-w-5xl w-full mx-auto">
        <div className="flex justify-between ">
          <div>
            <CoinSelectComponent items={COINS} onChange={(val) => setSelectedCoin(val)} value={selectedCoin} />
          </div>

          <div>
            connect button
          </div>
        </div>
      </section>
    </main>
  );
}
