import { ActionType } from './constants';

export interface Params {
  ids?: ProductsIds;
  price?: number;
  offset?: number;
  limit?: number;
}

export interface ApiRequestBody {
  action: ActionType;
  params?: Params;
}

export interface ApiResponseResult<Data> {
  result: Data;
}

export type ProductsIds = string[];

export type ProductsIdsApiData = ApiResponseResult<ProductsIds>;

export interface Product {
  id: string;
  product: string;
  price: number;
  brand: string | null;
}

export type ProductsApiData = ApiResponseResult<Product[]>;
