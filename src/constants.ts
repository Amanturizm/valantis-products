import { Params } from './types';

export const API_URL = 'http://api.valantis.store:40000/';

export enum ActionType {
  FILTER = 'filter',
  GET_IDS = 'get_ids',
  GET_ITEMS = 'get_items',
  GET_FIELDS = 'get_fields',
}

export const DEFAULT_GET_PARAMS: Params = {
  offset: 0,
  limit: 50,
};
