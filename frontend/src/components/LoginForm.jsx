import React, { useState } from "react";
import LoginLeftSide from "./LoginLeftSide";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Loader2Icon } from "lucide-react";

const LoginForm = ({ role, title, subtitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      
      <LoginLeftSide />

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-10">
        
        {/* Back */}
        <div className="w-full max-w-md mb-6">
          <Link
            to="/login"
            className="flex items-center text-gray-500 hover:text-black"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to portals
          </Link>
        </div>

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
          
          <div className="mb-6 text-left">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-gray-500 text-sm">{subtitle}</p>
          </div>

          {error && <div className="text-red-500 mb-3">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password with Eye */}
            <div className="relative">
              <label className="block text-sm mb-1">Password</label>
              
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
              disabled= {loading}
            >
              {loading && <Loader2Icon className="animate-spin h-4 w-4 mr-2 "/>}
              Sign in
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;