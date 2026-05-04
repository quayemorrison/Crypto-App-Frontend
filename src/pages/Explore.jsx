import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

// Section Components
import ExploreHero from "../components/explore-sections/ExploreHero";
import MarketStats from "../components/explore-sections/MarketStats";
import CryptoPrices from "../components/explore-sections/CryptoPrices";
import ExploreCTA from "../components/explore-sections/ExploreCTA";
import ExploreSidebar from "../components/explore-sections/ExploreSidebar";
import TopMovers from "../components/explore-sections/TopMovers";
import NewOnCoinbase from "../components/explore-sections/NewOnCoinbase";

// Assets
import totalMarketCapChart from "../assets/images/total-market-cap.png";
import tradeVolumeChart from "../assets/images/trade-volume.png";
import buySellRatioChart from "../assets/images/buy-sell-ratio.png";
import btcDominanceChart from "../assets/images/btc-dominance.png";

// Daily Charts
import chart1 from "../assets/images/chart-1.png";
import chart2 from "../assets/images/chart-2.png";
import chart3 from "../assets/images/chart-3.png";
import chart4 from "../assets/images/chart-4.png";
import chart5 from "../assets/images/chart-5.png";
import chart6 from "../assets/images/chart-6.png";
import chart7 from "../assets/images/chart-7.png";
import chart8 from "../assets/images/chart-8.png";

const assetCharts = [chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8];

function Explore() {
  const topMoversRef = useRef(null);
  const newOnCoinbaseRef = useRef(null);

  const [coins, setCoins] = useState([]);
  const [topMovers, setTopMovers] = useState([]);
  const [newOnCoinbase, setNewOnCoinbase] = useState([]);

  // Store raw data for the simulation loop without triggering re-renders
  const rawDataRef = useRef({
    coins: [],
    topMovers: [],
    newOnCoinbase: []
  });

  // Helper to format raw numbers into UI strings
  const formatData = (data) => data.map(item => ({
    ...item,
    change: item.change24h >= 0 ? `↗ ${item.change24h.toFixed(2)}%` : `↘ ${Math.abs(item.change24h).toFixed(2)}%`,
    changeColor: item.change24h >= 0 ? "text-[#098551]" : "text-[#ea3943]",
    price: `GHS ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    logo: item.image,
    logoBg: "bg-[#1d1717]",
    flash: item.flash || null
  }));

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const [allCoinsRes, gainersRes, newRes] = await Promise.all([
          axios.get("/api/crypto"),
          axios.get("/api/crypto/gainers"),
          axios.get("/api/crypto/new"),
        ]);
        
        rawDataRef.current = {
          coins: allCoinsRes.data,
          topMovers: gainersRes.data,
          newOnCoinbase: newRes.data
        };

        setCoins(formatData(rawDataRef.current.coins));
        setTopMovers(formatData(rawDataRef.current.topMovers));
        setNewOnCoinbase(formatData(rawDataRef.current.newOnCoinbase));

      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchMarketData();

    // Simulation loop to mimic live trading behavior
    const interval = setInterval(() => {
      if (!rawDataRef.current.coins.length) return;

      const mutateArray = (arr) => arr.map(item => {
        const shouldUpdate = Math.random() <= 0.4;
        
        if (!shouldUpdate) {
          return { ...item, flash: null };
        }

        const visiblePriceChange = (Math.random() * 1.45) + 0.05;
        const isUp = Math.random() > 0.5;
        
        const newPrice = Math.max(0.01, item.price + (isUp ? visiblePriceChange : -visiblePriceChange));
        const newChange24h = item.change24h + (isUp ? 0.25 : -0.25);

        return {
          ...item,
          price: newPrice,
          change24h: newChange24h,
          flash: isUp ? 'up' : 'down'
        };
      });

      rawDataRef.current = {
        coins: mutateArray(rawDataRef.current.coins),
        topMovers: mutateArray(rawDataRef.current.topMovers),
        newOnCoinbase: mutateArray(rawDataRef.current.newOnCoinbase),
      };

      // Helper to format data with correct arrow based on flash state
      const formatDataWithArrow = (data) => data.map(item => {
        const arrow = item.flash === 'up' ? "↗" : item.flash === 'down' ? "↙" : (item.change24h >= 0 ? "↗" : "↙");
        return {
          ...item,
          change: `${arrow} ${Math.abs(item.change24h).toFixed(2)}%`,
          changeColor: item.change24h >= 0 ? "text-[#098551]" : "text-[#ea3943]",
          price: `GHS ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          logo: item.image,
          logoBg: "bg-[#1d1717]",
          flash: item.flash || null
        };
      });

      setCoins(formatDataWithArrow(rawDataRef.current.coins));
      setTopMovers(formatDataWithArrow(rawDataRef.current.topMovers));
      setNewOnCoinbase(formatDataWithArrow(rawDataRef.current.newOnCoinbase));

    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 200;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const statsCards = [
    {
      title: "Total market cap",
      value: "GHS 23.97T",
      change: "↘ 1.35%",
      changeColor: "text-[#ea3943]",
      chart: totalMarketCapChart,
    },
    {
      title: "Trade volume",
      value: "GHS 1.27T",
      change: "↗ 18.33%",
      changeColor: "text-[#098551]",
      chart: tradeVolumeChart,
    },
    {
      title: "Buy-sell ratio",
      value: "GHS 0.76",
      change: "↘ 1.76%",
      changeColor: "text-[#ea3943]",
      chart: buySellRatioChart,
    },
    {
      title: "BTC dominance",
      value: "60.03%",
      change: "↘ 0.06%",
      changeColor: "text-[#ea3943]",
      chart: btcDominanceChart,
    },
  ];

  return (
    <div className="bg-white">
      <section className="w-full">
        <div className="grid min-h-screen grid-cols-1 xl:grid-cols-[minmax(0,1fr)_430px]">
          {/* LEFT MAIN AREA */}
          <div className="flex min-w-0 flex-col border-r border-[#e5e7eb]">
            <ExploreHero />
            <div className="border-t border-[#e5e7eb]" />
            <MarketStats statsCards={statsCards} />
            <div className="border-t border-[#e5e7eb]" />
            <CryptoPrices coins={coins} assetCharts={assetCharts} />
            <ExploreCTA />
          </div>

          {/* RIGHT SIDEBAR */}
          <ExploreSidebar>
            <TopMovers 
              topMovers={topMovers} 
              scrollRef={topMoversRef} 
              onScroll={scroll} 
            />
            <div className="border-t border-[#e5e7eb]" />
            <NewOnCoinbase 
              newOnCoinbase={newOnCoinbase} 
              scrollRef={newOnCoinbaseRef} 
              onScroll={scroll} 
            />
          </ExploreSidebar>
        </div>
      </section>
    </div>
  );
}

export default Explore;