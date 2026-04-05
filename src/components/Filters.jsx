export default function Filters({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedPriceRange,
  setSelectedPriceRange,
  sortBy,
  setSortBy,
}) {
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-100', label: '$0 – $100' },
    { value: '100-500', label: '$100 – $500' },
    { value: '500-1000', label: '$500 – $1000' },
    { value: '1000+', label: '$1000+' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low → High' },
    { value: 'price-desc', label: 'Price: High → Low' },
    { value: 'rating', label: 'Top Rated' },
  ];

  return (
    <aside className="filters-sidebar">
      <div className="filter-section">
        <h4 className="filter-heading">Categories</h4>
        <ul className="filter-list">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`filter-item ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h4 className="filter-heading">Price Range</h4>
        <ul className="filter-list">
          {priceRanges.map((r) => (
            <li key={r.value}>
              <button
                className={`filter-item ${selectedPriceRange === r.value ? 'active' : ''}`}
                onClick={() => setSelectedPriceRange(r.value)}
              >
                {r.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h4 className="filter-heading">Sort By</h4>
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
