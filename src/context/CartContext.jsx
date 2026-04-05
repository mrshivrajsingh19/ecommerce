import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    case 'ADD_TO_WISHLIST': {
      const already = state.wishlistItems.find(
        (i) => i.id === action.payload.id
      );
      if (already) return state;
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };
    }
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (i) => i.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const loadState = () => {
  try {
    const cart = localStorage.getItem('cartItems');
    const wishlist = localStorage.getItem('wishlistItems');
    return {
      cartItems: cart ? JSON.parse(cart) : [],
      wishlistItems: wishlist ? JSON.parse(wishlist) : [],
    };
  } catch {
    return { cartItems: [], wishlistItems: [] };
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, loadState());

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
  }, [state.wishlistItems]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success(`"${product.title.slice(0, 25)}..." added to cart!`, {
      position: 'bottom-right',
    });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    toast.info('Item removed from cart', { position: 'bottom-right' });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToWishlist = (product) => {
    const already = state.wishlistItems.find((i) => i.id === product.id);
    if (already) {
      toast.warning('Already in wishlist!', { position: 'bottom-right' });
      return;
    }
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    toast.success('Added to wishlist!', { position: 'bottom-right' });
  };

  const removeFromWishlist = (id) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
    toast.info('Removed from wishlist', { position: 'bottom-right' });
  };

  const isInCart = (id) => state.cartItems.some((i) => i.id === id);
  const isInWishlist = (id) => state.wishlistItems.some((i) => i.id === id);
  const cartCount = state.cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        wishlistItems: state.wishlistItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInCart,
        isInWishlist,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
};
