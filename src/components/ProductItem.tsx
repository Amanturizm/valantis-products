import React from 'react';
import { Product } from '../types';

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  return (
    <div className="relative h-28 bg-blue-100 border-solid border-4 border-sky-500 rounded-lg py-2 px-3">
      <h1 className="text-base">{product.product}</h1>
      <p className="absolute left-3 bottom-1 font-medium">{product.brand}</p>
      <h3 className="absolute right-3 bottom-1 font-medium">{product.price}$</h3>
    </div>
  );
};

export default ProductItem;
