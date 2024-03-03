import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { fetchProductsIds } from '../features/products/productsThunk';
import { ActionType, PRODUCTS_LENGTH } from '../constants';
import TextField from './UI/TextField';
import { Params, ProductsFilterFields } from '../types';
import fontIcon from '../assets/images/font.svg';
import copyrightIcon from '../assets/images/copyright.svg';
import magnifyingGlassIcon from '../assets/images/magnifying-glass.svg';
import reloadIcon from '../assets/images/reload.svg';

const initialState: ProductsFilterFields = {
  product: '',
  price: '',
  brand: '',
};

const ProductsFilter = () => {
  const dispatch = useAppDispatch();
  const productsState = useAppSelector((state) => state.products);
  const { currentPage, productsLoading, productsError, lastActionType } = productsState;

  const [state, setState] = useState<ProductsFilterFields>(initialState);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    setIsDisabled(productsLoading || !Object.values(state).join(''));
  }, [productsLoading, state]);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'price' && isNaN(Number(value.trim()))) return;

    setState({ ...initialState, [name]: value === ' ' ? '' : value });
  };

  const sendData = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();

      const keys = Object.keys(state) as Array<keyof ProductsFilterFields>;

      keys.forEach((key) => {
        if (!state[key]) return;

        const params: Params = {
          [key]: key === 'price' ? parseFloat(state[key]) : state[key],
          limit: PRODUCTS_LENGTH,
        };

        dispatch(fetchProductsIds({ action: ActionType.FILTER, params }));
      });
    },
    [dispatch, state],
  );

  useEffect(() => {
    if (productsError && lastActionType === ActionType.FILTER) {
      sendData();
    }
  }, [productsError, lastActionType, sendData]);

  return (
    <form
      className="flex justify-center items-center gap-5 mb-8 flex-col sm:flex-row"
      onSubmit={sendData}
    >
      <div className="w-full flex flex-col gap-8 sm:gap-5 sm:flex-row">
        <TextField
          name="product"
          value={state.product}
          onChange={changeValue}
          label="Product"
          icon={<img className="w-4 h-4" src={fontIcon} alt="font-icon" />}
        />
        <TextField
          name="price"
          value={state.price}
          onChange={changeValue}
          label="Price"
          icon="$"
          placeholder="0.00"
        />
        <TextField
          name="brand"
          value={state.brand}
          onChange={changeValue}
          label="Brand"
          icon={<img className="w-4 h-4" src={copyrightIcon} alt="copyright-icon" />}
        />
      </div>

      <button
        type="submit"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 pl-3 pr-5 rounded"
        style={{
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          opacity: isDisabled ? 0.8 : 1,
        }}
        disabled={isDisabled}
      >
        Search
        <img className="w-4 h-4" src={magnifyingGlassIcon} alt="magnifying-glass-icon" />
      </button>

      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
        style={{
          cursor: productsLoading ? 'not-allowed' : 'pointer',
          opacity: productsLoading ? 0.8 : 1,
        }}
        disabled={productsLoading}
        onClick={() => {
          dispatch(
            fetchProductsIds({
              action: ActionType.GET_IDS,
              params: { offset: currentPage * PRODUCTS_LENGTH, limit: PRODUCTS_LENGTH },
            }),
          );
          setState(initialState);
        }}
      >
        <img className="w-5 h-5" src={reloadIcon} alt="reload-icon" />
      </button>
    </form>
  );
};

export default ProductsFilter;
