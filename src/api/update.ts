import { putDataApi } from './actions';
import { URL_CONSTANTS } from './urls';

export const updateCustomer = (params: Record<string, unknown>, id: string | number): Promise<unknown> =>
  putDataApi(URL_CONSTANTS.customers, params, id);

export const updateSubscription = (params: Record<string, unknown>, id: string | number): Promise<unknown> =>
  putDataApi(URL_CONSTANTS.subscriptions, params, id);

export const updateSystemUser = (params: Record<string, unknown>, id: string | number): Promise<unknown> =>
  putDataApi(URL_CONSTANTS.system_users, params, id);

export const updateRoleAccess = (params: Record<string, unknown>, id: string | number): Promise<unknown> =>
  putDataApi(URL_CONSTANTS.roles, params, id);

export const updateBlog = (params: Record<string, unknown>, id: string | number): Promise<unknown> =>
  putDataApi(URL_CONSTANTS.blogs, params, id);

export const updateBlogCategories = (params: Record<string, unknown>, id: string | number): Promise<unknown> =>
  putDataApi(URL_CONSTANTS.blogsCategories, params, id);
