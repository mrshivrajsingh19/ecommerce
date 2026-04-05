import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { formatPrice, truncateText } from '../utils/helpers';

export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <Link to={`/products/${product.id}`} className="card-img-wrap">
        <img src={product.image} alt={product.title} className="card-img" loading="lazy" />
        <span className="card-category">{product.category}</span>
        <button
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            wishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
          }}
          aria-label="Toggle wishlist"
        >
          <FiHeart />
        </button>
      </Link>

      <div className="card-body">
        <Link to={`/products/${product.id}`} className="card-title">
          {truncateText(product.title, 55)}
        </Link>

        <div className="card-meta">
          <div className="card-rating">
            <FiStar className="star-icon" />
            <span>{product.rating?.rate}</span>
            <span className="rating-count">({product.rating?.count})</span>
          </div>
          <span className="card-price">{formatPrice(product.price)}</span>
        </div>

        <button
          className={`btn btn-add-cart ${inCart ? 'in-cart' : ''}`}
          onClick={() => addToCart(product)}
        >
          <FiShoppingCart />
          {inCart ? 'In Cart' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  );
}
