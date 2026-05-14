import { postDataApi } from './actions';
import { URL_CONSTANTS } from './urls';

export const postLoginRequestData = (params: Record<string, unknown>): Promise<unknown> =>
  postDataApi(URL_CONSTANTS.login, params);

export const postLogoutRequestData = (params: Record<string, unknown>): Promise<unknown> =>
  postDataApi(URL_CONSTANTS.logout, params);

export const createCustomer = (params: Record<string, unknown>): Promise<unknown> =>
  postDataApi(URL_CONSTANTS.customers, params);

export const createSubscription = (params: Record<string, unknown>): Promise<unknown> =>
  postDataApi(URL_CONSTANTS.subscriptions, params);

export const createSystemUser = (params: Record<string, unknown>): Promise<unknown> =>
  postDataApi(URL_CONSTANTS.system_users, params);

export const createNewRole = (params: Record<string, unknown>): Promise<unknown> =>
  postDataApi(URL_CONSTANTS.roles, params);

export const subDomainVerification = (params: Record<string, unknown>): Promise<unknown> =>
  postDataApi(URL_CONSTANTS.check_subdomain, params);

export const RetryProgressAPI = (params: Record<string, unknown>): Promise<unknown> =>
  postDataApi(URL_CONSTANTS.retry, params);

export const SubscriptionHistory = (params: Record<string, unknown>): Promise<unknown> =>
  postDataApi(URL_CONSTANTS.subscription_history, params);

export const createBlog = (params: Record<string, unknown>): Promise<unknown> =>
  postDataApi(URL_CONSTANTS.blogs, params);

export const AddBlogCategory = (params: Record<string, unknown>): Promise<unknown> =>
  postDataApi(URL_CONSTANTS.blogsCategories, params);
