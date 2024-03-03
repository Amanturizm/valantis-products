import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';
import {
  ApiRequestBody,
  Product,
  ProductsApiData,
  ProductsIds,
  ProductsIdsApiData,
} from '../../types';

export const fetchProductsIds = createAsyncThunk<
  ProductsIds,
  ApiRequestBody,
  { rejectValue: string }
>('products/fetchIds', async (body, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post<ProductsIdsApiData>('/', body);
    return data.result;
  } catch (e) {
    if (isAxiosError(e)) {
      console.error('Error when requesting a product:', e.message);
      return rejectWithValue(e.message);
    }

    throw e;
  }
});

export const fetchProducts = createAsyncThunk<Product[], ApiRequestBody, { rejectValue: string }>(
  'products/fetchItems',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.post<ProductsApiData>('/', body);
      return data.result;
    } catch (e) {
      if (isAxiosError(e)) {
        console.error('Error when requesting a product:', e.message);
        return rejectWithValue(e.message);
      }

      throw e;
    }
  },
);
