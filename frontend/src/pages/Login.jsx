import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login button clicked!");

    try {
      const response = await api.post("auth/login/", {
        email,
        password,
      });

      console.log(response.data);

      login(response.data.data.access);

      alert("Login Successful!");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* FORM STARTS HERE */}
        <form onSubmit={handleSubmit}>

          <h1 className="text-3xl font-bold text-center mb-6">
            Welcome Back
          </h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3 mb-6"
          />

          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-lg
              hover:bg-blue-700
            "
          >
            Login
          </button>

        </form>
        {/* FORM ENDS HERE */}

      </div>
    </div>
  );
}