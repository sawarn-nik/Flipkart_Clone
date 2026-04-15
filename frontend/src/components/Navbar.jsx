import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const BASE = "https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav";

const categories = [
  { name: "For You",     short: "For You",      icon: `${BASE}/all.svg` },
  { name: "Fashion",     short: "Fashion",      icon: `${BASE}/fashion.svg` },
  { name: "Mobiles",     short: "Mobiles",      icon: `${BASE}/mobiles.svg` },
  { name: "Beauty",      short: "Beauty",       icon: `${BASE}/beauty.svg` },
  { name: "Electronics", short: "Electronics",  icon: `${BASE}/just-headphones.svg` },
  { name: "Home",        short: "Home",         icon: `${BASE}/tv.svg` },
  { name: "Appliances",  short: "Appliances",   icon: `${BASE}/tv.svg` },
  { name: "Toys",        short: "Toys, ba...",  icon: `${BASE}/toy.svg` },
  { name: "Food",        short: "Food & H...",  icon: `${BASE}/food.svg` },
  { name: "Auto",        short: "Auto Acc...",  icon: `${BASE}/all.svg` },
  { name: "2 Wheelers",  short: "2 Wheele...",  icon: `${BASE}/all.svg` },
  { name: "Sports",      short: "Sports & ...", icon: `${BASE}/sport.svg` },
  { name: "Books",       short: "Books & ...",  icon: `${BASE}/books.svg` },
  { name: "Furniture",   short: "Furniture",    icon: `${BASE}/tv.svg` },
];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("For You");
  const [loginHover, setLoginHover] = useState(false);
  const [moreHover, setMoreHover] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const catRefs = useRef({});
  const navInnerRef = useRef(null);

  // Hide category row on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Move indicator to the active button
  useEffect(() => {
    const btn = catRefs.current[activeCategory];
    const nav = navInnerRef.current;
    if (btn && nav) {
      const btnRect = btn.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - navRect.left + nav.scrollLeft,
        width: btnRect.width,
      });
    }
  }, [activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(searchQuery.trim() ? `/?search=${encodeURIComponent(searchQuery.trim())}` : "/");
  };

  return (
    <header className={`header${scrolled ? " header-scrolled" : ""}`}>

      {/* ── Row 1: Logo + Travel pill + Location + (empty flex) ── */}
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <Link to="/" className="logo-pill">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/26/22/image/d2ecfddf891a3922.png?q=80"
                srcSet="https://rukminim2.flixcart.com/fk-p-flap/52/44/image/d2ecfddf891a3922.png?q=90 2x"
                alt="f"
                width="26"
                height="22"
              />
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/92/36/image/31f7e3af490c225f.png?q=90"
                alt="Flipkart"
                width="72"
                height="28"
              />
            </Link>
            <button className="travel-pill">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/29/22/image/7ab4040af860941d.png?q=80"
                alt="travel icon"
                width="29"
                height="22"
              />
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/72/36/image/5a9ff48eef96b876.png?q=60"
                alt="Travel"
                width="56"
                height="28"
              />
            </button>

            <button className="travel-pill">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/56/44/image/b78217404ce6fc1c.png?q=90"
                srcSet="https://rukminim2.flixcart.com/fk-p-flap/28/22/image/b78217404ce6fc1c.png?q=80 1x, https://rukminim2.flixcart.com/fk-p-flap/56/44/image/b78217404ce6fc1c.png?q=60 2x"
                alt="Grocery"
                width="28"
                height="22"
              />
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/96/36/image/29d70af2af1d6f47.png?q=60"
                srcSet="https://rukminim2.flixcart.com/fk-p-flap/48/18/image/29d70af2af1d6f47.png?q=80 1x, https://rukminim2.flixcart.com/fk-p-flap/96/36/image/29d70af2af1d6f47.png?q=60 2x"
                alt="Grocery"
                width="56"
                height="22"
              />
            </button>
          </div>
          <div className="topbar-right">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#555"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
            <span className="location-text">Location not set</span>
            <a href="#" className="location-link">Select delivery location ›</a>
          </div>
        </div>
      </div>

      {/* ── Row 2: Search + Login + More + Cart ── */}
      <div className="navbar">
        <div className="navbar-container">
          <form className="navbar-search" onSubmit={handleSearch}>
            <svg className="search-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#2874f0" strokeWidth="2"/>
              <line x1="16.5" y1="16.5" x2="22" y2="22" stroke="#2874f0" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="navbar-links">
            <div
              className="login-wrapper"
              onMouseEnter={() => setLoginHover(true)}
              onMouseLeave={() => setLoginHover(false)}
            >
              <button className="nav-btn login-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="#555" strokeWidth="1.8"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <span>Login</span>
                <span className="chevron">⌄</span>
              </button>

              {loginHover && (
                <div className="login-dropdown">
                  <div className="login-dropdown-top">
                    <span className="new-customer">New customer?</span>
                    <Link to="/orders" className="signup-link">Sign Up</Link>
                  </div>
                  <div className="login-dropdown-tag">Login</div>
                  <ul className="login-menu">
                    {[
                      { icon: "👤", label: "My Profile",               to: "/orders" },
                      { icon: "✦",  label: "Flipkart Plus Zone",        to: "/" },
                      { icon: "📦", label: "Orders",                    to: "/orders" },
                      { icon: "♡",  label: "Wishlist",                  to: "/wishlist" },
                      { icon: "🏪", label: "Become a Seller",           to: "/" },
                      { icon: "🎁", label: "Rewards",                   to: "/" },
                      { icon: "🎁", label: "Gift Cards",                to: "/" },
                      { icon: "🔔", label: "Notification Preferences",  to: "/" },
                      { icon: "🎧", label: "24x7 Customer Care",        to: "/" },
                      { icon: "📢", label: "Advertise",                 to: "/" },
                      { icon: "📲", label: "Download App",              to: "/" },
                    ].map(({ icon, label, to }) => (
                      <li key={label}>
                        <Link to={to} className="login-menu-item">
                          <span className="menu-icon">{icon}</span>
                          <span>{label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div
              className="login-wrapper"
              onMouseEnter={() => setMoreHover(true)}
              onMouseLeave={() => setMoreHover(false)}
            >
              <button className="nav-btn">
                <span>More</span>
                <span className="chevron">⌄</span>
              </button>

              {moreHover && (
                <div className="login-dropdown more-dropdown">
                  <div className="login-dropdown-tag">More</div>
                  <p className="more-title">More</p>
                  <ul className="login-menu">
                    {[
                      { icon: "🏪", label: "Become a Seller",        to: "/" },
                      { icon: "🔔", label: "Notification Settings",  to: "/" },
                      { icon: "🎧", label: "24x7 Customer Care",     to: "/" },
                      { icon: "📢", label: "Advertise on Flipkart",  to: "/" },
                    ].map(({ icon, label, to }) => (
                      <li key={label}>
                        <Link to={to} className="login-menu-item">
                          <span className="menu-icon">{icon}</span>
                          <span>{label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Link to="/cart" className="nav-btn cart-nav-btn">
              <span className="cart-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#555" strokeWidth="1.8" fill="none"/>
                  <line x1="3" y1="6" x2="21" y2="6" stroke="#555" strokeWidth="1.8"/>
                  <path d="M16 10a4 4 0 01-8 0" stroke="#555" strokeWidth="1.8"/>
                </svg>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </span>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Row 3: Category nav with SVG icons ── */}
      <nav className={`category-nav${scrolled ? " category-nav-hidden" : ""}`}>
        <div className="category-nav-inner" ref={navInnerRef}>
          {/* Sliding blue underline */}
          <span
            className="cat-slider"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />
          {categories.map(({ name, short, icon }) => (
            <button
              key={name}
              ref={(el) => (catRefs.current[name] = el)}
              className={`cat-item ${activeCategory === name ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(name);
                navigate(name === "For You" ? "/" : `/?category=${encodeURIComponent(name)}`);
              }}
            >
              <span className="cat-icon">
                <img src={icon} alt={name} width="28" height="28" />
              </span>
              <span className="cat-name">{short}</span>
            </button>
          ))}
        </div>
      </nav>

    </header>
  );
};

export default Navbar;
