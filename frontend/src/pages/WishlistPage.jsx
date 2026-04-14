import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./WishlistPage.css";

const WishlistPage = () => {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="empty-icon">♡</div>
        <h2>Your Wishlist is empty</h2>
        <p>Save items you like here. Review them anytime and easily move them to the bag.</p>
        <Link to="/" className="continue-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <h2 className="wishlist-title">My Wishlist ({wishlistItems.length} items)</h2>
        <div className="wishlist-grid">
          {wishlistItems.map((item) => {
            const discount = item.original_price
              ? Math.round(((item.original_price - item.price) / item.original_price) * 100)
              : 0;
            return (
              <div key={item.id} className="wishlist-card">
                <button className="remove-wishlist" onClick={() => toggleWishlist(item.product_id)} title="Remove">✕</button>
                <Link to={`/product/${item.product_id}`}>
                  <img src={item.image || "https://placehold.co/180"} alt={item.name} className="wishlist-image" />
                </Link>
                <div className="wishlist-info">
                  <Link to={`/product/${item.product_id}`} className="wishlist-name">{item.name}</Link>
                  <div className="wishlist-price">
                    <span>₹{Number(item.price).toLocaleString()}</span>
                    {item.original_price && <span className="original">₹{Number(item.original_price).toLocaleString()}</span>}
                    {discount > 0 && <span className="discount">{discount}% off</span>}
                  </div>
                  <div className="wishlist-rating"><span className="rating-badge">{item.rating} ★</span></div>
                </div>
                <button className="move-to-cart-btn" onClick={() => addToCart(item.product_id)}>Move to Cart</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
