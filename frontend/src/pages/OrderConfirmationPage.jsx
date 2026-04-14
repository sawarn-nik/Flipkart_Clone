import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import "./OrderConfirmationPage.css";

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/${orderId}`)
      .then((res) => setOrder(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <div className="confirm-loading">Loading...</div>;
  if (!order) return <div className="confirm-loading">Order not found</div>;

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        <h1 className="confirm-heading">Order Placed Successfully!</h1>
        <p className="confirm-subtext">Your order has been confirmed and will be delivered soon.</p>

        <div className="order-id-box">
          <span className="order-id-label">ORDER ID</span>
          <span className="order-id-value">{order.id}</span>
        </div>

        <div className="confirm-section">
          <h3>Delivering to</h3>
          <p><strong>{order.shipping_name}</strong> | {order.shipping_phone}</p>
          <p>{order.shipping_address}, {order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}</p>
        </div>

        <div className="confirm-section">
          <h3>Items Ordered</h3>
          {order.items?.map((item) => (
            <div key={item.id} className="confirm-item">
              <img src={item.product_image || "https://placehold.co/60"} alt={item.product_name} />
              <div className="confirm-item-info">
                <p className="confirm-item-name">{item.product_name}</p>
                <p className="confirm-item-qty">Qty: {item.quantity}</p>
              </div>
              <span className="confirm-item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="confirm-total">
          <span>Total Amount Paid</span>
          <span>₹{Number(order.total_amount).toLocaleString()}</span>
        </div>

        <div className="confirm-actions">
          <Link to="/orders" className="view-orders-btn">View All Orders</Link>
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
