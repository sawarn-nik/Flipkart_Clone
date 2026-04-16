import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./MobileBottomNav.css";

const MobileBottomNav = () => {
  const location = useLocation();
  const { cartCount } = useCart();

  return (
    <nav className="mobile-bottom-nav">
      <Link to="/" className={location.pathname === "/" && !location.search ? "active-tab" : ""}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
          <path d="M9 21V12h6v9"/>
        </svg>
        Home
      </Link>
      <Link to="/?category=Electronics" className={location.search.includes("category") ? "active-tab" : ""}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
        Categories
      </Link>
      <Link to="/account" className={location.pathname === "/account" ? "active-tab" : ""}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
        Account
      </Link>
      <Link to="/cart" className={location.pathname === "/cart" ? "active-tab" : ""}>
        <span className="mob-cart-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {cartCount > 0 && <span className="mob-cart-badge">{cartCount}</span>}
        </span>
        Cart
      </Link>
    </nav>
  );
};

export default MobileBottomNav;
