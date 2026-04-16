import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import BannerCarousel from "../components/BannerCarousel";
import "./ProductListingPage.css";

// Homepage category sections with their display config
const homeSections = [
  {
    title: "In Demand",
    category: "Electronics",
    bg: "#e8f5e9",
    limit: 4,
  },
  {
    title: "Best Deals on Fashion",
    category: "Fashion",
    bg: "#e3f2fd",
    limit: 4,
  },
  {
    title: "Top Picks for You",
    category: "",
    bg: "#fce4ec",
    limit: 4,
  },
  {
    title: "Home & Furniture",
    category: "Home",
    bg: "#fff8e1",
    limit: 4,
  },
];

const HomeCategorySection = ({ title, category, bg, limit }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const params = { limit };
    if (category) params.category = category;
    api.get("/products", { params })
      .then((res) => setItems((res.data.data || []).slice(0, limit)))
      .catch(console.error);
  }, [category, limit]);

  if (!items.length) return null;

  return (
    <div className="section-wrapper">
      <div className="home-section" style={{ background: bg }}>
        <div className="home-section-header">
          <h2 className="section-title">{title}</h2>
          <button className="section-arrow-btn">→</button>
        </div>
        <div className="home-product-grid">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      const cat = selectedCategory || categoryParam;
      if (cat) params.category = cat;
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

  useEffect(() => { fetchProducts(); }, [searchQuery, selectedCategory, categoryParam]);

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName === selectedCategory ? "" : catName);
    if (searchQuery) setSearchParams({});
  };

  const isHomepage = !searchQuery && !selectedCategory && !categoryParam;

  return (
    <div className="listing-root">
      {/* ── HOMEPAGE: banner + category product sections ── */}
      {isHomepage && (
        <>
          <BannerCarousel />
          {homeSections.map((s) => (
            <HomeCategorySection key={s.title} {...s} />
          ))}
        </>
      )}

      {/* ── SEARCH / FILTER RESULTS: sidebar + grid ── */}
      {!isHomepage && (
        <>
        {!searchQuery && <BannerCarousel />}
        <div className="listing-page">
          {searchQuery && (
            <aside className="sidebar">
              <h3 className="sidebar-title">Filters</h3>
              <div className="filter-section">
                <h4 className="filter-heading">CATEGORY</h4>
                {categories.map((cat) => (
                  <label key={cat.id} className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.name}
                      onChange={() => handleCategoryClick(cat.name)}
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
                {selectedCategory && (
                  <button className="clear-filter" onClick={() => setSelectedCategory("")}>Clear Filter</button>
                )}
              </div>
            </aside>
          )}

          <main className="products-main">
            <div className="listing-header">
              <h2>
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : selectedCategory || categoryParam || "All Products"}
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
              <div className="products-grid-card">
                <div className="products-grid">
                  {products.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
              </div>
            )}
          </main>
        </div>
        </>
      )}
    </div>
  );
};

export default ProductListingPage;
