import React, { useState } from "react";
import axios from "../utils/api"; // Import Axios instance
import { Mail, Lock, Loader2 } from "lucide-react";

interface AuthFormProps {
  mode: "signin" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = mode === "signup" ? "/auth/signup" : "/auth/signin";
      const response = await axios.post(endpoint, { email, password });

      // Store token or navigate
      console.log("Success:", response.data);
      localStorage.setItem("token", response.data.token);
      alert(`${mode === "signup" ? "Signed up" : "Signed in"} successfully!`);
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center rounded-lg px-4 py-2 text-white font-medium ${
          loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
        } transition-colors duration-200`}
      >
        {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : null}
        {loading ? (mode === "signup" ? "Signing up..." : "Signing in...") : mode === "signup" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
}
