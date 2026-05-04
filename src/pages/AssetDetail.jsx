import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Star, Share2, TrendingUp, TrendingDown, Info } from "lucide-react";

function AssetDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1M");
  const [activeAction, setActiveAction] = useState("buy");

  // Generate simulated chart data
  const generateChartData = (period) => {
    const points = period === "1H" ? 60 : period === "1D" ? 96 : period === "1W" ? 7 : period === "1M" ? 30 : period === "1Y" ? 12 : 60;
    let base = 1000;
    const data = [];
    for (let i = 0; i < points; i++) {
      base += (Math.random() - 0.45) * 50;
      base = Math.max(500, base);
      data.push(base);
    }
    return data;
  };

  const [chartData, setChartData] = useState(generateChartData("1M"));

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await axios.get("/api/crypto");
        setAllCoins(response.data);
        const found = response.data.find(
          (c) => c.name.toLowerCase() === id.toLowerCase() || c.symbol.toLowerCase() === id.toLowerCase()
        );
        if (found) {
          setCoin(found);
        }
      } catch (err) {
        console.error("Error fetching coin data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);

  const handleTabChange = (period) => {
    setActiveTab(period);
    setChartData(generateChartData(period));
  };

  // SVG chart path generator
  const getChartPath = (data, width, height) => {
    if (data.length === 0) return "";
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const stepX = width / (data.length - 1);

    return data.map((val, i) => {
      const x = i * stepX;
      const y = height - ((val - min) / range) * height;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  };

  // Simulated market stats
  const getMarketStats = (coin) => ({
    marketCap: (coin.price * (Math.random() * 500000000 + 100000000)).toLocaleString(undefined, { maximumFractionDigits: 0 }),
    volume24h: (coin.price * (Math.random() * 50000000 + 10000000)).toLocaleString(undefined, { maximumFractionDigits: 0 }),
    circulatingSupply: (Math.random() * 900000000 + 100000000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
    allTimeHigh: (coin.price * (1 + Math.random() * 2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    allTimeLow: (coin.price * (Math.random() * 0.1)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  });

  if (loading) return <div className="p-8 text-center min-h-screen bg-white">Loading...</div>;
  if (!coin) return (
    <div className="p-8 text-center min-h-screen bg-white">
      <p className="text-xl text-gray-500">Asset not found</p>
      <Link to="/explore" className="text-blue-600 mt-4 inline-block">← Back to Explore</Link>
    </div>
  );

  const isPositive = coin.change24h >= 0;
  const stats = getMarketStats(coin);
  const timePeriods = ["1H", "1D", "1W", "1M", "1Y", "ALL"];

  // About text for each coin
  const aboutText = {
    bitcoin: "Bitcoin is the first and most well-known cryptocurrency, created in 2009 by the pseudonymous Satoshi Nakamoto. It operates on a decentralized peer-to-peer network, enabling users to send and receive payments without intermediaries. Bitcoin uses proof-of-work consensus to secure its network and has a fixed supply cap of 21 million coins.",
    ethereum: "Ethereum is a decentralized blockchain platform that enables the creation of smart contracts and decentralized applications (dApps). Founded by Vitalik Buterin in 2015, Ethereum introduced the concept of programmable money and is the backbone of the DeFi and NFT ecosystems.",
    tether: "Tether (USDT) is a stablecoin pegged to the US Dollar, designed to maintain a 1:1 value ratio. It is widely used in cryptocurrency trading as a means to move value quickly between exchanges without the volatility associated with other cryptocurrencies.",
    bnb: "BNB is the native cryptocurrency of the Binance ecosystem. Originally created as a utility token for discounted trading fees on the Binance exchange, BNB has grown to power the BNB Chain, supporting a wide range of decentralized applications.",
    xrp: "XRP is the native cryptocurrency of the XRP Ledger, designed to facilitate fast and low-cost cross-border payments. Developed by Ripple Labs, XRP aims to be a bridge currency for global financial institutions.",
    usdc: "USD Coin (USDC) is a fully backed stablecoin pegged to the US Dollar. Issued by Circle and Coinbase, USDC is designed to provide a transparent and regulated digital dollar for payments, trading, and DeFi applications.",
  };

  const coinAbout = aboutText[coin.name.toLowerCase()] ||
    `${coin.name} (${coin.symbol}) is a cryptocurrency available for trading on major exchanges. It operates on blockchain technology and offers unique features within the digital asset ecosystem.`;

  return (
    <div className="min-h-screen bg-white text-[#0a0b0d] font-sans">
      {/* Top Bar */}
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-[1200px] px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/explore" className="text-gray-400 hover:text-black transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
              <h1 className="text-[18px] font-bold">{coin.name}</h1>
              <span className="text-[14px] text-gray-400 font-medium">{coin.symbol}</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Star size={20} className="text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 size={20} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

          {/* Left Column - Price & Chart */}
          <div>
            {/* Price */}
            <div className="mb-2">
              <h2 className="text-[14px] text-gray-500 font-medium mb-1">{coin.name} price</h2>
              <div className="flex items-baseline gap-4">
                <span className="text-[48px] font-bold tracking-tight leading-none">
                  ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <p className="mt-2 flex items-center gap-2 text-[15px]">
                {isPositive ? (
                  <TrendingUp size={16} className="text-green-600" />
                ) : (
                  <TrendingDown size={16} className="text-red-500" />
                )}
                <span className={`font-semibold ${isPositive ? "text-green-600" : "text-red-500"}`}>
                  {isPositive ? "+" : ""}{coin.change24h.toFixed(2)}%
                </span>
                <span className="text-gray-400">24h</span>
              </p>
            </div>

            {/* Chart */}
            <div className="mt-6 mb-4">
              <svg viewBox="0 0 800 250" className="w-full h-[250px]">
                <defs>
                  <linearGradient id="assetGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isPositive ? "#16a34a" : "#ef4444"} stopOpacity="0.1" />
                    <stop offset="100%" stopColor={isPositive ? "#16a34a" : "#ef4444"} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={getChartPath(chartData, 800, 230)}
                  fill="none"
                  stroke={isPositive ? "#16a34a" : "#ef4444"}
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            {/* Time Tabs */}
            <div className="flex items-center gap-1 mb-10">
              {timePeriods.map((period) => (
                <button
                  key={period}
                  onClick={() => handleTabChange(period)}
                  className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                    activeTab === period
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* Market Stats */}
            <div className="mb-10">
              <h3 className="text-[20px] font-bold mb-6">Market stats</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { label: "Market cap", value: `$${stats.marketCap}` },
                  { label: "Volume (24h)", value: `$${stats.volume24h}` },
                  { label: "Circulating supply", value: `${stats.circulatingSupply} ${coin.symbol}` },
                  { label: "All-time high", value: `$${stats.allTimeHigh}` },
                  { label: "All-time low", value: `$${stats.allTimeLow}` },
                  { label: "Price change (24h)", value: `${isPositive ? "+" : ""}${coin.change24h.toFixed(2)}%` },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-[14px] text-gray-500 flex items-center gap-1">
                      {stat.label}
                      <Info size={14} className="text-gray-300" />
                    </span>
                    <span className="text-[14px] font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="mb-10">
              <h3 className="text-[20px] font-bold mb-4">About {coin.name}</h3>
              <p className="text-[15px] leading-7 text-gray-600">{coinAbout}</p>
            </div>

            {/* Related Assets */}
            <div>
              <h3 className="text-[20px] font-bold mb-4">Related assets</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {allCoins
                  .filter((c) => c._id !== coin._id)
                  .slice(0, 6)
                  .map((related) => (
                    <Link
                      key={related._id}
                      to={`/assets/${related.name.toLowerCase()}`}
                      className="flex items-center gap-3 p-4 rounded-[12px] border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                      <img src={related.image} alt={related.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-[14px] font-semibold">{related.name}</p>
                        <p className={`text-[13px] font-medium ${related.change24h >= 0 ? "text-green-600" : "text-red-500"}`}>
                          {related.change24h >= 0 ? "+" : ""}{related.change24h.toFixed(2)}%
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column - Buy/Sell Panel */}
          <div>
            <div className="rounded-[16px] border border-gray-200 p-6 sticky top-6">
              {/* Buy/Sell/Convert Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                {["buy", "sell", "convert"].map((action) => (
                  <button
                    key={action}
                    onClick={() => setActiveAction(action)}
                    className={`flex-1 py-3 text-[14px] font-semibold capitalize border-b-2 transition-colors ${
                      activeAction === action
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-[13px] text-gray-500 font-medium mb-2">
                  {activeAction === "buy" ? "Buy amount" : activeAction === "sell" ? "Sell amount" : "Convert amount"}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[24px] font-bold text-gray-300">$</span>
                  <input
                    type="text"
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-4 text-[24px] font-bold border border-gray-200 rounded-[12px] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-right"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-[13px] text-gray-500 font-medium mb-2">Pay with</label>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-[12px] cursor-pointer hover:border-gray-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-[12px] font-bold">USD</span>
                    </div>
                    <span className="text-[14px] font-medium">US Dollar balance</span>
                  </div>
                  <span className="text-[13px] text-gray-400">$0.00</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full py-4 bg-blue-600 text-white rounded-full text-[16px] font-semibold hover:bg-blue-700 transition-colors">
                {activeAction === "buy"
                  ? `Buy ${coin.name}`
                  : activeAction === "sell"
                  ? `Sell ${coin.name}`
                  : `Convert ${coin.name}`}
              </button>

              <p className="text-center text-[12px] text-gray-400 mt-3">
                Demo only — no real transactions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetDetail;
