import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icons/coinbase-logo.svg";
import { User, Briefcase, Code, Check } from "lucide-react";
import LoadingScreen from "../components/common/LoadingScreen";

function SignUpType() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("personal");
  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    return localStorage.getItem("cookieBannerDismissed") !== "true";
  });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectType = (id) => {
    setSelectedType(id);
    // Add a slight delay for visual feedback if needed, or navigate immediately
    setTimeout(() => {
      navigate("/signup/details", { state: { type: id } });
    }, 300);
  };

  const options = [
    {
      id: "personal",
      title: "Personal",
      description: "Trade crypto as an individual.",
      icon: <User size={24} className="text-blue-600" />,
    },
    {
      id: "business",
      title: "Business",
      description: "Manage teams and portfolios, accept crypto payments, access APIs, and more",
      icon: <Briefcase size={24} className="text-blue-600" />,
    },
    {
      id: "developer",
      title: "Developer",
      description: "Build onchain using developer tooling.",
      icon: <Code size={24} className="text-blue-600" />,
    },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-black relative pb-24">
      {/* Top Logo */}
      <div className="px-8 pt-8">
        <Link to="/">
          <img src={logo} alt="Coinbase" className="h-6 w-auto" />
        </Link>
      </div>

      {/* Main Content */}
      <div className="mx-auto flex max-w-[480px] flex-col items-center px-6 pt-20">
        <h1 className="text-center text-[30px] font-bold leading-tight tracking-tight text-[#0a0b0d]">
          What kind of account are you<br />creating?
        </h1>

        <div className="mt-10 flex w-full flex-col gap-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelectType(option.id)}
              className={`group flex items-center gap-6 rounded-[8px] border border-[#eceff1] p-5 text-left transition-all duration-200 ${
                selectedType === option.id
                  ? "shadow-[0_2px_12px_rgba(0,0,0,0.04)] bg-white"
                  : "bg-white hover:bg-[#f4f7f9]"
              }`}
            >
              {/* Icon Container */}
              <div className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-md bg-[#f4f7f9]">
                {option.icon}
                {selectedType === option.id && (
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center bg-[#0a0b0d] text-white">
                    <Check size={14} strokeWidth={4} />
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <h3 className="text-[17px] font-bold text-[#0a0b0d]">{option.title}</h3>
                <p className="mt-1 text-[14px] leading-[1.4] text-[#5b616e]">
                  {option.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cookie Policy Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#f2f4f7] px-6 py-4 flex flex-col md:flex-row items-center justify-center gap-6 z-50">
          <p className="text-[14px] text-[#0a0b0d] max-w-[800px] text-center md:text-left">
            We use strictly necessary cookies to enable essential functions, such as security and authentication. For more information, see our <a href="#" className="text-[#1652f0] hover:underline">Cookie Policy</a>.
          </p>
          <button 
            onClick={() => {
              setShowCookieBanner(false);
              localStorage.setItem("cookieBannerDismissed", "true");
            }}
            className="whitespace-nowrap rounded-full bg-[#1652f0] px-6 py-2.5 text-[15px] font-bold text-white hover:bg-[#1448d8]"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

export default SignUpType;
