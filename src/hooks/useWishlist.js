import { useCartContext } from '../context/CartContext';

export function useWishlist() {
  const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist } =
    useCartContext();
  return { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist };
}
