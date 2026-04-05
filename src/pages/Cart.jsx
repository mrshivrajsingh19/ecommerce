import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/CartItem';
import { formatPrice, calcCartTotal, calcTax } from '../utils/helpers';

export default function Cart() {
  const { cartItems, clearCart } = useCart();
  const subtotal = calcCartTotal(cartItems);
  const tax = calcTax(subtotal);
  const total = subtotal + tax;

  if (!cartItems.length) {
    return (
      <div className="empty-page">
        <span className="empty-icon">🛒</span>
        <h2>Your Cart is Empty</h2>
        <p>Browse our products and add something you love!</p>
        <Link to="/products" className="btn btn-primary btn-lg">
          <FiShoppingBag /> Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-top">
        <h1 className="page-title">Shopping Cart</h1>
        <button className="btn btn-ghost" onClick={clearCart}>
          <FiTrash2 /> Clear All
        </button>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items-list">
          <div className="cart-header-row">
            <span>Product</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span />
          </div>
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.25 }}
                layout
              >
                <CartItem item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal ({cartItems.reduce((a, i) => a + i.quantity, 0)} items)</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-tag">Free</span>
          </div>
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-lg full-width mt-1">
            Proceed to Checkout
          </Link>
          <Link to="/products" className="btn btn-ghost btn-lg full-width mt-half">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
