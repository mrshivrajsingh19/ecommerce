import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { FiFilter, FiX } from 'react-icons/fi';

const CATEGORY_TABS = ['all', 'electronics', "women's clothing", "men's clothing", 'jewelery'];

export default function Products() {
  const [searchParams] = useSearchParams();
  const {
    products,
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
  } = useProducts();

  const [inputVal, setInputVal] = useState(searchParams.get('q') || '');
  const debouncedSearch = useDebounce(inputVal, 400);
  const [showFilters, setShowFilters] = useState(false);

  // URL param sync
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    const sort = searchParams.get('sort');
    if (q) setInputVal(q);
    if (cat) setSelectedCategory(cat);
    if (sort) setSortBy(sort);
  }, []);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  if (error) {
    return (
      <div className="error-state">
        <span>⚠️</span>
        <h3>{error}</h3>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-header">
        <div>
          <h1 className="page-title">All Products</h1>
          <p className="page-sub">
            {loading ? 'Loading...' : `${products.length} product${products.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
        <button
          className="btn btn-ghost mobile-filter-toggle"
          onClick={() => setShowFilters((o) => !o)}
        >
          {showFilters ? <FiX /> : <FiFilter />}
          Filters
        </button>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {(categories.length ? categories : CATEGORY_TABS).map((cat) => (
          <button
            key={cat}
            className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="products-layout">
        {/* Sidebar */}
        <div className={`filters-wrapper ${showFilters ? 'open' : ''}`}>
          <Filters
            categories={categories.length ? categories : CATEGORY_TABS}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {/* Main */}
        <div className="products-main">
          <SearchBar
            value={inputVal}
            onChange={setInputVal}
            placeholder="Search products by name, description..."
          />
          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  );
}
