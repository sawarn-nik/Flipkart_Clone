import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api/axios";
import { toast } from "react-toastify";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { cartItems, cartTotal, fetchCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "Rahul Sharma", phone: "9876543210", address: "", city: "", state: "", pincode: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/orders", { shipping: form });
      await fetchCart();
      navigate(`/order-confirmation/${res.data.data.orderId}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const deliveryCharge = cartTotal > 500 ? 0 : 40;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-form-section">
          <h2 className="checkout-title">Delivery Address</h2>
          <form onSubmit={handlePlaceOrder} className="checkout-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Enter full name" />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} required placeholder="10-digit mobile number" maxLength={10} />
              </div>
            </div>
            <div className="form-group">
              <label>Address *</label>
              <textarea name="address" value={form.address} onChange={handleChange} required placeholder="House No, Street, Area" rows={3} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input name="city" value={form.city} onChange={handleChange} required placeholder="City" />
              </div>
              <div className="form-group">
                <label>State *</label>
                <input name="state" value={form.state} onChange={handleChange} required placeholder="State" />
              </div>
              <div className="form-group">
                <label>Pincode *</label>
                <input name="pincode" value={form.pincode} onChange={handleChange} required placeholder="6-digit pincode" maxLength={6} />
              </div>
            </div>

            <div className="order-summary-box">
              <h3>Order Summary</h3>
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-qty">Qty: {item.quantity}</p>
                  </div>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="summary-total">
                <span>Total</span>
                <span>₹{(cartTotal + deliveryCharge).toLocaleString()}</span>
              </div>
            </div>

            <button type="submit" className="confirm-order-btn" disabled={loading}>
              {loading ? "Placing Order..." : "CONFIRM ORDER"}
            </button>
          </form>
        </div>

        <div className="checkout-price-summary">
          <h3 className="summary-title">PRICE DETAILS</h3>
          <div className="summary-row"><span>Price ({cartItems.length} items)</span><span>₹{cartTotal.toLocaleString()}</span></div>
          <div className="summary-row">
            <span>Delivery Charges</span>
            <span className={deliveryCharge === 0 ? "free" : ""}>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row total"><span>Total Amount</span><span>₹{(cartTotal + deliveryCharge).toLocaleString()}</span></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
