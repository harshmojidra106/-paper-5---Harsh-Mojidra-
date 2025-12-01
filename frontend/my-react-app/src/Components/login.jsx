import { useState } from "react";

const Login = ({ onBack, onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, signuptype: "N" })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        onLogin();
        onBack();
      } else {
        alert(data.msg);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-24">
      <div className="text-4xl text-center mb-2.5">Log in </div>
      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full p-2 mb-2 border rounded"
          required
        /><div>
        <button type="submit" className="w-52 bg-green-500 text-white p-2 rounded">
          Login
        </button>
         <button onClick={onBack} className="mb-4 bg-gray-500 ml-4 text-white w-52 px-4 py-2 rounded">
        Back
      </button>
        </div>
      </form>
    </div>
  );
};
export default Login;