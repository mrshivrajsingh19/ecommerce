import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShoppingBag, FiStar, FiTruck, FiShield } from 'react-icons/fi';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const features = [
  { icon: <FiTruck />, title: 'Free Shipping', desc: 'On all orders over $50' },
  { icon: <FiShield />, title: 'Secure Payment', desc: '100% protected transactions' },
  { icon: <FiStar />, title: 'Top Rated', desc: 'Curated quality products' },
  { icon: <FiShoppingBag />, title: 'Easy Returns', desc: '30-day hassle-free returns' },
];

export default function Home() {
  const { allProducts, loading } = useProducts();
  const featured = allProducts.slice(0, 4);
  const topRated = [...allProducts]
    .sort((a, b) => b.rating?.rate - a.rating?.rate)
    .slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="hero-badge">✨ New Arrivals Every Week</span>
          <h1 className="hero-title">
            Discover <span className="gradient-text">Premium</span> Products
          </h1>
          <p className="hero-sub">
            Shop the latest trends across electronics, fashion, jewelry and more.
            Unbeatable prices, lightning-fast delivery.
          </p>
          <div className="hero-cta">
            <Link to="/products" className="btn btn-primary btn-lg">
              Shop Now <FiArrowRight />
            </Link>
            <Link to="/wishlist" className="btn btn-ghost btn-lg">
              My Wishlist
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat"><strong>10K+</strong><span>Products</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>50K+</strong><span>Happy Customers</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>4.9★</strong><span>Avg Rating</span></div>
          </div>
        </motion.div>
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="hero-blob" />
          <div className="hero-cards-stack">
            {allProducts.slice(0, 3).map((p, i) => (
              <motion.div
                key={p.id}
                className="hero-mini-card"
                style={{ '--i': i }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 + i * 0.5, delay: i * 0.3 }}
              >
                <img src={p.image} alt={p.title} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="features-strip">
        {features.map((f) => (
          <motion.div
            key={f.title}
            className="feature-item"
            whileHover={{ scale: 1.03 }}
          >
            <span className="feature-icon">{f.icon}</span>
            <div>
              <strong>{f.title}</strong>
              <p>{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Category Tabs */}
      <section className="home-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <Link to="/products" className="see-all-link">See All <FiArrowRight /></Link>
        </div>
        <div className="category-cards">
          {[
            { label: "Electronics", emoji: "🖥️", color: "#6366f1", cat: "electronics" },
            { label: "Men's Clothing", emoji: "👔", color: "#3b82f6", cat: "men's clothing" },
            { label: "Women's Clothing", emoji: "👗", color: "#ec4899", cat: "women's clothing" },
            { label: "Jewelery", emoji: "💎", color: "#f59e0b", cat: "jewelery" },
            { label: "Home", emoji: "🏠", color: "#10b981", cat: "home" },
          ].map((c) => (
            <Link
              key={c.label}
              to={`/products?category=${encodeURIComponent(c.cat)}`}
              className="category-card"
              style={{ '--cat-color': c.color }}
            >
              <span className="cat-emoji">{c.emoji}</span>
              <span>{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="home-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="see-all-link">See All <FiArrowRight /></Link>
        </div>
        <div className="product-grid">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-img" />
                  <div className="skeleton-body">
                    <div className="skeleton-line" />
                    <div className="skeleton-line short" />
                    <div className="skeleton-btn" />
                  </div>
                </div>
              ))
            : featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Top Rated */}
      <section className="home-section">
        <div className="section-header">
          <h2>⭐ Top Rated</h2>
          <Link to="/products?sort=rating" className="see-all-link">See All <FiArrowRight /></Link>
        </div>
        <div className="product-grid">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-img" />
                  <div className="skeleton-body">
                    <div className="skeleton-line" />
                    <div className="skeleton-line short" />
                    <div className="skeleton-btn" />
                  </div>
                </div>
              ))
            : topRated.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Ready to start shopping?</h2>
          <p>Thousands of products. Unbeatable prices. Fast delivery.</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Browse All Products <FiArrowRight />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
