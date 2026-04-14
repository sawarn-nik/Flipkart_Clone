import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="product-card">
      <button
        className={`wishlist-btn ${isWishlisted(product.id) ? "wishlisted" : ""}`}
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
      >
        {isWishlisted(product.id) ? "♥" : "♡"}
      </button>

      <Link to={`/product/${product.id}`} className="card-link">
        <div className="card-image-wrapper">
          <img
            src={product.image || "https://placehold.co/200x200?text=No+Image"}
            alt={product.name}
            className="card-image"
            onError={(e) => (e.target.src = "https://placehold.co/200x200?text=No+Image")}
          />
        </div>
        <div className="card-body">
          <p className="card-name">{product.name}</p>
          <div className="card-rating">
            <span className="rating-badge">{product.rating} ★</span>
            <span className="rating-count">({Number(product.rating_count).toLocaleString()})</span>
          </div>
          <div className="card-price">
            <span className="price-current">₹{Number(product.price).toLocaleString()}</span>
            {product.original_price && (
              <>
                <span className="price-original">₹{Number(product.original_price).toLocaleString()}</span>
                {discount > 0 && <span className="price-discount">{discount}% off</span>}
              </>
            )}
          </div>
        </div>
      </Link>

      <button className="add-to-cart-btn" onClick={() => addToCart(product.id)}>
        🛒 Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
