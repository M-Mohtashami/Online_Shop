import { ProductProps, FilteredDataType } from '@/interfaces/inretfaces';
import { createContext } from 'react';

const initProduct = {
  products: {
    status: '',
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
    data: {
      products: [],
    },
  },
  categories: {
    status: '',
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
    data: {
      categories: [],
    },
  },
  subcategories: {
    status: '',
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
    data: {
      subcategories: [],
    },
  },
};

const initFilter = {
  subcategories: [],
  categories: [],
};

export const ProductDataContext = createContext<ProductProps>(initProduct);
export const FilterContext = createContext<FilteredDataType>(initFilter);
