import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Home, TrendingUp, LayoutGrid, FileText, MoreVertical, BarChart2,
  Search, Bell, HelpCircle, Grid, ChevronRight, Plus,
  ArrowUp, ArrowDown, LogOut, ArrowRight, Globe, ChevronDown,
  UserPlus, Settings, Moon
} from "lucide-react";
import buysNotSupportedImg from "../assets/images/buys_not_supported.png";
import watchlistImg from "../assets/images/watchlist.png";

function Profile() {
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("buy");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const [profileRes, cryptoRes] = await Promise.all([
          axios.get("/api/auth/profile", {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {}
          }),
          axios.get("/api/crypto")
        ]);
        setUser(profileRes.data);
        setCoins(cryptoRes.data);
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
      sessionStorage.removeItem('token');
      localStorage.removeItem("cookieBannerDismissed");
      navigate("/signin", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-gray-500 text-lg">Loading dashboard...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-red-500 text-lg">{error}</div>
    </div>
  );

  const popularCoins = coins.filter(c => ["BTC", "ETH"].includes(c.symbol)).slice(0, 2);
  const mostTraded = coins.find(c => c.symbol === "BNB") || coins[3];

  return (
    <div className="h-screen overflow-hidden bg-white text-[#0A0B0D] font-sans flex">

      {/* Left Sidebar */}
      <aside className="w-[88px] h-screen sticky top-0 border-r border-gray-200 flex flex-col items-center py-6 shrink-0 z-50 bg-white">
        {/* Coinbase Logo */}
        <Link to="/" className="w-14 h-14 flex items-center justify-center mb-6 cursor-pointer shrink-0 hover:opacity-80 transition-opacity">
          <svg viewBox="0 0 32 32" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0c8.083 0 14.773 5.992 15.86 13.82h-9.141c-.818-3.053-3.6-5.32-6.719-5.32-3.866 0-7 3.134-7 7s3.134 7 7 7c3.12 0 5.9-2.267 6.719-5.32h9.141C29.773 26.008 23.083 32 16 32z" fill="#0052FF"/>
          </svg>
        </Link>

        {/* Nav Icons */}
        <nav className="flex flex-col items-center gap-4 w-full">
          {/* Home */}
          <div className="relative flex justify-center w-full group">
            <button className="w-14 h-14 rounded-full bg-[#F3F5F7] group-hover:bg-[#E2E8F0] flex items-center justify-center transition-colors">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="#0052FF" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L22 10.5V22H15V14C15 13.4477 14.5523 13 14 13H10C9.44772 13 9 13.4477 9 14V22H2V10.5L12 2Z" />
              </svg>
            </button>
            <div className="absolute left-[100px] top-1/2 -translate-y-1/2 px-3 py-2 bg-[#0A0B0D] text-white text-[13px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Home
            </div>
          </div>
          
          {/* Trade */}
          <div className="relative flex justify-center w-full group">
            <button className="w-14 h-14 rounded-full text-[#0A0B0D] hover:bg-gray-100 flex items-center justify-center transition-colors">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 17 9 11 13 15 21 7"></polyline>
                <polyline points="14 7 21 7 21 14"></polyline>
                <line x1="3" y1="22" x2="21" y2="22"></line>
              </svg>
            </button>
            <div className="absolute left-[100px] top-1/2 -translate-y-1/2 px-3 py-2 bg-[#0A0B0D] text-white text-[13px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Trade
            </div>
          </div>
          
          {/* Lend */}
          <div className="relative flex justify-center w-full group">
            <button className="w-14 h-14 rounded-full text-[#0A0B0D] hover:bg-gray-100 flex items-center justify-center transition-colors">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="10" rx="1"></rect>
                <circle cx="12" cy="12" r="1.5" fill="currentColor"></circle>
                <line x1="6" y1="12" x2="6.01" y2="12"></line>
                <line x1="18" y1="12" x2="18.01" y2="12"></line>
              </svg>
            </button>
            <div className="absolute left-[100px] top-1/2 -translate-y-1/2 px-3 py-2 bg-[#0A0B0D] text-white text-[13px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Lend
            </div>
          </div>
          
          {/* Transactions */}
          <div className="relative flex justify-center w-full group">
            <button className="w-14 h-14 rounded-full text-[#0A0B0D] hover:bg-gray-100 flex items-center justify-center transition-colors">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 2h14v20l-3-2-3 2-3-2-3 2-3-2V2z"></path>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="9" y1="12" x2="13" y2="12"></line>
              </svg>
            </button>
            <div className="absolute left-[100px] top-1/2 -translate-y-1/2 px-3 py-2 bg-[#0A0B0D] text-white text-[13px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Transactions
            </div>
          </div>
          
          {/* See more */}
          <div className="relative flex justify-center w-full group">
            <button className="w-14 h-14 rounded-full text-[#0A0B0D] hover:bg-gray-100 flex items-center justify-center transition-colors">
              <MoreVertical size={30} strokeWidth={1.5} />
            </button>
            <div className="absolute left-[100px] top-1/2 -translate-y-1/2 px-3 py-2 bg-[#0A0B0D] text-white text-[13px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              See more
            </div>
          </div>
        </nav>

        {/* Bottom - Advanced */}
        <div className="mt-auto pt-10 flex flex-col items-center gap-1 pb-4 relative group w-full shrink-0">
          <button className="w-14 h-14 rounded-full text-[#0A0B0D] hover:bg-gray-100 flex items-center justify-center transition-colors">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="8" width="4" height="8" rx="0.5"></rect>
              <line x1="8" y1="4" x2="8" y2="8"></line>
              <line x1="8" y1="16" x2="8" y2="20"></line>
              <rect x="14" y="6" width="4" height="8" rx="0.5"></rect>
              <line x1="16" y1="4" x2="16" y2="6"></line>
              <line x1="16" y1="14" x2="16" y2="20"></line>
            </svg>
          </button>
          <span className="text-[12px] font-bold text-[#0A0B0D] mt-1">Advanced</span>
          <div className="w-[44px] h-[24px] mt-2 bg-[#D0D5DD] rounded-full relative cursor-pointer transition-colors">
            <div className="w-[20px] h-[20px] bg-white rounded-full absolute left-[2px] top-[2px] shadow-sm" />
          </div>
          
          {/* Advanced Tooltip */}
          <div className="absolute left-[100px] top-1/2 -translate-y-1/2 px-3 py-2 bg-[#0A0B0D] text-white text-[13px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
            Turn Coinbase Advanced on
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen max-w-full overflow-hidden">
        
        {/* Top Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <h1 className="text-[24px] font-bold">Home</h1>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="flex items-center gap-3 bg-[#F3F5F7] hover:bg-[#E2E8F0] transition-colors rounded-full px-5 h-[48px] w-[360px] cursor-text">
              <Search size={20} className="text-[#0A0B0D]" strokeWidth={2} />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent border-none outline-none text-[16px] w-full text-[#0A0B0D] placeholder-[#5B616E]"
                readOnly
              />
            </div>
            
            <button className="w-10 h-10 rounded-full bg-[#F3F5F7] hover:bg-[#E2E8F0] flex items-center justify-center text-[#0A0B0D] transition-colors ml-2">
              <Bell size={20} strokeWidth={2.5} />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#F3F5F7] hover:bg-[#E2E8F0] flex items-center justify-center text-[#0A0B0D] transition-colors">
              <span className="text-[20px] font-semibold leading-none pb-[2px]">?</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-[#F3F5F7] hover:bg-[#E2E8F0] flex items-center justify-center text-[#0A0B0D] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="1.8"/>
                <circle cx="12" cy="5" r="1.8"/>
                <circle cx="19" cy="5" r="1.8"/>
                <circle cx="5" cy="12" r="1.8"/>
                <circle cx="12" cy="12" r="1.8"/>
                <circle cx="19" cy="12" r="1.8"/>
                <circle cx="5" cy="19" r="1.8"/>
                <circle cx="12" cy="19" r="1.8"/>
                <circle cx="19" cy="19" r="1.8"/>
              </svg>
            </button>
            
            {/* Avatar & Dropdown */}
            <div className="relative">
              <div 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="w-10 h-10 rounded-full bg-[#0052FF] flex items-center justify-center text-[16px] font-bold text-white cursor-pointer ml-1 hover:brightness-90 transition-all"
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              {isProfileDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-[calc(100%+12px)] w-[320px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {/* User Info */}
                    <div className="px-5 py-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#0052FF] flex items-center justify-center text-[20px] font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[17px] font-bold text-[#0A0B0D]">{user.name}</span>
                        <span className="text-[14px] text-[#5B616E]">{user.email}</span>
                        <button className="text-[14px] font-bold text-[#0052FF] hover:text-[#0041CC] mt-0.5 text-left">Manage account</button>
                      </div>
                    </div>

                    <div className="h-px bg-gray-100 my-1" />

                    {/* Menu Items */}
                    <button className="w-full px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                      <div className="w-8 h-8 flex items-center justify-center text-[#0A0B0D]">
                        <UserPlus size={22} strokeWidth={1.5} />
                      </div>
                      <span className="text-[16px] font-semibold text-[#0A0B0D]">Add account</span>
                    </button>

                    <button className="w-full px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                      <div className="w-8 h-8 flex items-center justify-center text-[#0A0B0D]">
                        <Settings size={22} strokeWidth={1.5} />
                      </div>
                      <span className="text-[16px] font-semibold text-[#0A0B0D]">Settings</span>
                    </button>

                    <div className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 flex items-center justify-center text-[#0A0B0D]">
                          <Moon size={22} strokeWidth={1.5} />
                        </div>
                        <span className="text-[16px] font-semibold text-[#0A0B0D]">Dark mode</span>
                      </div>
                      <div className="w-[44px] h-[24px] bg-[#D0D5DD] rounded-full relative transition-colors">
                        <div className="w-[20px] h-[20px] bg-white rounded-full absolute left-[2px] top-[2px] shadow-sm" />
                      </div>
                    </div>

                    <button 
                      onClick={handleLogout}
                      className="w-full px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors group text-[#DF2038]"
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        <LogOut size={22} strokeWidth={2} />
                      </div>
                      <span className="text-[16px] font-bold">Sign out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Center Column */}
          <div className="flex-1 overflow-y-auto">
            <div className="w-full px-8 lg:px-12 py-10">
              
              {/* Balance */}
              <div className="mb-2">
                <h2 className="text-[48px] font-normal tracking-tight text-[#0A0B0D]">GHS 0.00</h2>
              </div>

              {/* Asset Categories */}
              <div className="mb-4">
                {/* Crypto Row */}
                <div className="flex items-center justify-between py-1 cursor-pointer hover:bg-gray-50 transition-colors group -mx-8 px-8 lg:-mx-12 lg:px-12">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F3F5F7] flex items-center justify-center group-hover:bg-[#E2E8F0] transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0B0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="12" r="7"></circle>
                        <circle cx="15" cy="12" r="7"></circle>
                      </svg>
                    </div>
                    <span className="text-[17px] font-semibold">Crypto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[17px] text-[#0A0B0D]">GHS 0.00</span>
                    <ChevronRight size={20} className="text-[#5B616E] group-hover:text-[#0A0B0D] transition-colors" />
                  </div>
                </div>

                {/* Cash Row */}
                <div className="flex items-center justify-between py-1 cursor-pointer hover:bg-gray-50 transition-colors group -mx-8 px-8 lg:-mx-12 lg:px-12">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F3F5F7] flex items-center justify-center group-hover:bg-[#E2E8F0] transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0B0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path d="M6 12h.01M18 12h.01"></path>
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[17px] font-semibold">Cash</span>
                      <span className="text-[14px] text-[#05B169]">
                        • 3.35% APY
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[17px] font-bold text-[#0052FF]">Deposit</span>
                    <ChevronRight size={20} className="text-[#5B616E] group-hover:text-[#0A0B0D] transition-colors" />
                  </div>
                </div>

                {/* Derivatives Row */}
                <div className="flex items-center justify-between py-1 cursor-pointer hover:bg-gray-50 transition-colors group -mx-8 px-8 lg:-mx-12 lg:px-12">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F3F5F7] flex items-center justify-center group-hover:bg-[#E2E8F0] transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0B0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </div>
                    <span className="text-[17px] font-semibold">Derivatives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[17px] text-[#0A0B0D]">0 positions</span>
                    <ChevronRight size={20} className="text-[#5B616E] group-hover:text-[#0A0B0D] transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Full-width dividing line */}
            <div className="w-full h-[1px] bg-gray-200"></div>

            {/* Re-open container for Watchlist */}
            <div className="w-full px-8 lg:px-12 pt-8 pb-10">
              
              {/* Watchlist Section */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-10 cursor-pointer group mt-2">
                  <h3 className="text-[20px] font-bold text-[#0A0B0D]">Watchlist</h3>
                  <div className="w-8 h-8 rounded-full bg-[#F3F5F7] flex items-center justify-center group-hover:bg-[#E2E8F0] transition-colors">
                    <ArrowRight size={18} className="text-[#0A0B0D]" strokeWidth={2.5} />
                  </div>
                </div>

                <div className="flex flex-col items-center pb-8">
                  {/* Exact Watchlist Illustration */}
                  <div className="w-[120px] h-[120px] mb-6 relative flex items-center justify-center">
                    <img 
                      src={watchlistImg} 
                      alt="Watchlist" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <h4 className="text-[22px] font-bold mb-2 text-[#0A0B0D]">Build your watchlist</h4>
                  <p className="text-[15px] text-[#5B616E] text-center mb-10 leading-relaxed">
                    Keep track of crypto prices by adding assets to your watchlist
                  </p>
                  <button className="w-full py-4 bg-[#F3F5F7] hover:bg-[#E2E8F0] text-[#0A0B0D] text-[16px] font-bold rounded-full transition-colors">
                    Add to watchlist
                  </button>
                </div>
              </div>

              {/* Crypto Section */}
              <div className="mb-8">
                <div className="border-t border-gray-100 -mx-8 lg:-mx-12 mb-4" />
                <div className="flex items-center justify-between mb-2 cursor-pointer group">
                  <div>
                    <h3 className="text-[20px] font-bold">Crypto</h3>
                    <p className="text-[15px] text-[#5B616E] mt-1">Trade millions of assets</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#F3F5F7] flex items-center justify-center group-hover:bg-[#E2E8F0] transition-colors">
                    <ArrowRight size={18} className="text-[#0A0B0D]" strokeWidth={2.5} />
                  </div>
                </div>

                <div className="mt-4">
                  {popularCoins.map((coin) => (
                    <Link
                      key={coin._id}
                      to={`/assets/${coin.name.toLowerCase()}`}
                      className="flex items-center justify-between py-2.5 hover:bg-gray-50 transition-colors group -mx-8 px-8 lg:-mx-12 lg:px-12"
                    >
                      <div className="flex items-center gap-4">
                        <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="text-[17px] font-bold">{coin.name}</p>
                          <p className="text-[15px] text-[#5B616E]">Most popular</p>
                        </div>
                      </div>
                      <button className="px-5 py-2 bg-[#F3F5F7] hover:bg-[#E2E8F0] text-[#0A0B0D] text-[15px] font-bold rounded-full transition-colors">
                        Buy
                      </button>
                    </Link>
                  ))}

                  {mostTraded && (
                    <Link
                      to={`/assets/${mostTraded.name.toLowerCase()}`}
                      className="flex items-center justify-between py-2.5 hover:bg-gray-50 transition-colors group -mx-8 px-8 lg:-mx-12 lg:px-12"
                    >
                      <div className="flex items-center gap-4">
                        <img src={mostTraded.image} alt={mostTraded.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="text-[17px] font-bold">{mostTraded.name}</p>
                          <p className="text-[15px] text-[#5B616E]">Most traded today</p>
                        </div>
                      </div>
                      <button className="px-5 py-2 bg-[#F3F5F7] hover:bg-[#E2E8F0] text-[#0A0B0D] text-[15px] font-bold rounded-full transition-colors">
                        Buy
                      </button>
                    </Link>
                  )}
                </div>

                <Link
                  to="/explore"
                  className="block w-full py-3 mt-4 bg-[#F3F5F7] hover:bg-[#E2E8F0] text-[#0A0B0D] text-[16px] font-bold rounded-full text-center transition-colors"
                >
                  Explore all crypto
                </Link>
              </div>

              {/* Cash Section */}
              <div className="mb-8">
                <div className="border-t border-gray-100 -mx-8 lg:-mx-12 mb-4" />
                <div className="flex flex-col hover:bg-gray-50 transition-colors group py-2.5 -mx-8 px-8 lg:-mx-12 lg:px-12 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[20px] font-bold text-[#0A0B0D]">Cash</h3>
                      <p className="text-[15px] text-[#5B616E] mt-0.5">
                        Earn <span className="text-[#05B169]">3.35% APY</span>
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#F3F5F7] flex items-center justify-center group-hover:bg-[#E2E8F0] transition-colors">
                      <ArrowRight size={18} className="text-[#0A0B0D]" strokeWidth={2.5} />
                    </div>
                  </div>
                  <button className="w-full mt-5 py-3.5 bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#0A0B0D] text-[16px] font-bold rounded-full transition-colors">
                    Deposit cash
                  </button>
                </div>
              </div>

              {/* Derivatives Section */}
              <div className="mb-8">
                <div className="border-t border-gray-100 -mx-8 lg:-mx-12 mb-4" />
                <div className="flex items-center justify-between mb-2 cursor-pointer group hover:bg-gray-50 transition-colors py-2.5 -mx-8 px-8 lg:-mx-12 lg:px-12">
                  <div>
                    <h3 className="text-[20px] font-bold text-[#0A0B0D]">Derivatives</h3>
                    <p className="text-[15px] text-[#5B616E] mt-0.5">Trade with up to 50x leverage</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#F3F5F7] flex items-center justify-center group-hover:bg-[#E2E8F0] transition-colors">
                    <ArrowRight size={18} className="text-[#0A0B0D]" strokeWidth={2.5} />
                  </div>
                </div>

                <div className="mt-2">
                  {/* BTC Perpetual */}
                  <div className="flex items-center justify-between py-2.5 hover:bg-gray-50 transition-colors group -mx-8 px-8 lg:-mx-12 lg:px-12 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F7931A] flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.624 10.308c.552-3.69-2.222-5.714-6.046-7.037L11.666 0l-2.48.618-1.053 4.238c-.628-.157-1.272-.308-1.921-.453L5.166.173 2.686.79l1.096 4.41c-.516.126-.983.255-1.428.375L.716 5.967l.872 3.513s1.65-.41 1.616-.403c.9.224 1.062.818 1.035 1.286l-1.04 4.18c.074.018.17.046.28.083-.092-.022-.19-.047-.291-.07l-1.455 5.85-1.616.402-1.393 5.602 2.48-.617 1.088-4.376c.645.168 1.272.32 1.884.462l-1.09 4.382 2.48-.617 1.058-4.256c5.15 1.134 9.034.68 10.638-4.004 1.29-3.766-.192-5.94-2.73-7.362 1.94-.447 3.407-1.928 3.82-4.823zM12.95 18.236c-1.397 5.617-10.82 2.585-13.882 1.823l1.982-7.967c3.06.762 13.315 1.026 11.9 6.144zm1.31-7.14c-1.264 5.086-9.01 2.433-11.545 1.8l1.79-7.195c2.535.632 11.033 1.137 9.755 5.396z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[17px] font-bold text-[#0A0B0D]">BTC Perpetual</p>
                          <span className="px-1.5 py-0.5 bg-[#F3F5F7] text-[#0A0B0D] text-[12px] font-bold rounded">50x</span>
                        </div>
                        <p className="text-[15px] text-[#5B616E]">INTX</p>
                      </div>
                    </div>
                    <button className="px-5 py-2 bg-[#F3F5F7] hover:bg-[#E2E8F0] text-[#0A0B0D] text-[15px] font-bold rounded-full transition-colors">
                      Trade
                    </button>
                  </div>

                  {/* ETH Perpetual */}
                  <div className="flex items-center justify-between py-2.5 hover:bg-gray-50 transition-colors group -mx-8 px-8 lg:-mx-12 lg:px-12 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#627EEA] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.37 4.35h.001z" opacity=".5"/>
                          <path d="M11.944 0L4.58 12.23l7.363 4.36 7.37-4.36L11.944 0z" opacity=".7"/>
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[17px] font-bold text-[#0A0B0D]">ETH Perpetual</p>
                          <span className="px-1.5 py-0.5 bg-[#F3F5F7] text-[#0A0B0D] text-[12px] font-bold rounded">50x</span>
                        </div>
                        <p className="text-[15px] text-[#5B616E]">INTX</p>
                      </div>
                    </div>
                    <button className="px-5 py-2 bg-[#F3F5F7] hover:bg-[#E2E8F0] text-[#0A0B0D] text-[15px] font-bold rounded-full transition-colors">
                      Trade
                    </button>
                  </div>

                  {/* SOL Perpetual */}
                  <div className="flex items-center justify-between py-2.5 hover:bg-gray-50 transition-colors group -mx-8 px-8 lg:-mx-12 lg:px-12 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#000000] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.35 15.35h14.54c.63 0 .95.76.5 1.2l-3.35 3.35H1.5c-.63 0-.95-.76-.5-1.2l3.35-3.35zM4.35 4.1h14.54c.63 0 .95.76.5 1.2L16.04 8.65H1.5c-.63 0-.95-.76-.5-1.2L4.35 4.1zm15.3 5.62l-3.35 3.35H1.76c-.63 0-.95-.76-.5-1.2l3.35-3.35h14.54c.63 0 .95.76.5 1.2z" fill="#00FFA3" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[17px] font-bold text-[#0A0B0D]">SOL Perpetual</p>
                          <span className="px-1.5 py-0.5 bg-[#F3F5F7] text-[#0A0B0D] text-[12px] font-bold rounded">50x</span>
                        </div>
                        <p className="text-[15px] text-[#5B616E]">INTX</p>
                      </div>
                    </div>
                    <button className="px-5 py-2 bg-[#F3F5F7] hover:bg-[#E2E8F0] text-[#0A0B0D] text-[15px] font-bold rounded-full transition-colors">
                      Trade
                    </button>
                  </div>
                </div>
                <div className="border-t border-gray-100 -mx-8 lg:-mx-12 mt-12" />
              </div>
              
              {/* Footer Links */}
              <div className="pt-8 pb-12 flex flex-col items-start gap-4">
                <div className="flex items-center gap-6 text-[15px] text-[#5B616E]">
                  <a href="#" className="hover:text-black underline transition-all">Careers</a>
                  <a href="#" className="hover:text-black underline transition-all">Legal & Privacy</a>
                  <a href="#" className="hover:text-black underline transition-all">Accessibility Statement</a>
                  <span>© 2026 Coinbase</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#F3F5F7] rounded-full text-[16px] font-bold text-[#0A0B0D] cursor-pointer hover:bg-[#E2E8F0] transition-all">
                  <span>English</span>
                  <ChevronDown size={18} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-[460px] h-full border-l border-gray-200 p-8 shrink-0 hidden xl:block bg-white overflow-y-auto custom-scrollbar">
            
            {/* Buy/Sell/Convert Tabs */}
            <div className="flex bg-[#F3F5F7] p-1 rounded-full mb-8">
              {["buy", "sell", "convert"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-full text-[15px] font-bold capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-[#0A0B0D] text-white shadow-md"
                      : "text-[#5B616E] hover:text-[#0A0B0D]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dynamic Card Content based on Active Tab */}
            <div className="bg-white rounded-[16px] p-8 mb-8 text-left">
              {activeTab === "buy" ? (
                <>
                  <div className="w-60 h-60 mx-auto relative mb-0">
                    <img 
                      src={buysNotSupportedImg} 
                      alt="Buys not supported" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-[26px] font-bold mb-2 text-[#0A0B0D]">Buys not supported</h3>
                  <p className="text-[17px] text-[#5B616E] mb-8 leading-relaxed">
                    Coinbase doesn't currently support buys in your country. Subscribe to our blog to be notified when we add support for your country.
                  </p>
                  <button className="w-full py-4 bg-[#0052FF] text-white text-[17px] font-bold rounded-full hover:bg-blue-700 transition-colors">
                    Subscribe now
                  </button>
                </>
              ) : activeTab === "sell" ? (
                <>
                  <h3 className="text-[28px] font-bold mb-4 text-[#0A0B0D] leading-[1.1]">You don't have anything to sell yet</h3>
                  <p className="text-[17px] text-[#5B616E] mb-8 leading-relaxed">
                    Get started by exploring our inventory of crypto assets
                  </p>
                  <div className="w-28 h-28 mb-10 relative">
                    {/* Recreating the Sell illustration in SVG */}
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Gray faded background shapes */}
                      <rect x="0" y="20" width="30" height="20" fill="#E2E8F0" />
                      <rect x="0" y="45" width="20" height="20" fill="#E2E8F0" />
                      <rect x="0" y="70" width="40" height="20" fill="#E2E8F0" />
                      <rect x="35" y="70" width="15" height="15" fill="#E2E8F0" />
                      
                      {/* Black circle with star */}
                      <circle cx="60" cy="55" r="35" fill="black" />
                      <path d="M60 35 L64 51 L80 55 L64 59 L60 75 L56 59 L40 55 L56 51 Z" fill="white" />
                      
                      {/* Blue quarter circle */}
                      <path d="M60 55 L95 55 A35 35 0 0 1 60 90 Z" fill="#0052FF" />
                      
                      {/* Small plus icon */}
                      <path d="M85 25 H95 M90 20 V30" stroke="black" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <button className="w-full py-4 bg-[#0052FF] text-white text-[17px] font-bold rounded-full hover:bg-blue-700 transition-colors">
                    Explore assets
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-[28px] font-bold mb-4 text-[#0A0B0D] leading-[1.1]">You don't have anything to convert yet</h3>
                  <p className="text-[17px] text-[#5B616E] mb-8 leading-relaxed">
                    Get started by exploring our inventory of crypto assets
                  </p>
                  <div className="w-28 h-28 mb-10 relative">
                    {/* Recreating the illustration in SVG */}
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0" y="20" width="30" height="20" fill="#E2E8F0" />
                      <rect x="0" y="45" width="20" height="20" fill="#E2E8F0" />
                      <rect x="0" y="70" width="40" height="20" fill="#E2E8F0" />
                      <rect x="35" y="70" width="15" height="15" fill="#E2E8F0" />
                      <circle cx="60" cy="55" r="35" fill="black" />
                      <path d="M60 35 L64 51 L80 55 L64 59 L60 75 L56 59 L40 55 L56 51 Z" fill="white" />
                      <path d="M60 55 L95 55 A35 35 0 0 1 60 90 Z" fill="#0052FF" />
                      <path d="M85 25 H95 M90 20 V30" stroke="black" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <button className="w-full py-4 bg-[#0052FF] text-white text-[17px] font-bold rounded-full hover:bg-blue-700 transition-colors">
                    Explore assets
                  </button>
                </>
              )}
            </div>

            {/* Send / Receive Quick Actions */}
            <div className="space-y-3 mt-4">
              <button className="flex items-center gap-4 w-full py-3 px-3 rounded-2xl hover:bg-[#F3F5F7] transition-colors group">
                <div className="w-10 h-10 rounded-full bg-[#0052FF] flex items-center justify-center flex-shrink-0">
                  <ArrowUp size={20} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="text-[16px] font-bold text-[#0A0B0D]">Send crypto</span>
              </button>
              
              <button className="flex items-center gap-4 w-full py-3 px-3 rounded-2xl hover:bg-[#F3F5F7] transition-colors group">
                <div className="w-10 h-10 rounded-full bg-[#0052FF] flex items-center justify-center flex-shrink-0">
                  <ArrowDown size={20} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="text-[16px] font-bold text-[#0A0B0D]">Receive crypto</span>
              </button>
              
              <div className="border-t border-gray-200 -mx-8 mt-12 mb-8" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
