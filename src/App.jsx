import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="*"
              element={
                <div className="empty-page">
                  <span className="empty-icon">🔭</span>
                  <h2>Page Not Found</h2>
                  <a href="/" className="btn btn-primary btn-lg">Go Home</a>
                </div>
              }
            />
          </Routes>
        </main>
        <footer className="footer">
          <p>© 2025 ShopVibe — Built with React & Fake Store API</p>
        </footer>
        <ToastContainer theme="dark" />
      </CartProvider>
    </BrowserRouter>
  );
}
