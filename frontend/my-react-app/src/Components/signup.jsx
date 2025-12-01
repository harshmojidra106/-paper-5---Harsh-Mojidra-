import { useState } from "react";

const Signup = ({ onBack }) => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, signuptype: "N" })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Signup successful!");
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
     <div className="text-4xl text-center mb-2.5"> Sign Up</div>
      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          className="w-full p-2 mb-2 border rounded"
          required
        />
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
        />
        <div>
        <button type="submit" className="w-54 bg-blue-500 text-white p-2 rounded">
          Sign Up
        </button>
         <button onClick={onBack} className="mb-4  ml-4 mt-1 bg-gray-500 text-white px-4 py-2 w-54 rounded">
        Back
      </button>
      </div>
      </form>
    </div>
  );
};
export default Signup;
