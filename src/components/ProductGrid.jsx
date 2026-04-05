import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-img" />
            <div className="skeleton-body">
              <div className="skeleton-line" />
              <div className="skeleton-line short" />
              <div className="skeleton-btn" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🔍</span>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="product-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </motion.div>
  );
}
