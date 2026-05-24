"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Please fill all fields!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Firebase login
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      const { auth } = await import("../firebase.config");

      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      // JWT Token নেওয়া
      const tokenRes = await fetch("http://localhost:5000/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const tokenData = await tokenRes.json();
      localStorage.setItem("token", tokenData.token);

      // User profile save
      await fetch("http://localhost:5000/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName || form.email.split("@")[0],
          photo: user.photoURL || "",
        }),
      });

      setLoading(false);
      router.push("/");

    } catch (err) {
      setLoading(false);
      setError("Invalid email or password!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");
      const { auth } = await import("../firebase.config");

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // JWT Token
      const tokenRes = await fetch("http://localhost:5000/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const tokenData = await tokenRes.json();
      localStorage.setItem("token", tokenData.token);

      // User save
      await fetch("http://localhost:5000/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        }),
      });

      router.push("/");

    } catch (err) {
      setError("Google login failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center gap-2 my-2">
            <hr className="flex-1" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-1" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 font-semibold flex items-center justify-center gap-2"
          >
            🔵 Continue with Google
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline font-medium">
              Register
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;