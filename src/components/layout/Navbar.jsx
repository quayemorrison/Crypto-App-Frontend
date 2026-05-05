import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/icons/coinbaseLogoNavigation-4.svg";
import coinbaseIcon from "../../assets/icons/coinbase-logo.svg";
import navigationUpsell from "../../assets/images/navigation-upsell.png";
import institutionsUpsell from "../../assets/images/institutions_upsell.png";
import developersUpsell from "../../assets/images/developers_upsell_cdxv2_2.jpg";
import companyUpsell from "../../assets/images/company_upsell.png";
import businessUpsell from "../../assets/images/onchain_payment_protocol.png";

import { 
    Search, 
    Globe, 
    Coins,
    LayoutGrid, 
    Percent, 
    Users, 
    Plug, 
    BookOpen, 
    CandlestickChart, 
    Wallet, 
    Building2, 
    CreditCard,
    Briefcase,
    Box,
    Banknote,
    ArrowLeftRight,
    Lock,
    LineChart,
    Building,
    FileText,
    Share2,
    HelpCircle,
    Shield,
    ChevronRight,
    Info,
    UserPlus,
    Newspaper,
    MessageSquare,
    X,
    Check,
    ChevronLeft
} from "lucide-react";

// Custom Coinbase Icon component for the menu
const CoinbaseIcon = () => (
    <img src={coinbaseIcon} alt="" className="w-5 h-5 brightness-0" />
);

const languages = [
    { name: "English", region: "Global", checked: true },
    { name: "Español", region: "United States" },
    { name: "English", region: "United States" },
    { name: "Deutsch", region: "Germany" },
    { name: "English", region: "Germany" },
    { name: "English", region: "United Kingdom" },
    { name: "English", region: "France" },
    { name: "Français", region: "France" },
    { name: "English", region: "Canada" },
    { name: "Français", region: "Canada" },
    { name: "Español", region: "Spain" },
    { name: "English", region: "Spain" },
    { name: "Português", region: "Brazil" },
    { name: "English", region: "Brazil" },
    { name: "Português", region: "Portugal" },
    { name: "English", region: "Portugal" },
    { name: "English", region: "Australia" },
    { name: "English", region: "Singapore" },
    { name: "中文", region: "Singapore" },
    { name: "Italiano", region: "Italy" },
    { name: "English", region: "Italy" },
    { name: "Nederlands", region: "Netherlands" },
    { name: "English", region: "Netherlands" },
    { name: "Español", region: "Argentina" },
    { name: "English", region: "Argentina" },
    { name: "English", region: "India" },
    { name: "Español", region: "Mexico" },
    { name: "English", region: "Mexico" },
    { name: "Español - América Latina", region: "Global" },
    { name: "Français", region: "Global" },
    { name: "Polski", region: "Global" },
    { name: "Русский", region: "Global" },
    { name: "ไทย", region: "Global" },
    { name: "简体中文", region: "Global" },
    { name: "繁體中文", region: "Global" },
];

const menuData = {
    individuals: {
        columns: [
            [
                { title: "Individual", isHeader: true },
                { title: "Buy and sell", desc: "Buy, sell, and use crypto", icon: CoinbaseIcon },
                { title: "Base App", desc: "Post, earn, trade, and chat, all in one place", icon: LayoutGrid },
                { title: "Coinbase One", desc: "Get zero trading fees and more", icon: Percent },
                { title: "Private Client", desc: "For trusts, family offices, UHNWIs", icon: Users },
                { title: "Onchain", desc: "Dive into the world of onchain apps", icon: Plug },
                { title: "Learn", desc: "Crypto tips and guides", icon: BookOpen, path: "/learn" },
            ],
            [
                { title: "Advanced", isHeader: true, hasChevron: true },
                { title: "Advanced", desc: "Professional-grade trading tools", icon: CandlestickChart },
                { title: "Earn", desc: "Stake your crypto and earn rewards", icon: Percent },
                { title: "Coinbase Wealth", desc: "Institutional-grade services for UHNW", icon: Building2 },
                { title: "Credit Card", desc: "Earn up to 4% bitcoin back", icon: CreditCard },
                { title: "Debit Card", desc: "Spend crypto, get crypto back", icon: Wallet },
            ],
        ],
        promo: {
            heading: "System Update 2025",
            text: "The next chapter of Coinbase. Live on X 12/17.",
            cta: "Learn more",
            image: navigationUpsell
        },
    },
    businesses: {
        columns: [
            [
                { title: "Business", isHeader: true },
                { title: "Business", desc: "Crypto trading and payments for startups and SMBs", icon: Briefcase },
                { title: "Asset Listings", desc: "List your asset on Coinbase", icon: Box, path: "asset-details" },
            ],
            [
                { title: "Commerce", isHeader: true },
                { title: "Payments", desc: "The stablecoin payments stack for commerce platforms", icon: Banknote },
                { title: "Token Manager", desc: "The platform for token distributions, vesting, and lockups", icon: ArrowLeftRight },
            ],
        ],
        promo: {
            heading: "Commerce Payments Protocol",
            text: "A new standard for onchain payments.",
            cta: "Go to Payments",
            image: businessUpsell
        },
    },
    institutions: {
        columns: [
            [
                { title: "Prime", isHeader: true, hasChevron: true },
                { title: "Trading and Financing", desc: "Professional prime brokerage services", icon: CandlestickChart },
                { title: "Custody", desc: "Securely store all your digital assets", icon: Lock },
                { title: "Staking", desc: "Explore staking across our products", icon: Percent },
                { title: "Onchain Wallet", desc: "Institutional-grade wallet to get onchain", icon: Wallet },
            ],
            [
                { title: "Markets", isHeader: true },
                { title: "Exchange", desc: "Spot markets for high-frequency trading", icon: ArrowLeftRight },
                { title: "International Exchange", desc: "Access perpetual futures markets", icon: Globe },
                { title: "Derivatives Exchange", desc: "Trade an accessible futures market", icon: LineChart },
                { title: "Verified Pools", desc: "Transparent, verified liquidity pools", icon: Box },
            ],
        ],
        promo: {
            heading: "Institutional Grade",
            text: "Trusted by the world's largest institutions.",
            cta: "Explore Solutions",
            image: institutionsUpsell
        },
    },
    developers: {
        columns: [
            [
                { title: "Coinbase Developer Platform", isHeader: true, hasChevron: true },
                { title: "Payments", desc: "Fast and global stablecoin payments with a single integration", icon: Banknote },
                { title: "Trading", desc: "Launch crypto trading and custody for your users", icon: CandlestickChart },
                { title: "Wallets", desc: "Deploy customizable and scalable wallets for your business", icon: Wallet },
                { title: "Stablecoins", desc: "Access USDC and Coinbase Custom Stablecoins", icon: Coins },
            ],
            [
                { title: "Solutions for any company", isHeader: true },
                { title: "Banks & Brokerages", desc: "Secure, regulated offerings for retail, private banking, & institutional clients", icon: Building },
                { title: "Payment Firms", desc: "Near-instant, low-cost, global payment rails for modern providers", icon: CreditCard },
                { title: "Startups", desc: "Launch your business with the world's leader in crypto", icon: LayoutGrid },
            ],
        ],
        promo: {
            heading: "Build the Future",
            text: "World class crypto infrastructure at your fingertips.",
            cta: "View Docs",
            image: developersUpsell
        },
    },
    company: {
        columns: [
            [
                { title: "About", desc: "Powering the crypto economy", icon: Info },
                { title: "Affiliates", desc: "Help introduce the world to crypto", icon: UserPlus },
                { title: "Blog", desc: "Read the latest from Coinbase", icon: Newspaper },
            ],
            [
                { title: "Careers", desc: "Work with us", icon: Briefcase },
                { title: "Support", desc: "Find answers to your questions", icon: MessageSquare },
                { title: "Security", desc: "The most trusted & secure", icon: Shield },
            ],
        ],
        promo: {
            heading: "Our Mission",
            text: "We're building the open financial system for the world.",
            cta: "Join Us",
            image: companyUpsell
        },
    },
};

function MegaMenu({ menu }) {
    if (!menu) return null;

    return (
        <div className="absolute left-0 top-full z-50 w-full border-t border-gray-100 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="mx-auto grid max-w-[1240px] gap-8 px-8 py-10 lg:grid-cols-[1fr_1fr_1.5fr]">
                {menu.columns.map((column, colIndex) => (
                    <div key={colIndex} className="space-y-1">
                        {column.map((item, idx) => {
                            if (item.isHeader) {
                                return (
                                    <div key={idx} className="flex items-center gap-2 px-3 py-4 mb-2">
                                        <span className="text-xl font-bold text-black">{item.title}</span>
                                        {item.hasChevron && <ChevronRight size={20} className="mt-1" />}
                                    </div>
                                );
                            }

                            const Icon = item.icon;
                            return (
                                <Link
                                    key={idx}
                                    to={item.path || "#"}
                                    className="flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-gray-50 group"
                                >
                                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gray-100 text-gray-900 transition-colors group-hover:bg-gray-200">
                                        {Icon && <Icon size={20} />}
                                    </div>

                                    <div>
                                        <p className="text-[15px] font-bold text-gray-900 leading-tight">
                                            {item.title}
                                        </p>
                                        {item.desc && <p className="mt-1 text-[13px] text-gray-500 leading-snug">{item.desc}</p>}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ))}

                <div className="flex flex-row items-start gap-6 border-l border-gray-100 pl-10">
                    <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-[24px]">
                        {menu.promo.image ? (
                            <img 
                                src={menu.promo.image} 
                                alt="" 
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-blue-600 text-white">
                                <Search size={48} strokeWidth={1} />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5 pt-1">
                        <h3 className="text-[24px] font-bold text-gray-900 tracking-tight leading-tight">
                            {menu.promo.heading}
                        </h3>
                        <p className="text-[22px] font-normal text-gray-500 leading-tight">
                            {menu.promo.text}
                        </p>
                        <Link
                            to="#"
                            className="mt-4 w-fit text-xl font-bold text-black border-b-2 border-black hover:border-gray-500 hover:text-gray-700 transition-all font-inter"
                        >
                            {menu.promo.cta}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [languageSearchQuery, setLanguageSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("English-Global");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }
            try {
                await axios.get('/api/auth/profile', { 
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();

        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav 
            className={`w-full border-b border-gray-100 bg-white sticky top-0 z-50 transition-all duration-300 ${
                isScrolled ? "shadow-md bg-white/95 backdrop-blur-md h-16" : "h-20"
            }`}
            onMouseLeave={() => setActiveMenu(null)}
        >

            <div className="w-full px-10 h-full flex items-center justify-between">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-12">

                    {/* Logo */}
                    <Link to="/">
                        <img src={logo} alt="Coinbase" className="h-10" />
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex items-center gap-4 text-base font-bold text-gray-800 transition-opacity duration-300">

                        <Link 
                            to="/explore" 
                            className="px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
                            onMouseEnter={() => setActiveMenu(null)}
                        >
                            Cryptocurrencies
                        </Link>

                        {Object.keys(menuData).map((key) => (
                            <Link 
                                key={key}
                                to="#" 
                                className={`px-4 py-2 rounded-full transition-colors ${
                                    activeMenu === key ? "bg-gray-100 text-black" : "hover:bg-gray-50"
                                }`}
                                onMouseEnter={() => setActiveMenu(key)}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Link>
                        ))}

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">

                    {/* Search */}
                    <div className="relative">
                        {!activeMenu && !isScrolled ? (
                            // Simple button when not expanded
                            <button 
                                onClick={() => setActiveMenu('search')}
                                className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                                <Search size={20} />
                            </button>
                        ) : activeMenu === 'search' ? (
                            // Expanded Input + Dropdown
                            <div className="relative z-[60]">
                                <div className="flex items-center w-[360px] h-11 rounded-full border border-blue-600 bg-white px-4 ring-1 ring-blue-600 shadow-sm">
                                    <Search size={20} className="text-blue-600" />
                                    <input 
                                        type="text" 
                                        placeholder="Search" 
                                        className="ml-3 flex-1 bg-transparent text-base outline-none"
                                        autoFocus
                                    />
                                </div>
                                
                                {/* Dropdown Panel */}
                                <div className="absolute right-0 top-[calc(100%+8px)] w-[460px] rounded-[16px] bg-white pt-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden">
                                    {/* Tabs (Fixed) */}
                                    <div className="flex items-center gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
                                        <button className="rounded-full bg-[#1a1b1c] px-4 py-1.5 text-[14px] font-bold text-white">Top</button>
                                        <button className="rounded-full bg-gray-100 px-4 py-1.5 text-[14px] font-bold text-[#0a0b0d] hover:bg-gray-200">Crypto</button>
                                        <button className="rounded-full bg-gray-100 px-4 py-1.5 text-[14px] font-bold text-[#0a0b0d] hover:bg-gray-200">Stocks</button>
                                        <button className="rounded-full bg-gray-100 px-4 py-1.5 text-[14px] font-bold text-[#0a0b0d] hover:bg-gray-200">Predictions</button>
                                        <button className="rounded-full bg-gray-100 px-4 py-1.5 text-[14px] font-bold text-[#0a0b0d] hover:bg-gray-200">Perpetuals</button>
                                        <button className="rounded-full bg-gray-100 px-4 py-1.5 text-[14px] font-bold text-[#0a0b0d] hover:bg-gray-200">Futures</button>
                                    </div>
                                    
                                    <div className="h-px w-full bg-gray-100" />

                                    {/* Scrollable Content */}
                                    <div className="max-h-[380px] overflow-y-auto pb-4 px-2 custom-scrollbar">
                                        
                                        {/* Crypto Section */}
                                        <div className="mt-4 px-2">
                                            <h4 className="text-[12px] font-bold text-[#5b616e] mb-2 uppercase tracking-wider">Crypto</h4>
                                            <div className="flex flex-col gap-1">
                                                {/* Bitcoin */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7931a] text-white font-bold">₿</div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-[15px] text-gray-900">Bitcoin</span>
                                                                <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[11px] font-bold text-gray-500">#1</span>
                                                            </div>
                                                            <span className="text-[13px] text-gray-500">BTC</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[13px] text-gray-900">GHS 38.3B vol</span>
                                                            <span className="text-[13px] text-gray-500">GHS 1.6T mcap</span>
                                                        </div>
                                                        <div className="flex flex-col items-end min-w-[100px]">
                                                            <span className="text-[15px] text-gray-900">GHS 78,303.53</span>
                                                            <span className="text-[13px] font-medium text-green-600">↗ 2.22%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Ethereum */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#627eea] text-white font-bold">Ξ</div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-[15px] text-gray-900">Ethereum</span>
                                                                <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[11px] font-bold text-gray-500">#2</span>
                                                            </div>
                                                            <span className="text-[13px] text-gray-500">ETH</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[13px] text-gray-900">GHS 13B vol</span>
                                                            <span className="text-[13px] text-gray-500">GHS 277.4B mcap</span>
                                                        </div>
                                                        <div className="flex flex-col items-end min-w-[100px]">
                                                            <span className="text-[15px] text-gray-900">GHS 2,296.71</span>
                                                            <span className="text-[13px] font-medium text-green-600">↗ 1.44%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Tether */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#26a17b] text-white font-bold">₮</div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-[15px] text-gray-900">Tether</span>
                                                                <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[11px] font-bold text-gray-500">#3</span>
                                                            </div>
                                                            <span className="text-[13px] text-gray-500">USDT</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[13px] text-gray-900">GHS 118B vol</span>
                                                            <span className="text-[13px] text-gray-500">GHS 189.6B mcap</span>
                                                        </div>
                                                        <div className="flex flex-col items-end min-w-[100px]">
                                                            <span className="text-[15px] text-gray-900">GHS 1.00</span>
                                                            <span className="text-[13px] font-medium text-green-600">↗ 0.04%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stocks Section */}
                                        <div className="mt-6 px-2">
                                            <h4 className="text-[12px] font-bold text-[#5b616e] mb-2 uppercase tracking-wider">Stocks</h4>
                                            <div className="flex flex-col gap-1">
                                                {/* NVIDIA */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-blue-600 bg-blue-50">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-[15px] text-gray-900">NVIDIA</div>
                                                            <span className="text-[13px] text-gray-500">NVDA</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[13px] text-gray-900">GHS 129M vol</span>
                                                            <span className="text-[13px] text-gray-500">GHS 4.8T mcap</span>
                                                        </div>
                                                        <div className="flex flex-col items-end min-w-[100px]">
                                                            <span className="text-[15px] text-gray-900">GHS 198.12</span>
                                                            <span className="text-[13px] font-medium text-red-600">↘ 1.50%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Alphabet Class A */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-blue-600 bg-blue-50">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-[15px] text-gray-900">Alphabet Inc. Class A</div>
                                                            <span className="text-[13px] text-gray-500">GOOGL</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[13px] text-gray-900">GHS 30.3M vol</span>
                                                            <span className="text-[13px] text-gray-500">GHS 4.7T mcap</span>
                                                        </div>
                                                        <div className="flex flex-col items-end min-w-[100px]">
                                                            <span className="text-[15px] text-gray-900">GHS 385.34</span>
                                                            <span className="text-[13px] font-medium text-red-600">↘ 0.67%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Alphabet Class C */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-blue-600 bg-blue-50">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-[15px] text-gray-900">Alphabet Inc. Class C</div>
                                                            <span className="text-[13px] text-gray-500">GOOG</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[13px] text-gray-900">GHS 28.2M vol</span>
                                                            <span className="text-[13px] text-gray-500">GHS 4.6T mcap</span>
                                                        </div>
                                                        <div className="flex flex-col items-end min-w-[100px]">
                                                            <span className="text-[15px] text-gray-900">GHS 382.40</span>
                                                            <span className="text-[13px] font-medium text-red-600">↘ 0.64%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Predictions Section */}
                                        <div className="mt-6 px-2">
                                            <h4 className="text-[12px] font-bold text-[#5b616e] mb-2 uppercase tracking-wider">Predictions</h4>
                                            <div className="flex flex-col gap-1">
                                                {/* Basketball 1 */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-800 text-yellow-500 overflow-hidden">
                                                            <span className="text-[10px]">🏆</span>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-[15px] text-gray-900">Pro Basketball Champion</div>
                                                            <span className="text-[13px] text-gray-500">Oklahoma City</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end min-w-[60px]">
                                                            <span className="text-[15px] text-gray-900">56%</span>
                                                            <span className="text-[13px] font-medium text-green-600">↗ 1</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Basketball 2 */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-200 text-orange-600 overflow-hidden">
                                                            <span className="text-[10px]">🏀</span>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-[15px] text-gray-900">Eastern Conference Champion</div>
                                                            <span className="text-[13px] text-gray-500">Boston</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end min-w-[60px]">
                                                            <span className="text-[15px] text-gray-900">31%</span>
                                                            <span className="text-[13px] font-medium text-red-600">↘ 5</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Basketball 3 */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-500 overflow-hidden border border-gray-200">
                                                            <span className="text-[14px]">🌐</span>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-[15px] text-gray-900">Game 6: Cleveland at Toronto</div>
                                                            <span className="text-[13px] text-gray-500">Cleveland</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end min-w-[60px]">
                                                            <span className="text-[15px] text-gray-900">59%</span>
                                                            <span className="text-[13px] font-medium text-red-600">↘ 3</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Perpetuals Section */}
                                        <div className="mt-6 px-2">
                                            <h4 className="text-[12px] font-bold text-[#5b616e] mb-2 uppercase tracking-wider">Perpetuals</h4>
                                            <div className="flex flex-col gap-1">
                                                {/* BTC PERP */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7931a] text-white font-bold">₿</div>
                                                        <div>
                                                            <div className="font-bold text-[15px] text-gray-900">BTC PERP</div>
                                                            <span className="text-[13px] text-gray-500">CDE</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[13px] text-gray-900">GHS 401.9M vol</span>
                                                            <span className="text-[13px] text-gray-500">0.0001% fund</span>
                                                        </div>
                                                        <div className="flex flex-col items-end min-w-[100px]">
                                                            <span className="text-[15px] text-gray-900">GHS 78,305.00</span>
                                                            <span className="text-[13px] font-medium text-green-600">↗ 2.19%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* ETH PERP */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#627eea] text-white font-bold">Ξ</div>
                                                        <div>
                                                            <div className="font-bold text-[15px] text-gray-900">ETH PERP</div>
                                                            <span className="text-[13px] text-gray-500">CDE</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[13px] text-gray-900">GHS 81.4M vol</span>
                                                            <span className="text-[13px] text-gray-500">0.0009% fund</span>
                                                        </div>
                                                        <div className="flex flex-col items-end min-w-[100px]">
                                                            <span className="text-[15px] text-gray-900">GHS 2,297.50</span>
                                                            <span className="text-[13px] font-medium text-green-600">↗ 1.43%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* SOL PERP */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white font-bold text-[10px]">S</div>
                                                        <div>
                                                            <div className="font-bold text-[15px] text-gray-900">SOL PERP</div>
                                                            <span className="text-[13px] text-gray-500">CDE</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[13px] text-gray-900">GHS 22M vol</span>
                                                            <span className="text-[13px] text-gray-500">-0.0008% fund</span>
                                                        </div>
                                                        <div className="flex flex-col items-end min-w-[100px]">
                                                            <span className="text-[15px] text-gray-900">GHS 83.96</span>
                                                            <span className="text-[13px] font-medium text-green-600">↗ 0.51%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Futures Section */}
                                        <div className="mt-6 px-2 mb-2">
                                            <h4 className="text-[12px] font-bold text-[#5b616e] mb-2 uppercase tracking-wider">Futures</h4>
                                            <div className="flex flex-col gap-1">
                                                {/* SLVR Futures */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold">Ag</div>
                                                        <div>
                                                            <div className="font-bold text-[15px] text-gray-900">SLVR Futures</div>
                                                            <span className="text-[13px] text-gray-500">Jun 2026 • CDE</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[13px] text-gray-900">GHS 128.5M vol</span>
                                                            <span className="text-[13px] text-gray-500">GHS 4.9K oi</span>
                                                        </div>
                                                        <div className="flex flex-col items-end min-w-[100px]">
                                                            <span className="text-[15px] text-gray-900">GHS 75.92</span>
                                                            <span className="text-[13px] font-medium text-green-600">↗ 1.13%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* GLD Futures */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white font-bold">Au</div>
                                                        <div>
                                                            <div className="font-bold text-[15px] text-gray-900">GLD Futures</div>
                                                            <span className="text-[13px] text-gray-500">May 2026 • CDE</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[13px] text-gray-900">GHS 98M vol</span>
                                                            <span className="text-[13px] text-gray-500">GHS 6.8K oi</span>
                                                        </div>
                                                        <div className="flex flex-col items-end min-w-[100px]">
                                                            <span className="text-[15px] text-gray-900">GHS 4,620.50</span>
                                                            <span className="text-[13px] font-medium text-red-600">↘ 0.54%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* BTC Futures */}
                                                <div className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7931a] text-white font-bold">₿</div>
                                                        <div>
                                                            <div className="font-bold text-[15px] text-gray-900">BTC Futures</div>
                                                            <span className="text-[13px] text-gray-500">May 2026 • CDE</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[13px] text-gray-900">GHS 74.2M vol</span>
                                                            <span className="text-[13px] text-gray-500">GHS 41.8K oi</span>
                                                        </div>
                                                        <div className="flex flex-col items-end min-w-[100px]">
                                                            <span className="text-[15px] text-gray-900">GHS 78,690.00</span>
                                                            <span className="text-[13px] font-medium text-green-600">↗ 2.29%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button 
                                onClick={() => setActiveMenu('search')}
                                className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                                <Search size={20} />
                            </button>
                        )}
                    </div>

                    {/* Globe */}
                    <button 
                        onClick={() => {
                            setShowLanguageMenu(!showLanguageMenu);
                            if (activeMenu) setActiveMenu(null);
                        }}
                        className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                        <Globe size={20} />
                    </button>

                    {/* Auth Buttons */}
                    {isAuthenticated ? (
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-2 whitespace-nowrap px-6 py-2.5 rounded-full bg-blue-600 text-white text-base font-bold hover:bg-blue-700 transition-all"
                        >
                            <LayoutGrid size={20} />
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            {/* Sign in */}
                            <Link
                                to="/signin"
                                className="whitespace-nowrap px-5 py-2.5 rounded-full bg-gray-100 text-base font-bold hover:bg-gray-200"
                            >
                                Sign in
                            </Link>

                            {/* Sign up */}
                            <Link
                                to="/signup"
                                className="whitespace-nowrap px-6 py-2.5 rounded-full bg-blue-600 text-white text-base font-bold hover:bg-blue-700 transition-all active:scale-95"
                            >
                                Sign up
                            </Link>
                        </>
                    )}

                    {/* Hamburger Menu (Mobile/Tablet) */}
                    <button 
                        onClick={() => {
                            if (showLanguageMenu) setShowLanguageMenu(false);
                        }}
                        className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 lg:hidden"
                    >
                        {showLanguageMenu ? (
                            <X size={20} />
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        )}
                    </button>
                    <button 
                        onClick={() => {
                            if (showLanguageMenu) setShowLanguageMenu(false);
                        }}
                        className="hidden lg:flex w-11 h-11 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                        {showLanguageMenu ? (
                            <X size={20} />
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        )}
                    </button>

                </div>
            </div>

            {activeMenu && !showLanguageMenu && <MegaMenu menu={menuData[activeMenu]} />}

            {/* Language Mega Menu Overlay */}
            {showLanguageMenu && (
                <div className="absolute left-0 top-full z-[60] w-full h-[calc(100vh-80px)] bg-white animate-in fade-in flex flex-col border-t border-gray-100">
                    <div className="flex items-center gap-4 px-6 lg:px-10 py-6 border-b border-gray-100">
                        <button 
                            onClick={() => setShowLanguageMenu(false)}
                            className="flex items-center justify-center hover:bg-gray-100 rounded-full w-8 h-8 -ml-2 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <h2 className="text-[18px] lg:text-[20px] font-bold text-gray-900">Language and region</h2>
                    </div>

                    <div className="px-6 lg:px-10 py-4">
                        <div className="flex items-center w-full h-12 rounded-full bg-gray-100 px-4 focus-within:ring-1 focus-within:ring-blue-600 focus-within:bg-white focus-within:border-blue-600 transition-all border border-transparent">
                            <Search size={20} className="text-gray-500" />
                            <input 
                                type="text" 
                                placeholder="Search" 
                                className="ml-3 flex-1 bg-transparent text-[15px] outline-none"
                                value={languageSearchQuery}
                                onChange={(e) => setLanguageSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-2 lg:px-6 custom-scrollbar pb-10">
                        {languages
                            .filter(lang => 
                                lang.name.toLowerCase().includes(languageSearchQuery.toLowerCase()) || 
                                lang.region.toLowerCase().includes(languageSearchQuery.toLowerCase())
                            )
                            .map((lang, idx) => {
                                const isSelected = selectedLanguage === `${lang.name}-${lang.region}`;
                                // Default fallback for the hardcoded checked item if we haven't touched it, though state overrides
                                const actuallySelected = selectedLanguage ? isSelected : lang.checked;
                                
                                return (
                                <div 
                                    key={idx} 
                                    onClick={() => {
                                        setSelectedLanguage(`${lang.name}-${lang.region}`);
                                        setShowLanguageMenu(false); // Close the menu when a language is selected
                                    }}
                                    className={`flex items-center justify-between px-4 py-3 mx-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors ${actuallySelected ? 'bg-gray-50' : ''}`}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-[15px] font-bold text-gray-900">{lang.name}</span>
                                        <span className="text-[14px] text-gray-500">{lang.region}</span>
                                    </div>
                                    {actuallySelected && (
                                        <Check size={20} className="text-[#00c853]" />
                                    )}
                                </div>
                            )})}
                    </div>
                </div>
            )}

        </nav>
    );
}

export default Navbar;