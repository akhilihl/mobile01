import { viewDataByApi } from './actions';
import { URL_CONSTANTS } from './urls';

export const SystemUsersId = (id: string | number): Promise<unknown> =>
  viewDataByApi(URL_CONSTANTS.system_users, id);

export const getRoleIdData = (id: string | number): Promise<unknown> =>
  viewDataByApi(URL_CONSTANTS.roles, id);

export const getCustomersIdData = (id: string | number): Promise<unknown> =>
  viewDataByApi(URL_CONSTANTS.customers, id);
