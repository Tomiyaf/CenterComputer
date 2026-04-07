export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export interface User {
  username: string;
  isLoggedIn: boolean;
}