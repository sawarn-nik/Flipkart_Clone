import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./OrderHistoryPage.css";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders")
      .then((res) => setOrders(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="orders-loading">Loading...</div>;

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h2 className="orders-title">My Orders</h2>
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>📦 No orders yet</p>
            <Link to="/" className="shop-btn">Start Shopping</Link>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div><span className="order-label">ORDER ID</span><span className="order-id">{order.id}</span></div>
                <div>
                  <span className="order-label">PLACED ON</span>
                  <span>{new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
                <div><span className="order-label">TOTAL</span><span className="order-total">₹{Number(order.total_amount).toLocaleString()}</span></div>
                <span className={`order-status status-${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="order-footer">
                <span>{order.item_count} item(s)</span>
                <Link to={`/order-confirmation/${order.id}`} className="view-details-btn">View Details</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
