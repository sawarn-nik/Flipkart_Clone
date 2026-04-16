import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SeoContent from "./components/SeoContent";
import MobileBottomNav from "./components/MobileBottomNav";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
          <SeoContent />
          <Footer />
          <MobileBottomNav />
          <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
