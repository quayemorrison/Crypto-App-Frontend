import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/Hero__4_.png";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/signup", { state: { prefilledEmail: email } });
  };

  return (
    <section className="w-full px-10 pt-10 pb-20">
      <div className="mx-auto grid max-w-[1500px] items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left side */}
        <div className="flex justify-start">
          <div className="w-full max-w-[680px]">
            <img
              src={heroImage}
              alt="Coinbase hero"
              className="w-full rounded-[36px] object-contain"
            />
            <p className="mt-3 text-[13px] text-[#5b616e]">
              Stocks and prediction markets not available in your jurisdiction.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="max-w-[560px]">
          <h1 className="text-[72px] font-medium tracking-[-0.04em] leading-[1.02] text-black">
            The future of finance is here.
          </h1>

          <p className="mt-7 text-[22px] leading-[1.35] text-black">
            Trade crypto and more on a platform you can trust.
          </p>

          <form onSubmit={handleSignUp} className="mt-7 flex max-w-[620px] items-center gap-4">
            <input
              type="email"
              placeholder="satoshi@nakamoto.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[54px] flex-1 rounded-xl border border-[#cfd3d8] px-4 text-[18px] text-[#5b616e] outline-none"
            />

            <button 
              type="submit"
              className="flex items-center h-[54px] rounded-full bg-[#1652f0] px-9 text-[18px] font-semibold text-white hover:bg-[#1448d8] transition-colors"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
