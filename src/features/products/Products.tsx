import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchProducts, fetchProductsIds } from './productsThunk';
import { ActionType, DEFAULT_GET_PARAMS } from '../../constants';
import ProductItem from '../../components/ProductItem';

const Products = () => {
  const dispatch = useAppDispatch();
  const { productsIds, products } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (productsIds.length > 0) {
      dispatch(fetchProducts({ action: ActionType.GET_ITEMS, params: { ids: productsIds } }));
    } else {
      dispatch(fetchProductsIds({ action: ActionType.GET_IDS, params: DEFAULT_GET_PARAMS }));
    }
  }, [dispatch, productsIds]);

  return (
    <div className="grid grid-cols-4 gap-4 mt-8">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Products;
