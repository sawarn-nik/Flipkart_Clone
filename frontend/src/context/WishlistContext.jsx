import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist");
      setWishlistItems(res.data.data);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    }
  };

  useEffect(() => { fetchWishlist(); }, []);

  const isWishlisted = (productId) => wishlistItems.some((item) => item.product_id === productId);

  const toggleWishlist = async (productId) => {
    try {
      if (isWishlisted(productId)) {
        await api.delete(`/wishlist/${productId}`);
        toast.info("Removed from wishlist");
      } else {
        await api.post("/wishlist", { product_id: productId });
        toast.success("Added to wishlist!");
      }
      await fetchWishlist();
    } catch (err) {
      toast.error("Wishlist update failed");
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
