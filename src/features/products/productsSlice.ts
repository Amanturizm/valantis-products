import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductsIds } from './productsThunk';
import { ActionType } from '../../constants';
import { Product, ProductsIds } from '../../types';

interface State {
  productsIds: ProductsIds | null;
  products: Product[];
  productsLoading: boolean;
  productsError: string | null;
  currentPage: number;
  lastActionType: ActionType | null;
}

const initialState: State = {
  productsIds: null,
  products: [],
  productsLoading: false,
  productsError: null,
  currentPage: 0,
  lastActionType: null,
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
      state.productsError = null;
    });
    builder.addCase(fetchProductsIds.rejected, (state, action) => {
      state.productsError = action.payload || null;
      state.productsLoading = false;
      state.lastActionType = action.meta.arg.action;
    });
    builder.addCase(fetchProductsIds.fulfilled, (state, action) => {
      if (!action.payload.length) {
        state.productsIds = null;
        state.products = [];
        state.productsLoading = false;
      } else {
        state.productsIds = filterArray(action.payload) as ProductsIds;
      }

      state.productsError = null;
      state.lastActionType = action.meta.arg.action;
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.productsLoading = true;
      state.productsError = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.productsError = action.payload || null;
      state.productsLoading = false;
      state.lastActionType = action.meta.arg.action;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = filterArray(action.payload) as Product[];
      state.productsIds = null;
      state.productsLoading = false;
      state.productsError = null;
      state.lastActionType = action.meta.arg.action;
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
