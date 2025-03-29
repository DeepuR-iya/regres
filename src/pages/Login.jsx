import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }
    try {
      const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid username or password");
      }

      localStorage.setItem("token", data.token);
      setTimeout(() => navigate("/users"), 1500);
      toast.success("Login successful!");
    } catch (err) {
      err.message = "Invalid username or password";
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        className="bg-neutral-100 p-4 rounded-lg mb-4 md:w-1/4 h-68 flex flex-col items-center justify-evenly"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="w-56">
          <input
            className="border rounded-md p-2 my-2 rounded-md "
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-56">
          <input
            className="border p-2 my-2 rounded-md"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            className="z-20 relative right-6 top-0.5"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 border cursor-pointer rounded-md"
        >
          Login
        </button>
      </motion.div>
    </div>
  );
}
