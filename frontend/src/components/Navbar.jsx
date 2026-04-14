import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Flipkart</span>
          <span className="logo-tagline">Explore <span className="logo-plus">Plus</span></span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>

        <div className="navbar-links">
          <Link to="/wishlist" className="nav-link">
            <span className="nav-icon">♡</span>
            <span>Wishlist</span>
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            <span className="nav-icon">🛒</span>
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link to="/orders" className="nav-link">
            <span className="nav-icon">📦</span>
            <span>Orders</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
