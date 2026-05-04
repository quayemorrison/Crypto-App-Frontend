import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Settings, Shield, Bell, Key, LogOut } from "lucide-react";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/auth/profile", {
          withCredentials: true
        });
        setUser(response.data);
      } catch (err) {
        setError("Not authorized or session expired. Please log in.");
        setTimeout(() => navigate("/signin"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("cookieBannerDismissed");
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) return <div className="p-8 text-center min-h-screen bg-white">Loading profile...</div>;

  if (error) return <div className="p-8 text-center text-red-500 min-h-screen bg-white">{error}</div>;

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#0a0b0d] font-sans">
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <h1 className="text-[32px] font-bold mb-8 tracking-tight">Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <div className="w-full md:w-[280px] shrink-0">
            <nav className="flex flex-col gap-1">
              <Link to="#" className="flex items-center gap-3 rounded-lg bg-gray-200 px-4 py-3 text-[16px] font-semibold text-black">
                <User size={20} />
                Profile
              </Link>
              <Link to="#" className="flex items-center gap-3 rounded-lg px-4 py-3 text-[16px] font-semibold text-gray-500 hover:bg-gray-100">
                <Settings size={20} />
                Preferences
              </Link>
              <Link to="#" className="flex items-center gap-3 rounded-lg px-4 py-3 text-[16px] font-semibold text-gray-500 hover:bg-gray-100">
                <Shield size={20} />
                Security
              </Link>
              <Link to="#" className="flex items-center gap-3 rounded-lg px-4 py-3 text-[16px] font-semibold text-gray-500 hover:bg-gray-100">
                <Bell size={20} />
                Notifications
              </Link>
              <Link to="#" className="flex items-center gap-3 rounded-lg px-4 py-3 text-[16px] font-semibold text-gray-500 hover:bg-gray-100">
                <Key size={20} />
                API
              </Link>
              <button 
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-[16px] font-semibold text-red-500 hover:bg-red-50"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="rounded-[12px] border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="text-[20px] font-bold mb-6">Personal details</h2>
              
              <div className="flex flex-col gap-8">
                {/* Name */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6">
                  <div className="w-full md:w-1/3">
                    <span className="text-[16px] font-semibold text-gray-500">Legal Name</span>
                  </div>
                  <div className="w-full md:w-2/3 flex justify-between items-center mt-2 md:mt-0">
                    <span className="text-[16px] font-medium">{user.name}</span>
                    <button className="text-[15px] font-semibold text-blue-600 hover:text-blue-700">Change</button>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6">
                  <div className="w-full md:w-1/3">
                    <span className="text-[16px] font-semibold text-gray-500">Email Address</span>
                  </div>
                  <div className="w-full md:w-2/3 flex justify-between items-center mt-2 md:mt-0">
                    <span className="text-[16px] font-medium">{user.email}</span>
                    <button className="text-[15px] font-semibold text-blue-600 hover:text-blue-700">Change</button>
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-2">
                  <div className="w-full md:w-1/3">
                    <span className="text-[16px] font-semibold text-gray-500">Password</span>
                  </div>
                  <div className="w-full md:w-2/3 flex justify-between items-center mt-2 md:mt-0">
                    <span className="text-[16px] text-gray-400">••••••••</span>
                    <button className="text-[15px] font-semibold text-blue-600 hover:text-blue-700">Change</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[12px] border border-gray-200 bg-white p-8 shadow-sm mt-6">
               <h2 className="text-[20px] font-bold mb-6">Account actions</h2>
               <div className="flex justify-between items-center">
                 <div>
                   <h3 className="font-semibold text-red-600">Close Account</h3>
                   <p className="text-sm text-gray-500 mt-1">Permanently close your Coinbase account</p>
                 </div>
                 <button className="px-4 py-2 rounded-full border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors">
                   Close account
                 </button>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
