import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LogOut, TrendingUp, TrendingDown, Home, BookOpen, CreditCard, Wallet, Gift, BarChart3, PieChart } from "lucide-react";

function Profile() {
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTimePeriod, setActiveTimePeriod] = useState("1M");
  const navigate = useNavigate();

  // Simulated portfolio data
  const portfolioBalance = 12345.67;
  const portfolioChange = 1234.56;
  const portfolioChangePercent = 11.11;

  // Generate simulated chart data
  const generateChartData = (period) => {
    const points = period === "1H" ? 60 : period === "1D" ? 96 : period === "1W" ? 7 : period === "1M" ? 30 : period === "1Y" ? 12 : 60;
    let base = 10000;
    const data = [];
    for (let i = 0; i < points; i++) {
      base += (Math.random() - 0.42) * 200;
      base = Math.max(8000, base);
      data.push(base);
    }
    return data;
  };

  const [chartData, setChartData] = useState(generateChartData("1M"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [profileRes, cryptoRes] = await Promise.all([
          axios.get("/api/auth/profile", {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {}
          }),
          axios.get("/api/crypto")
        ]);
        setUser(profileRes.data);
        setCoins(cryptoRes.data.slice(0, 6)); // Show top 6 assets
      } catch (err) {
        setError("Not authorized or session expired. Please log in.");
        setTimeout(() => navigate("/signin"), 2000);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem('token');
      localStorage.removeItem("cookieBannerDismissed");
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleTimePeriodChange = (period) => {
    setActiveTimePeriod(period);
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

  // Portfolio allocation data
  const allocation = [
    { name: "Bitcoin", percent: 50.1, color: "#F7931A" },
    { name: "Ethereum", percent: 20.3, color: "#627EEA" },
    { name: "Solana", percent: 10.8, color: "#9945FF" },
    { name: "USD Coin", percent: 7.8, color: "#2775CA" },
    { name: "Other assets", percent: 11.0, color: "#8B93A6" },
  ];

  if (loading) return <div className="p-8 text-center min-h-screen bg-white">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500 min-h-screen bg-white">{error}</div>;

  const timePeriods = ["1H", "1D", "1W", "1M", "1Y", "ALL"];

  return (
    <div className="min-h-screen bg-white text-[#0a0b0d] font-sans">
      {/* Dashboard Navigation */}
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-[1200px] px-6">
          <nav className="flex items-center gap-1 overflow-x-auto">
            {[
              { icon: Home, label: "Home", active: false },
              { icon: BookOpen, label: "Learn", active: false },
              { icon: CreditCard, label: "Card", active: false },
              { icon: Wallet, label: "Wallet", active: false },
              { icon: Gift, label: "Earn", active: false },
              { icon: BarChart3, label: "Trade", active: false },
              { icon: PieChart, label: "My assets", active: true },
            ].map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-2 px-4 py-4 text-[14px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                  item.active
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}

            <div className="ml-auto">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-4 text-[14px] font-medium text-red-500 hover:text-red-700 transition-colors"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

          {/* Left Column - Balance & Chart */}
          <div>
            {/* Balance */}
            <div className="mb-2">
              <p className="text-[14px] text-gray-500 font-medium mb-1">My balance</p>
              <h1 className="text-[48px] font-bold tracking-tight leading-none">
                ${portfolioBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h1>
              <p className="mt-2 flex items-center gap-1 text-[15px]">
                <span className="text-green-600 font-semibold">
                  +${portfolioChange.toLocaleString(undefined, { minimumFractionDigits: 2 })} ({portfolioChangePercent}%)
                </span>
                <span className="text-gray-400">All time</span>
              </p>
            </div>

            {/* Chart */}
            <div className="mt-6 mb-4">
              <svg viewBox="0 0 800 200" className="w-full h-[200px]">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1652f0" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#1652f0" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={getChartPath(chartData, 800, 180)}
                  fill="none"
                  stroke="#1652f0"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Time Period Tabs */}
            <div className="flex items-center gap-1 mb-8">
              {timePeriods.map((period) => (
                <button
                  key={period}
                  onClick={() => handleTimePeriodChange(period)}
                  className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                    activeTimePeriod === period
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* My Assets Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[20px] font-bold">My assets</h2>
                <Link to="/explore" className="text-[14px] font-semibold text-blue-600 hover:text-blue-700">
                  All assets →
                </Link>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_120px] gap-4 px-4 py-3 text-[13px] text-gray-400 font-medium border-b border-gray-100">
                <span>Name</span>
                <span className="text-right">Balance</span>
                <span className="text-right">Price</span>
                <span className="text-right">Change (24h)</span>
                <span></span>
              </div>

              {/* Asset Rows */}
              {coins.map((coin) => {
                const simulatedBalance = coin.price > 100 ? (Math.random() * 0.5).toFixed(4) : (Math.random() * 2000).toFixed(2);
                const balanceValue = (simulatedBalance * coin.price).toFixed(2);
                const isPositive = coin.change24h >= 0;

                return (
                  <Link
                    key={coin._id}
                    to={`/assets/${coin.name.toLowerCase()}`}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_120px] gap-4 px-4 py-4 items-center hover:bg-gray-50 transition-colors border-b border-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <img src={coin.image} alt={coin.name} className="h-8 w-8 rounded-full" />
                      <div>
                        <p className="font-semibold text-[15px]">{coin.name}</p>
                        <p className="text-[13px] text-gray-400">{coin.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[15px]">${balanceValue}</p>
                      <p className="text-[13px] text-gray-400">{simulatedBalance} {coin.symbol}</p>
                    </div>
                    <p className="text-right font-medium text-[15px]">
                      ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className={`text-right text-[15px] font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}>
                      {isPositive ? "+" : ""}{coin.change24h.toFixed(2)}%
                    </p>
                    <div className="flex gap-2 justify-end">
                      <button className="px-3 py-1.5 text-[12px] font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        Buy
                      </button>
                      <button className="px-3 py-1.5 text-[12px] font-semibold border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                        Sell
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Column - Portfolio Allocation */}
          <div>
            <div className="rounded-[16px] border border-gray-200 p-6">
              <h3 className="text-[18px] font-bold mb-6">Portfolio allocation</h3>

              {/* Donut Chart */}
              <div className="flex justify-center mb-6">
                <svg viewBox="0 0 200 200" className="w-[180px] h-[180px]">
                  {(() => {
                    let cumulative = 0;
                    return allocation.map((item, i) => {
                      const startAngle = cumulative * 3.6;
                      cumulative += item.percent;
                      const endAngle = cumulative * 3.6;

                      const startRad = (startAngle - 90) * (Math.PI / 180);
                      const endRad = (endAngle - 90) * (Math.PI / 180);
                      const largeArc = endAngle - startAngle > 180 ? 1 : 0;

                      const x1 = 100 + 80 * Math.cos(startRad);
                      const y1 = 100 + 80 * Math.sin(startRad);
                      const x2 = 100 + 80 * Math.cos(endRad);
                      const y2 = 100 + 80 * Math.sin(endRad);

                      const ix1 = 100 + 50 * Math.cos(startRad);
                      const iy1 = 100 + 50 * Math.sin(startRad);
                      const ix2 = 100 + 50 * Math.cos(endRad);
                      const iy2 = 100 + 50 * Math.sin(endRad);

                      return (
                        <path
                          key={i}
                          d={`M ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A 50 50 0 ${largeArc} 0 ${ix1} ${iy1} Z`}
                          fill={item.color}
                        />
                      );
                    });
                  })()}
                </svg>
              </div>

              {/* Legend */}
              <div className="space-y-3">
                {allocation.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[14px] text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-[14px] font-semibold">{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* User Info Card */}
            <div className="rounded-[16px] border border-gray-200 p-6 mt-4">
              <h3 className="text-[18px] font-bold mb-4">Account</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium">{user.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
