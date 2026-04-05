import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ value, onChange, placeholder = 'Search products...' }) {
  return (
    <div className="search-bar">
      <FiSearch className="sb-icon" />
      <input
        type="text"
        className="sb-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="sb-clear" onClick={() => onChange('')} aria-label="Clear search">
          <FiX />
        </button>
      )}
    </div>
  );
}
