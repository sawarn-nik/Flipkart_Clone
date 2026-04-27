import { Link } from "react-router-dom";
import "./AccountPage.css";

const AccountPage = () => {
  return (
    <div className="account-page">

      {/* Header */}
      <div className="account-header">
        <div className="account-avatar">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="#2874f0" strokeWidth="1.8"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#2874f0" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="account-header-info">
          <p className="account-login-text">Log in to get exclusive offers</p>
        </div>
        <button className="account-login-btn">Log In</button>
      </div>

      {/* My Orders */}
      <div className="account-section">
        <Link to="/orders" className="account-menu-item account-orders-item">
          <span className="account-menu-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#2874f0" strokeWidth="1.8"/>
              <path d="M7 8h10M7 12h10M7 16h6" stroke="#2874f0" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </span>
          <div className="account-menu-text">
            <span className="account-menu-label">My Orders</span>
            <span className="account-menu-sub">Track, return or buy again</span>
          </div>
          <span className="account-menu-arrow">›</span>
        </Link>
      </div>

      {/* Account Settings */}
      <div className="account-section">
        <h3 className="account-section-title">Account Settings</h3>
        {[
          { icon: "🌐", label: "Select Language", sub: "English" },
          { icon: "🔔", label: "Notification Settings" },
          { icon: "🎧", label: "Help Center" },
        ].map(({ icon, label, sub }) => (
          <div key={label} className="account-menu-item">
            <span className="account-menu-emoji">{icon}</span>
            <div className="account-menu-text">
              <span className="account-menu-label">{label}</span>
              {sub && <span className="account-menu-sub">{sub}</span>}
            </div>
            <span className="account-menu-arrow">›</span>
          </div>
        ))}
      </div>

      {/* Earn with FlipStore */}
      <div className="account-section">
        <h3 className="account-section-title">Earn with FlipStore</h3>
        <div className="account-menu-item">
          <span className="account-menu-emoji">🏪</span>
          <div className="account-menu-text">
            <span className="account-menu-label">Sell on FlipStore</span>
          </div>
          <span className="account-menu-arrow">›</span>
        </div>
      </div>

      {/* Feedback & Information */}
      <div className="account-section">
        <h3 className="account-section-title">Feedback & Information</h3>
        {[
          { icon: "📄", label: "Terms, Policies and Licenses" },
          { icon: "❓", label: "Browse FAQs" },
        ].map(({ icon, label }) => (
          <div key={label} className="account-menu-item">
            <span className="account-menu-emoji">{icon}</span>
            <div className="account-menu-text">
              <span className="account-menu-label">{label}</span>
            </div>
            <span className="account-menu-arrow">›</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AccountPage;
