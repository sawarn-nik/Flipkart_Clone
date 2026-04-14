import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCartItems(res.data.data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  useEffect(() => { fetchCart(); }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.post("/cart", { product_id: productId, quantity });
      await fetchCart();
      toast.success("Added to cart!");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      await api.put(`/cart/${cartItemId}`, { quantity });
      await fetchCart();
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await api.delete(`/cart/${cartItemId}`);
      await fetchCart();
      toast.success("Item removed");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addToCart, updateQuantity, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
