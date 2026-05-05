import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthSocialButtons from "../components/auth/AuthSocialButtons";
import Button from "../components/ui/Button";

function SignUp() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(location.state?.prefilledEmail || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      }, {
        withCredentials: true // Important for cookies
      });

      if (response.status === 201) {
        if (response.data.token) {
          sessionStorage.setItem('token', response.data.token);
        }
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during registration");
    }
  };

  return (
    <AuthLayout 
      title="Create your account" 
      description="Access all that Coinbase has to offer with a single account."
    >
      <form onSubmit={handleSubmit}>
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-center text-[13px] text-amber-700 font-medium">
          ⚠️ Demo app – do not use your real password
        </div>
        {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
        <AuthInput 
          label="Name"
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <Button type="submit" variant="primary" size="auth" className="mt-7 bg-[#86a7eb]">
          Create Account
        </Button>
      </form>

      {/* OR */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#e5e7eb]" />
        <span className="text-[14px] text-[#6b7280]">OR</span>
        <div className="h-px flex-1 bg-[#e5e7eb]" />
      </div>

      <AuthSocialButtons mode="signup" />

      {/* Sign in link */}
      <p className="mt-8 text-center text-[16px] font-semibold text-black">
        Already have an account?{" "}
        <Link to="/signin" className="text-[#1652f0]">
          Sign in
        </Link>
      </p>

      {/* Footer text */}
      <p className="mx-auto mt-8 max-w-[380px] text-center text-[14px] leading-[1.45] text-[#6b7280]">
        By creating an account you certify that you are over the
        age of 18 and agree to our{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Cookie Policy
        </a>
        .
      </p>
    </AuthLayout>
  );
}

export default SignUp;
