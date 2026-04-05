import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiSearch, FiMenu, FiX, FiZap } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/wishlist', label: 'Wishlist' },
    { to: '/cart', label: 'Cart' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <FiZap className="brand-icon" />
          <span>ShopVibe</span>
        </Link>

        <nav className="navbar-links">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' active' : '')
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <button
            className="icon-btn"
            onClick={() => setSearchOpen((o) => !o)}
            aria-label="Search"
          >
            <FiSearch />
          </button>

          <Link to="/wishlist" className="icon-btn badge-wrap" aria-label="Wishlist">
            <FiHeart />
            {wishlistItems.length > 0 && (
              <span className="badge">{wishlistItems.length}</span>
            )}
          </Link>

          <Link to="/cart" className="icon-btn badge-wrap" aria-label="Cart">
            <FiShoppingCart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>

          <button
            className="icon-btn mobile-menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="search-overlay"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <form onSubmit={handleSearch} className="search-form">
              <FiSearch className="search-icon" />
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="btn btn-primary">Go</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  'mobile-link' + (isActive ? ' active' : '')
                }
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
