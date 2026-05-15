import { getListByApi, ListParams } from './actions';
import { URL_CONSTANTS } from './urls';

export const getContactMessages = (params?: ListParams): Promise<unknown> =>
  getListByApi(URL_CONSTANTS.contacts, params);

export const getCustomerList = (params?: ListParams): Promise<unknown> =>
  getListByApi(URL_CONSTANTS.customers, params);

export const getSubscriptionList = (params?: ListParams): Promise<unknown> =>
  getListByApi(URL_CONSTANTS.subscriptions, params);
