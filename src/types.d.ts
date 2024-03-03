import { ActionType } from './constants';

export interface Params {
  ids?: ProductsIds;
  offset?: number | null;
  limit?: number | null;
  price?: number | null;
  product?: string | null;
  brand?: string | null;
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

export interface ProductsFilterFields {
  product: string;
  price: string;
  brand: string;
}
