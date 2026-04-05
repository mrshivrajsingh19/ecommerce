import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/helpers';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  if (!wishlistItems.length) {
    return (
      <div className="empty-page">
        <span className="empty-icon">💝</span>
        <h2>Your Wishlist is Empty</h2>
        <p>Save your favourite products and revisit them anytime.</p>
        <Link to="/products" className="btn btn-primary btn-lg">
          <FiShoppingBag /> Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="page-top">
        <h1 className="page-title">My Wishlist</h1>
        <span className="page-sub">{wishlistItems.length} saved item{wishlistItems.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <motion.div
            key={item.id}
            className="wishlist-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            layout
          >
            <Link to={`/products/${item.id}`} className="wc-img-wrap">
              <img src={item.image} alt={item.title} className="wc-img" />
            </Link>
            <div className="wc-body">
              <Link to={`/products/${item.id}`} className="wc-title">{item.title}</Link>
              <span className="wc-price">{formatPrice(item.price)}</span>
              <div className="wc-actions">
                <button
                  className={`btn btn-primary ${isInCart(item.id) ? 'in-cart' : ''}`}
                  onClick={() => addToCart(item)}
                >
                  {isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
                </button>
                <button
                  className="btn btn-ghost remove-btn"
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label="Remove"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
