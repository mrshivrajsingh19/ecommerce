import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';
import {
  sortProducts,
  filterByCategory,
  filterByPrice,
  filterBySearch,
} from '../utils/helpers';

export function useProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [products, cats] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setAllProducts(products);
        setCategories(['all', ...cats]);
      } catch (err) {
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredProducts = sortProducts(
    filterBySearch(
      filterByPrice(filterByCategory(allProducts, selectedCategory), selectedPriceRange),
      searchQuery
    ),
    sortBy
  );

  return {
    allProducts,
    products: filteredProducts,
    categories,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriceRange,
    setSelectedPriceRange,
    sortBy,
    setSortBy,
  };
}
