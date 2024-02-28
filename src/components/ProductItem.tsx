import React from 'react';
import { Product } from '../types';

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  return (
    <div className="border-solid border-2 border-sky-500 rounded-lg py-2 px-3">
      <h4>{product.product}</h4>
      <p>{product.brand}</p>
      <h3>{product.price}$</h3>
    </div>
  );
};

export default ProductItem;
