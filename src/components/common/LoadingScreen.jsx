import React from "react";
import coinbaseIcon from "../../assets/icons/coinbase-logo.svg";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
      <style>
        {`
          @keyframes subtle-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(0.95); opacity: 0.8; }
          }
          .animate-coinbase-load {
            animation: subtle-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}
      </style>
      <img
        src={coinbaseIcon}
        alt="Loading..."
        className="w-16 h-16 animate-coinbase-load"
      />
    </div>
  );
};

export default LoadingScreen;
