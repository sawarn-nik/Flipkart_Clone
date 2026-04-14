import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import "./ProductListingPage.css";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory) params.category = selectedCategory;
      const res = await api.get("/products", { params });
      setProducts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    api.get("/products/categories").then((res) => setCategories(res.data.data)).catch(console.error);
  }, []);

  useEffect(() => { fetchProducts(); }, [searchQuery, selectedCategory]);

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName === selectedCategory ? "" : catName);
    if (searchQuery) setSearchParams({});
  };

  return (
    <div className="listing-page">
      <aside className="sidebar">
        <h3 className="sidebar-title">Filters</h3>
        <div className="filter-section">
          <h4 className="filter-heading">CATEGORY</h4>
          {categories.map((cat) => (
            <label key={cat.id} className="filter-option">
              <input type="radio" name="category" checked={selectedCategory === cat.name} onChange={() => handleCategoryClick(cat.name)} />
              <span>{cat.name}</span>
            </label>
          ))}
          {selectedCategory && (
            <button className="clear-filter" onClick={() => setSelectedCategory("")}>Clear Filter</button>
          )}
        </div>
      </aside>

      <main className="products-main">
        <div className="listing-header">
          <h2>
            {searchQuery ? `Results for "${searchQuery}"` : selectedCategory || "All Products"}
          </h2>
          <span className="product-count">{products.length} results</span>
        </div>

        {loading ? (
          <div className="loading-grid">
            {[...Array(8)].map((_, i) => <div key={i} className="skeleton-card" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="no-results">
            <p>😕 No products found</p>
            <button onClick={() => { setSelectedCategory(""); setSearchParams({}); }}>Clear all filters</button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductListingPage;
