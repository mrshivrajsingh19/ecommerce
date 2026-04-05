import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="cart-item">
      <Link to={`/products/${item.id}`} className="cart-item-img-wrap">
        <img src={item.image} alt={item.title} className="cart-item-img" />
      </Link>
      <div className="cart-item-info">
        <Link to={`/products/${item.id}`} className="cart-item-title">
          {item.title}
        </Link>
        <span className="cart-item-category">{item.category}</span>
        <span className="cart-item-price">{formatPrice(item.price)}</span>
      </div>
      <div className="cart-item-qty">
        <button
          className="qty-btn"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          aria-label="Decrease"
        >
          <FiMinus />
        </button>
        <span className="qty-val">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          aria-label="Increase"
        >
          <FiPlus />
        </button>
      </div>
      <div className="cart-item-subtotal">
        {formatPrice(item.price * item.quantity)}
      </div>
      <button
        className="remove-btn"
        onClick={() => removeFromCart(item.id)}
        aria-label="Remove item"
      >
        <FiTrash2 />
      </button>
    </div>
  );
}
