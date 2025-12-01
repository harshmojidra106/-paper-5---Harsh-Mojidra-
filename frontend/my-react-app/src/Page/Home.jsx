import { useState, useEffect } from "react";
import Signup from "../Components/signup";
import Login from "../Components/login";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    fetch("http://localhost:3000/product/getallproduct")
      .then((res) => {
        console.log("🚀 ~ Home ~ res:", res)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const productsArray = Array.isArray(data) ? data : [];
        setProducts(productsArray);
        setFilteredProducts(productsArray);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.productname?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  if (showSignup) return <Signup onBack={() => setShowSignup(false)} />;
  if (showLogin) return <Login onBack={() => setShowLogin(false)} onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div className="p-4">
      <div className="relative mb-6">
        <div className="text-2xl font-bold text-center">Shop Now</div>
        {!isLoggedIn ? (
          <div className="absolute top-0 right-0 space-x-2">
            <button onClick={() => setShowLogin(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Login
            </button>
            <button onClick={() => setShowSignup(true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Sign Up
            </button>
          </div>
        ) : (
          <button onClick={() => { localStorage.removeItem("token"); setIsLoggedIn(false); }} className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        )}
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id || product._id || index}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-4"
          >
            <img
              src={product.image}
              alt={product.productname}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {product.productname}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {product.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-green-600">
                ₹{product.price || "0"}
              </span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
