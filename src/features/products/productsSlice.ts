import { createSlice } from '@reduxjs/toolkit';
import { fetchProductsIds, fetchProducts } from './productsThunk';
import { ProductsIds, Product } from '../../types';

interface State {
  productsIds: ProductsIds;
  products: Product[];
  productsLoading: boolean;
}

const initialState: State = {
  productsIds: [],
  products: [],
  productsLoading: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsIds.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(fetchProductsIds.rejected, (state) => {
      state.productsLoading = false;
    });
    builder.addCase(fetchProductsIds.fulfilled, (state, { payload }) => {
      state.productsIds = payload;
      state.productsLoading = false;
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.productsLoading = false;
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.products = payload;
      state.productsLoading = false;
    });
  },
});

export const productsReducer = productsSlice.reducer;
