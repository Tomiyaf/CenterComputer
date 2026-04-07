import { v4 as uuidv4 } from 'uuid';
import type { Product, Category, User } from '../types';

const PRODUCTS_KEY = 'centercomputer_products';
const CATEGORIES_KEY = 'centercomputer_categories';
const USER_KEY = 'centercomputer_user';

// --- Default Data ---
const defaultCategories: Category[] = [
  { id: uuidv4(), name: 'Laptop', subcategories: ['Gaming', 'Office', 'Ultrabook'] },
  { id: uuidv4(), name: 'Smartphone', subcategories: ['Android', 'iOS'] },
  { id: uuidv4(), name: 'Aksesoris', subcategories: ['Mouse', 'Keyboard', 'Headset'] },
];

const defaultProducts: Product[] = [
  {
    id: uuidv4(),
    name: 'ASUS ROG Zephyrus G14',
    price: 25000000,
    category: 'Laptop',
    subcategory: 'Gaming',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800',
    description: 'Laptop gaming ringan dengan performa buas. Dilengkapi prosesor AMD Ryzen 9 dan GPU NVIDIA RTX 3060.',
    createdAt: Date.now() - 10000,
  },
  {
    id: uuidv4(),
    name: 'MacBook Air M2',
    price: 18000000,
    category: 'Laptop',
    subcategory: 'Ultrabook',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    description: 'Desain tipis dan ringan dengan chip M2 yang sangat efisien.',
    createdAt: Date.now() - 20000,
  },
  {
    id: uuidv4(),
    name: 'iPhone 14 Pro',
    price: 20000000,
    category: 'Smartphone',
    subcategory: 'iOS',
    image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&q=80&w=800',
    description: 'Kamera pro 48MP, Dynamic Island, dan chip A16 Bionic.',
    createdAt: Date.now() - 30000,
  },
  {
    id: uuidv4(),
    name: 'Logitech G Pro X Superlight',
    price: 2000000,
    category: 'Aksesoris',
    subcategory: 'Mouse',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
    description: 'Mouse gaming nirkabel paling ringan dari Logitech.',
    createdAt: Date.now() - 40000,
  }
];

// --- Initialization ---
export const initializeData = () => {
  if (!localStorage.getItem(CATEGORIES_KEY)) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
  }
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
  }
};

// --- Products CRUD ---
export const getProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getProductById = (id: string): Product | undefined => {
  return getProducts().find(p => p.id === id);
};

export const saveProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: uuidv4(),
    createdAt: Date.now(),
  };
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const updateProduct = (id: string, updatedData: Partial<Product>) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedData };
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }
};

export const deleteProduct = (id: string) => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
};

// --- Categories CRUD ---
export const getCategories = (): Category[] => {
  const data = localStorage.getItem(CATEGORIES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCategory = (name: string) => {
  const categories = getCategories();
  categories.push({ id: uuidv4(), name, subcategories: [] });
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

export const updateCategory = (id: string, name: string) => {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === id);
  if (index !== -1) {
    categories[index].name = name;
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }
};

export const deleteCategory = (id: string) => {
  const categories = getCategories();
  const filtered = categories.filter(c => c.id !== id);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(filtered));
};

export const addSubcategory = (categoryId: string, subcategoryName: string) => {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === categoryId);
  if (index !== -1 && !categories[index].subcategories.includes(subcategoryName)) {
    categories[index].subcategories.push(subcategoryName);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }
};

export const removeSubcategory = (categoryId: string, subcategoryName: string) => {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === categoryId);
  if (index !== -1) {
    categories[index].subcategories = categories[index].subcategories.filter(s => s !== subcategoryName);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }
};

// --- Auth ---
export const login = (): boolean => {
  localStorage.setItem(USER_KEY, JSON.stringify({ username: 'admin', isLoggedIn: true }));
  return true;
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const isLoggedIn = (): boolean => {
  const data = localStorage.getItem(USER_KEY);
  if (data) {
    const user: User = JSON.parse(data);
    return user.isLoggedIn;
  }
  return false;
};