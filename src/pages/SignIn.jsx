import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../components/common/LoadingScreen";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthSocialButtons from "../components/auth/AuthSocialButtons";
import Button from "../components/ui/Button";

function SignIn() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      }, {
        withCredentials: true
      });

      if (response.status === 200) {
        if (response.data.token) {
          sessionStorage.setItem('token', response.data.token);
        }
        navigate("/profile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthLayout title="Sign in to Coinbase">
      <form onSubmit={handleSubmit}>
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-center text-[13px] text-amber-700 font-medium">
          ⚠️ Demo app – do not use your real password
        </div>
        {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
        <AuthInput 
          label="Email"
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthInput 
          label="Password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" variant="primary" size="auth" className="mt-5 bg-[#86a7eb]">
          Continue
        </Button>
      </form>

      {/* OR */}
      <div className="my-5 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#e5e7eb]" />
        <span className="text-[14px] text-[#6b7280]">OR</span>
        <div className="h-px flex-1 bg-[#e5e7eb]" />
      </div>

      <AuthSocialButtons mode="signin" />

      {/* Signup link */}
      <p className="mt-10 text-center text-[16px] font-semibold text-black">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-[#1652f0]">
          Sign up
        </Link>
      </p>

      {/* Footer text */}
      <p className="mx-auto mt-10 max-w-[320px] text-center text-[14px] leading-[1.45] text-[#6b7280]">
        Not your device? Use a private window. See{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>{" "}
        for more info.
      </p>
    </AuthLayout>
  );
}

export default SignIn;
