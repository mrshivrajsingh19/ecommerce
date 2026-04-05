import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { formatPrice, calcCartTotal, calcTax } from '../utils/helpers';

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zip: yup.string().matches(/^\d{4,6}$/, 'Invalid ZIP').required('ZIP is required'),
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, 'Card number must be 16 digits')
    .required('Card number is required'),
  expiry: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY')
    .required('Expiry required'),
  cvv: yup
    .string()
    .matches(/^\d{3,4}$/, 'CVV must be 3–4 digits')
    .required('CVV is required'),
});

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const subtotal = calcCartTotal(cartItems);
  const tax = calcTax(subtotal);
  const total = subtotal + tax;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  if (!cartItems.length && !success) {
    return (
      <div className="empty-page">
        <span className="empty-icon">🛒</span>
        <h2>Nothing to Checkout</h2>
        <Link to="/products" className="btn btn-primary btn-lg">
          <FiShoppingBag /> Browse Products
        </Link>
      </div>
    );
  }

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1200));
    clearCart();
    setSuccess(true);
  };

  if (success) {
    return (
      <motion.div
        className="success-page"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <FiCheckCircle className="success-icon" />
        <h1>Order Placed! 🎉</h1>
        <p>Thank you for your purchase. You'll receive a confirmation email shortly.</p>
        <Link to="/" className="btn btn-primary btn-lg">Back to Home</Link>
      </motion.div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-layout">
        {/* Form */}
        <form className="checkout-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-section">
            <h3>Shipping Information</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Full Name</label>
                <input {...register('fullName')} placeholder="John Doe" />
                {errors.fullName && <span className="err">{errors.fullName.message}</span>}
              </div>
              <div className="form-field">
                <label>Email</label>
                <input {...register('email')} type="email" placeholder="john@example.com" />
                {errors.email && <span className="err">{errors.email.message}</span>}
              </div>
              <div className="form-field full-width">
                <label>Address</label>
                <input {...register('address')} placeholder="123 Main Street" />
                {errors.address && <span className="err">{errors.address.message}</span>}
              </div>
              <div className="form-field">
                <label>City</label>
                <input {...register('city')} placeholder="Mumbai" />
                {errors.city && <span className="err">{errors.city.message}</span>}
              </div>
              <div className="form-field">
                <label>ZIP / Postal Code</label>
                <input {...register('zip')} placeholder="400001" />
                {errors.zip && <span className="err">{errors.zip.message}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Payment Details</h3>
            <div className="form-grid">
              <div className="form-field full-width">
                <label>Card Number</label>
                <input {...register('cardNumber')} placeholder="1234567890123456" maxLength={16} />
                {errors.cardNumber && <span className="err">{errors.cardNumber.message}</span>}
              </div>
              <div className="form-field">
                <label>Expiry (MM/YY)</label>
                <input {...register('expiry')} placeholder="09/27" />
                {errors.expiry && <span className="err">{errors.expiry.message}</span>}
              </div>
              <div className="form-field">
                <label>CVV</label>
                <input {...register('cvv')} placeholder="123" maxLength={4} type="password" />
                {errors.cvv && <span className="err">{errors.cvv.message}</span>}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg full-width"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Placing Order...' : `Place Order • ${formatPrice(total)}`}
          </button>
        </form>

        {/* Summary */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="co-items">
            {cartItems.map((item) => (
              <div key={item.id} className="co-item">
                <img src={item.image} alt={item.title} className="co-img" />
                <div className="co-info">
                  <span className="co-title">{item.title.slice(0, 40)}...</span>
                  <span className="co-qty">Qty: {item.quantity}</span>
                </div>
                <span className="co-price">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="summary-divider" />
          <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="summary-row"><span>Shipping</span><span className="free-tag">Free</span></div>
          <div className="summary-row"><span>Tax (8%)</span><span>{formatPrice(tax)}</span></div>
          <div className="summary-divider" />
          <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
        </div>
      </div>
    </div>
  );
}
