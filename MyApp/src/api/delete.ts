import { deleteDataApi } from './actions';
import { URL_CONSTANTS } from './urls';

export const deleteCustomer = (id: string | number): Promise<unknown> =>
  deleteDataApi(URL_CONSTANTS.customers, id);

export const deleteSubscription = (id: string | number): Promise<unknown> =>
  deleteDataApi(URL_CONSTANTS.subscriptions, id);
