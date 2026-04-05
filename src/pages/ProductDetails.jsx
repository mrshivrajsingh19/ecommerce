import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, fetchProductsByCategory } from '../services/api';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { formatPrice } from '../utils/helpers';
import { motion } from 'framer-motion';
import {
  FiStar, FiShoppingCart, FiHeart, FiArrowLeft, FiPackage,
} from 'react-icons/fi';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const data = await fetchProductById(id);
        setProduct(data);
        const rel = await fetchProductsByCategory(data.category);
        setRelated(rel.filter((p) => p.id !== data.id).slice(0, 4));
      } catch {
        setError('Failed to load product.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-skeleton">
        <div className="ds-img" />
        <div className="ds-body">
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
          <div className="skeleton-line" />
          <div className="skeleton-btn" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-state">
        <span>⚠️</span>
        <h3>{error || 'Product not found'}</h3>
        <Link to="/products" className="btn btn-primary">Back to Products</Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const stars = Math.round(product.rating?.rate || 0);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
  };

  return (
    <div className="product-detail-page">
      <Link to="/products" className="back-link">
        <FiArrowLeft /> Back to Products
      </Link>

      <div className="detail-grid">
        {/* Image */}
        <motion.div
          className="detail-img-wrap"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img src={product.image} alt={product.title} className="detail-img" />
          <span className="detail-category">{product.category}</span>
        </motion.div>

        {/* Info */}
        <motion.div
          className="detail-info"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-rating">
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar
                  key={i}
                  className={i < stars ? 'star filled' : 'star'}
                />
              ))}
            </div>
            <span className="rating-val">{product.rating?.rate}</span>
            <span className="rating-count">({product.rating?.count} reviews)</span>
          </div>

          <div className="detail-price">{formatPrice(product.price)}</div>

          <p className="detail-desc">{product.description}</p>

          <div className="detail-meta">
            <FiPackage />
            <span>In stock • Usually ships in 1–2 business days</span>
          </div>

          {/* Quantity */}
          <div className="detail-qty">
            <label>Quantity</label>
            <div className="qty-control">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
          </div>

          <div className="detail-actions">
            <button
              className={`btn btn-primary btn-lg flex-1 ${inCart ? 'in-cart' : ''}`}
              onClick={handleAddToCart}
            >
              <FiShoppingCart />
              {inCart ? 'Add More to Cart' : 'Add to Cart'}
            </button>
            <button
              className={`btn btn-ghost btn-lg wishlist-toggle ${wishlisted ? 'active' : ''}`}
              onClick={() =>
                wishlisted
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product)
              }
              aria-label="Wishlist"
            >
              <FiHeart />
            </button>
          </div>

          <Link to="/cart" className="btn btn-outline btn-lg mt-1">
            View Cart
          </Link>
        </motion.div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="related-section">
          <h2>Related Products</h2>
          <div className="product-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
