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
          <a href="#">FlipStore Stories</a>
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

        <div className="footer-divider" />

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
            FlipStore Internet Private Limited,<br />
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
            FlipStore Internet Private Limited,<br />
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
            <a href="#">
              <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/sell-image-0489fc.svg" alt="Become a Seller" width="20" height="20" />
              Become a Seller
            </a>
            <a href="#">
              <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/advertise-image-e4b62a.svg" alt="Advertise" width="20" height="20" />
              Advertise
            </a>
            <a href="#">
              <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/gift-cards-image-6947a9.svg" alt="Gift Cards" width="20" height="20" />
              Gift Cards
            </a>
            <a href="#">
              <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/help-centre-image-b9e23c.svg" alt="Help Center" width="20" height="20" />
              Help Center
            </a>
          </div>
          <div className="footer-copyright">© 2007-2026 FlipStore.com</div>
          <div className="footer-payments">
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-69e7ec.svg" alt="Payment Methods" height="24" />
          </div>
        </div>
      </div>
      <div className="footer-refresh">
        <button className="footer-refresh-btn" onClick={() => window.location.reload()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M4 12a8 8 0 018-8 8 8 0 016.32 3.1L20 9h-5V4l1.9 1.9A10 10 0 1022 12h-2a8 8 0 01-8 8 8 8 0 01-8-8z" fill="white"/>
          </svg>
          Refresh Page
        </button>
      </div>
    </footer>
  );
};

export default Footer;
