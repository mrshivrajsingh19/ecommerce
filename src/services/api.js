import axios from 'axios';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from './mockData';

const BASE_URL = 'https://fakestoreapi.com';
const TIMEOUT = 6000;

const apiClient = axios.create({ baseURL: BASE_URL, timeout: TIMEOUT });

// Try live API first, fall back to mock data
export const fetchProducts = async () => {
  try {
    const { data } = await apiClient.get('/products');
    return data;
  } catch {
    console.warn('Using mock products (API unreachable)');
    return MOCK_PRODUCTS;
  }
};

export const fetchProductById = async (id) => {
  // Check mock data first for speed
  const mock = MOCK_PRODUCTS.find((p) => p.id === Number(id));
  try {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  } catch {
    if (mock) return mock;
    throw new Error('Product not found');
  }
};

export const fetchCategories = async () => {
  try {
    const { data } = await apiClient.get('/products/categories');
    return data;
  } catch {
    return MOCK_CATEGORIES;
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const { data } = await apiClient.get(`/products/category/${category}`);
    return data;
  } catch {
    return MOCK_PRODUCTS.filter((p) => p.category === category);
  }
};
