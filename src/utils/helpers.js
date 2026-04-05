export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export const truncateText = (text, maxLength = 80) =>
  text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted;
  }
};

export const filterByCategory = (products, category) => {
  if (!category || category === 'all') return products;
  return products.filter((p) => p.category === category);
};

export const filterByPrice = (products, priceRange) => {
  if (!priceRange || priceRange === 'all') return products;
  const ranges = {
    '0-100': [0, 100],
    '100-500': [100, 500],
    '500-1000': [500, 1000],
    '1000+': [1000, Infinity],
  };
  const [min, max] = ranges[priceRange] || [0, Infinity];
  return products.filter((p) => p.price >= min && p.price <= max);
};

export const filterBySearch = (products, query) => {
  if (!query) return products;
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
};

export const calcCartTotal = (cartItems) =>
  cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

export const TAX_RATE = 0.08;

export const calcTax = (subtotal) => subtotal * TAX_RATE;
