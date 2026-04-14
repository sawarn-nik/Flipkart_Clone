import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleBuyNow = async () => {
    await addToCart(product.id);
    navigate("/cart");
  };

  if (loading) return <div className="detail-loading">Loading...</div>;
  if (!product) return <div className="detail-loading">Product not found</div>;

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="detail-page">
      <div className="detail-container">
        {/* Left: Images */}
        <div className="detail-images">
          <div className="image-thumbnails">
            {product.images?.map((img, i) => (
              <div key={i} className={`thumbnail ${activeImage === i ? "active" : ""}`} onClick={() => setActiveImage(i)}>
                <img src={img.image_url} alt={`view ${i + 1}`} />
              </div>
            ))}
          </div>

          <div className="main-image-wrapper">
            <img
              src={product.images?.[activeImage]?.image_url || "https://placehold.co/400"}
              alt={product.name}
              className="main-image"
            />
            {product.images?.length > 1 && (
              <>
                <button className="carousel-btn prev" onClick={() => setActiveImage((p) => (p === 0 ? product.images.length - 1 : p - 1))}>‹</button>
                <button className="carousel-btn next" onClick={() => setActiveImage((p) => (p === product.images.length - 1 ? 0 : p + 1))}>›</button>
              </>
            )}
          </div>

          <div className="detail-actions">
            <button className="btn-add-cart" onClick={() => addToCart(product.id)}>🛒 ADD TO CART</button>
            <button className="btn-buy-now" onClick={handleBuyNow}>⚡ BUY NOW</button>
          </div>
        </div>

        {/* Right: Info */}
        <div className="detail-info">
          <h1 className="detail-name">{product.name}</h1>

          <div className="detail-rating">
            <span className="rating-badge">{product.rating} ★</span>
            <span className="rating-count">{Number(product.rating_count).toLocaleString()} ratings</span>
          </div>

          <div className="detail-price-section">
            <span className="detail-price">₹{Number(product.price).toLocaleString()}</span>
            {product.original_price && (
              <>
                <span className="detail-original">₹{Number(product.original_price).toLocaleString()}</span>
                {discount > 0 && <span className="detail-discount">{discount}% off</span>}
              </>
            )}
          </div>

          <div className={`stock-status ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
            {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : "✗ Out of Stock"}
          </div>

          <button className={`wishlist-toggle ${isWishlisted(product.id) ? "wishlisted" : ""}`} onClick={() => toggleWishlist(product.id)}>
            {isWishlisted(product.id) ? "♥ Wishlisted" : "♡ Add to Wishlist"}
          </button>

          <div className="detail-section">
            <h3>Description</h3>
            <p className="detail-description">{product.description}</p>
          </div>

          {product.specs?.length > 0 && (
            <div className="detail-section">
              <h3>Specifications</h3>
              <table className="specs-table">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={i}>
                      <td className="spec-key">{spec.spec_key}</td>
                      <td className="spec-value">{spec.spec_value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
