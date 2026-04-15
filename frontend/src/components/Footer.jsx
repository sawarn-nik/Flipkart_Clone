import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h4>ABOUT</h4>
          <a href="#">Contact Us</a>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Flipkart Stories</a>
          <a href="#">Press</a>
          <a href="#">Corporate Information</a>
        </div>

        <div className="footer-col">
          <h4>GROUP COMPANIES</h4>
          <a href="#">Myntra</a>
          <a href="#">Cleartrip</a>
          <a href="#">Shopsy</a>
        </div>

        <div className="footer-col">
          <h4>HELP</h4>
          <a href="#">Payments</a>
          <a href="#">Shipping</a>
          <a href="#">Cancellation &amp; Returns</a>
          <a href="#">FAQ</a>
        </div>

        <div className="footer-col">
          <h4>CONSUMER POLICY</h4>
          <a href="#">Cancellation &amp; Returns</a>
          <a href="#">Terms Of Use</a>
          <a href="#">Security</a>
          <a href="#">Privacy</a>
          <a href="#">Sitemap</a>
          <a href="#">Grievance Redressal</a>
          <a href="#">EPR Compliance</a>
          <a href="#">FSSAI Food Safety Connect App</a>
        </div>

        <div className="footer-col footer-address">
          <h4>Mail Us:</h4>
          <p>
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &amp;<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India
          </p>
          <p className="footer-social-label">Social:</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">𝐟</a>
            <a href="#" aria-label="X">𝕏</a>
            <a href="#" aria-label="YouTube">▶</a>
            <a href="#" aria-label="Instagram">📷</a>
          </div>
        </div>

        <div className="footer-col footer-address">
          <h4>Registered Office Address:</h4>
          <p>
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &amp;<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India<br />
            CIN : U51109KA2012PTC066107<br />
            Telephone: <a href="tel:04445614700">044-45614700</a> / <a href="tel:04467415800">044-67415800</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <div className="footer-bottom-links">
            <a href="#"><span>🏪</span> Become a Seller</a>
            <a href="#"><span>📢</span> Advertise</a>
            <a href="#"><span>🎁</span> Gift Cards</a>
            <a href="#"><span>❓</span> Help Center</a>
          </div>
          <div className="footer-copyright">© 2007-2026 Flipkart.com</div>
          <div className="footer-payments">
            {["VISA", "MC", "RuPay", "Net", "UPI", "EMI", "COD"].map((p) => (
              <span key={p} className="payment-badge">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
