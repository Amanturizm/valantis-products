import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {
  ApiRequestBody,
  Product,
  ProductsApiData,
  ProductsIds,
  ProductsIdsApiData,
} from '../../types';

export const fetchProductsIds = createAsyncThunk<ProductsIds, ApiRequestBody>(
  'products/fetchIds',
  async (body) => {
    const { data } = await axiosApi.post<ProductsIdsApiData>('/', body);
    return data.result;
  },
);

export const fetchProducts = createAsyncThunk<Product[], ApiRequestBody>(
  'products/fetchItems',
  async (body) => {
    const { data } = await axiosApi.post<ProductsApiData>('/', body);
    return data.result;
  },
);
