import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty!</h2>
        <p>Add items to it now.</p>
        <Link to="/" className="shop-now-btn">Shop Now</Link>
      </div>
    );
  }

  const deliveryCharge = cartTotal > 500 ? 0 : 40;
  const finalTotal = cartTotal + deliveryCharge;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-items-section">
          <h2 className="cart-title">My Cart ({cartItems.length} items)</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <Link to={`/product/${item.product_id}`}>
                <img src={item.image || "https://placehold.co/100"} alt={item.name} className="cart-item-image" />
              </Link>
              <div className="cart-item-details">
                <Link to={`/product/${item.product_id}`} className="cart-item-name">{item.name}</Link>
                <div className="cart-item-price">
                  ₹{Number(item.price).toLocaleString()}
                  {item.original_price && (
                    <span className="cart-item-original">₹{Number(item.original_price).toLocaleString()}</span>
                  )}
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>+</button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}

          <div className="cart-checkout-bar">
            <button className="place-order-btn" onClick={() => navigate("/checkout")}>PLACE ORDER</button>
          </div>
        </div>

        <div className="price-summary">
          <h3 className="summary-title">PRICE DETAILS</h3>
          <div className="summary-row"><span>Price ({cartItems.length} items)</span><span>₹{cartTotal.toLocaleString()}</span></div>
          <div className="summary-row">
            <span>Delivery Charges</span>
            <span className={deliveryCharge === 0 ? "free-delivery" : ""}>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row total-row"><span>Total Amount</span><span>₹{finalTotal.toLocaleString()}</span></div>
          {deliveryCharge === 0 && <p className="savings-text">🎉 You're saving ₹40 on delivery!</p>}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
