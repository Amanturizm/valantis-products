import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchProducts, fetchProductsIds } from './productsThunk';
import { ActionType, PRODUCTS_LENGTH } from '../../constants';
import ProductItem from '../../components/ProductItem';

const Products = () => {
  const dispatch = useAppDispatch();
  const { currentPage, productsIds, products, productsError } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(
      fetchProductsIds({
        action: ActionType.GET_IDS,
        params: { offset: currentPage * PRODUCTS_LENGTH, limit: PRODUCTS_LENGTH },
      }),
    );
  }, [dispatch, currentPage, productsError]);

  useEffect(() => {
    if (productsIds.length) {
      dispatch(fetchProducts({ action: ActionType.GET_ITEMS, params: { ids: productsIds } }));
    }
  }, [dispatch, productsIds, productsError]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Products;
