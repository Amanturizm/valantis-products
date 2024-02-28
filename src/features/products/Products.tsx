import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchProducts, fetchProductsIds } from './productsThunk';
import { ActionType } from '../../constants';

const Products = () => {
  const dispatch = useAppDispatch();
  const { productsIds, products } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (productsIds.length > 0) {
      dispatch(fetchProducts({ action: ActionType.GET_ITEMS, params: { ids: productsIds } }));
    } else {
      dispatch(fetchProductsIds({ action: ActionType.GET_IDS, params: { offset: 3, limit: 10 } }));
    }
  }, [dispatch, productsIds]);

  return <div>{JSON.stringify(products)}</div>;
};

export default Products;
