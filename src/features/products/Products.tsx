import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchProducts, fetchProductsIds } from './productsThunk';
import { ActionType, PRODUCTS_LENGTH } from '../../constants';
import ProductsFilter from '../../components/ProductsFilter';
import ProductItem from '../../components/ProductItem';

const Products = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.products);
  const { productsIds, products, productsError, currentPage, lastActionType } = state;

  const fetchProductsIdsCallback = useCallback(() => {
    dispatch(
      fetchProductsIds({
        action: ActionType.GET_IDS,
        params: { offset: currentPage * PRODUCTS_LENGTH, limit: PRODUCTS_LENGTH },
      }),
    );
  }, [dispatch, currentPage]);

  useEffect(() => {
    fetchProductsIdsCallback();
  }, [fetchProductsIdsCallback]);

  useEffect(() => {
    if (productsError && lastActionType === ActionType.GET_IDS) {
      fetchProductsIdsCallback();
    }
  }, [fetchProductsIdsCallback, productsError, lastActionType]);

  useEffect(() => {
    if (
      productsIds !== null &&
      ((!productsError && lastActionType !== ActionType.GET_ITEMS) ||
        (productsError && lastActionType === ActionType.GET_ITEMS))
    ) {
      dispatch(
        fetchProducts({
          action: ActionType.GET_ITEMS,
          params: { ids: productsIds },
        }),
      );
    }
  }, [dispatch, productsIds, productsError, lastActionType]);

  return (
    <div className="mb-8">
      <ProductsFilter />

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
