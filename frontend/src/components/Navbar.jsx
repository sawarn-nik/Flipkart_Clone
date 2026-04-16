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
  { name: "Home",        short: "Home",         icon: `${BASE}/home-final.svg` },
  { name: "Appliances",  short: "Appliances",   icon: `${BASE}/tv.svg` },
  { name: "Toys",        short: "Toys, ba...",  icon: `${BASE}/toy.svg` },
  { name: "Food",        short: "Food & H...",  icon: `${BASE}/food.svg` },
  { name: "Auto",        short: "Auto Acc...",  icon: `${BASE}/auto-acc.svg` },
  { name: "Sports",      short: "Sports & ...", icon: `${BASE}/sport.svg` },
  { name: "Books",       short: "Books & ...",  icon: `${BASE}/books.svg` },
  { name: "Furniture",   short: "Furniture",    icon: `${BASE}/furniture.svg` },
];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("For You");
  const [loginHover, setLoginHover] = useState(false);
  const [moreHover, setMoreHover] = useState(false);
  const loginTimerRef = useRef(null);
  const moreTimerRef = useRef(null);

  const handleLoginEnter = () => { clearTimeout(loginTimerRef.current); setLoginHover(true); };
  const handleLoginLeave = () => { loginTimerRef.current = setTimeout(() => setLoginHover(false), 200); };
  const handleMoreEnter  = () => { clearTimeout(moreTimerRef.current); setMoreHover(true); };
  const handleMoreLeave  = () => { moreTimerRef.current = setTimeout(() => setMoreHover(false), 200); };
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [pincode, setPincode] = useState("");
  const [savedLocation, setSavedLocation] = useState(() => localStorage.getItem("userPincode") || "");
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const catRefs = useRef({});
  const navInnerRef = useRef(null);
  const pincodeRef = useRef(null);

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

  const handleSaveLocation = () => {
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      localStorage.setItem("userPincode", pincode);
      setSavedLocation(pincode);
      setLocationModal(false);
      setPincode("");
    }
  };

  // Focus input when modal opens
  useEffect(() => {
    if (locationModal && pincodeRef.current) pincodeRef.current.focus();
  }, [locationModal]);

  return (
    <>
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
                src="https://rukminim1.flixcart.com/fk-p-flap/96/36/image/29d70af2af1d6f47.png?q=90"
                srcSet="https://rukminim1.flixcart.com/fk-p-flap/48/18/image/29d70af2af1d6f47.png?q=80 1x, https://rukminim1.flixcart.com/fk-p-flap/96/36/image/29d70af2af1d6f47.png?q=60 2x"
                alt="Grocery"
                width="56"
                height="28"
              />
            </button>
          </div>
          <div className="topbar-right">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#555"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
            <span className="location-text">{savedLocation ? savedLocation : "Location not set"}</span>
            <button className="location-link" onClick={() => setLocationModal(true)}>
              {savedLocation ? "Change location ›" : "Select delivery location ›"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Location Modal ── */}
      {locationModal && (
        <div className="location-overlay" onClick={() => setLocationModal(false)}>
          <div className="location-modal" onClick={(e) => e.stopPropagation()}>
            <div className="location-modal-header">
              <h3>Select Delivery Location</h3>
              <button className="location-modal-close" onClick={() => setLocationModal(false)}>✕</button>
            </div>
            <p className="location-modal-sub">Enter your pincode to get accurate delivery dates</p>
            <div className="location-input-row">
              <input
                ref={pincodeRef}
                type="text"
                maxLength={6}
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && handleSaveLocation()}
                className="location-input"
              />
              <button className="location-apply-btn" onClick={handleSaveLocation}>Apply</button>
            </div>
            {pincode.length > 0 && pincode.length < 6 && (
              <p className="location-error">Please enter a valid 6-digit pincode</p>
            )}
          </div>
        </div>
      )}

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
              onMouseEnter={handleLoginEnter}
              onMouseLeave={handleLoginLeave}
            >
              <button className="nav-btn login-btn">
                <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-6bae67.svg" width="18" height="18" alt="profile" />
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
                      { icon: "https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-6bae67.svg", label: "My Profile",               to: "/orders" },
                      { icon: "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png", label: "Flipkart Plus Zone", to: "/" },
                      { icon: "orders", label: "Orders", to: "/orders" },
                      { icon: "heart", label: "Wishlist", to: "/wishlist" },
                      { icon: "https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/sell-image-0489fc.svg", label: "Become a Seller",        to: "/" },
                      { icon: "rewards",      label: "Rewards",                   to: "/" },
                      { icon: "https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/gift-cards-image-6947a9.svg", label: "Gift Cards", to: "/" },
                      { icon: "notification", label: "Notification Preferences",    to: "/" },
                      { icon: "https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/help-centre-image-b9e23c.svg", label: "24x7 Customer Care", to: "/" },
                      { icon: "https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/advertise-image-e4b62a.svg", label: "Advertise", to: "/" },
                      { icon: "download",     label: "Download App",               to: "/" },
                    ].map(({ icon, label, to }) => (
                      <li key={label}>
                        <Link to={to} className="login-menu-item">
                          {icon === "heart" ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="menu-icon">
                              <path d="M12 21C12 21 3 14 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 13-9 13z" stroke="#212121" strokeWidth="1.8" fill="none"/>
                            </svg>
                          ) : icon === "orders" ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="menu-icon">
                              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#212121" strokeWidth="1.8"/>
                              <path d="M7 8h10M7 12h10M7 16h6" stroke="#212121" strokeWidth="1.8" strokeLinecap="round"/>
                            </svg>
                          ) : icon === "rewards" ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="menu-icon">
                              <circle cx="12" cy="8" r="4" stroke="#212121" strokeWidth="1.8"/>
                              <path d="M12 12v8M8 20h8" stroke="#212121" strokeWidth="1.8" strokeLinecap="round"/>
                              <path d="M8 8H4l2-4M16 8h4l-2-4" stroke="#212121" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : icon === "notification" ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="menu-icon">
                              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="#212121" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#212121" strokeWidth="1.8" strokeLinecap="round"/>
                            </svg>
                          ) : icon === "download" ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="menu-icon">
                              <rect x="5" y="2" width="14" height="20" rx="2" stroke="#212121" strokeWidth="1.8"/>
                              <path d="M12 7v6M9 10l3 3 3-3" stroke="#212121" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="17" r="1" fill="#212121"/>
                            </svg>
                          ) : (
                            <img src={icon} alt={label} width="16" height="16" className="menu-icon" />
                          )}
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
              onMouseEnter={handleMoreEnter}
              onMouseLeave={handleMoreLeave}
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
                      { icon: "https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/sell-image-0489fc.svg",      label: "Become a Seller",       to: "/" },
                      { icon: "notification", label: "Notification Settings", to: "/" },
                      { icon: "https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/help-centre-image-b9e23c.svg", label: "24x7 Customer Care",    to: "/" },
                      { icon: "https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/advertise-image-e4b62a.svg",  label: "Advertise on Flipkart", to: "/" },
                    ].map(({ icon, label, to }) => (
                      <li key={label}>
                        <Link to={to} className="login-menu-item">
                          {icon === "notification" ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="menu-icon">
                              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="#212121" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#212121" strokeWidth="1.8" strokeLinecap="round"/>
                            </svg>
                          ) : (
                            <img src={icon} alt={label} width="16" height="16" className="menu-icon" />
                          )}
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
                <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart_v4-6ac9a8.svg" width="20" height="20" alt="cart" />
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
    </>
  );
};

export default Navbar;
