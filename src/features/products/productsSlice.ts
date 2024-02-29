import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductsIds } from './productsThunk';
import { Product, ProductsIds } from '../../types';

interface State {
  productsIds: ProductsIds;
  products: Product[];
  productsLoading: boolean;
  productsError: string | null;
  currentPage: number;
}

const initialState: State = {
  productsIds: [],
  products: [],
  productsLoading: false,
  productsError: null,
  currentPage: 0,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }: PayloadAction<'next' | 'prev'>) => {
      if (payload === 'next') state.currentPage++;
      if (payload === 'prev' && state.currentPage > 0) state.currentPage--;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsIds.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(fetchProductsIds.rejected, (state, { payload: error }) => {
      state.productsError = error || null;
      state.productsLoading = false;
    });
    builder.addCase(fetchProductsIds.fulfilled, (state, { payload }) => {
      state.productsIds = filterArray(payload) as ProductsIds;
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state, { payload: error }) => {
      state.productsError = error || null;
      state.productsLoading = false;
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.products = filterArray(payload) as Product[];
      state.productsLoading = false;
    });
  },
});

function filterArray(arr: ProductsIds | Product[]): (string | Product)[] {
  const isStringArray: boolean = typeof arr[0] === 'string';

  const filteredArray = [...arr];

  for (let i = 0; i < filteredArray.length; i++) {
    const id = isStringArray ? (filteredArray[i] as string) : (filteredArray[i] as Product).id;

    for (let j = i + 1; j < filteredArray.length; j++) {
      const id2 = isStringArray ? (filteredArray[j] as string) : (filteredArray[j] as Product).id;

      if (id === id2) {
        filteredArray.splice(j, 1);
      }
    }
  }

  return filteredArray;
}

export const productsReducer = productsSlice.reducer;
export const { setCurrentPage } = productsSlice.actions;
