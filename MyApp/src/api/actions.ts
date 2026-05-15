import { hostConfig } from './config';
import { URL_CONSTANTS } from './urls';

// In-memory token store (call setTokenStore after login/logout).
// For persistence across app restarts, hydrate this from AsyncStorage on app launch.
const tokenStore: {
  token: string | null;
  refreshToken: string | null;
  accessExpiry: string | null;
  refreshExpiry: string | null;
  loggedUser: string | null;
} = {
  token: null,
  refreshToken: null,
  accessExpiry: null,
  refreshExpiry: null,
  loggedUser: null,
};

export const setTokenStore = (values: Partial<typeof tokenStore>): void => {
  Object.assign(tokenStore, values);
};

export const clearTokenStore = (): void => {
  tokenStore.token = null;
  tokenStore.refreshToken = null;
  tokenStore.accessExpiry = null;
  tokenStore.refreshExpiry = null;
  tokenStore.loggedUser = null;
};

// Callback invoked when the session expires (e.g. navigate to login screen).
let onSessionExpired: (() => void) | null = null;

export const setSessionExpiredCallback = (callback: () => void): void => {
  onSessionExpired = callback;
};

export interface ListParams {
  limit?: number;
  customerId?: string;
  assignTo?: string;
  taskType?: string;
  candidateId?: string;
  token?: string;
  next?: string;
  previous?: string;
  lastKey?: string;
  currentPage?: number;
  organizationName?: string;
  sortBy?: string;
  userId?: string;
  orgId?: string;
  isActive?: boolean | string;
  designation?: string;
  search?: string;
  action?: string;
  jobId?: string;
}

const reLogin = async (): Promise<void> => {
  if (!tokenStore.loggedUser) {
    onSessionExpired?.();
    return;
  }

  if (tokenStore.accessExpiry) {
    const accessExpiryTime = new Date(tokenStore.accessExpiry);
    const currentDate = new Date();

    if (accessExpiryTime < currentDate) {
      const params = { refreshToken: tokenStore.refreshToken };
      try {
        const response = await fetch(
          `${hostConfig.API_URL}${URL_CONSTANTS.refreshToken}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(params),
          },
        );
        const res = await response.json();
        setTokenStore({
          token: res.access?.token ?? null,
          refreshToken: res.refresh?.token ?? null,
          accessExpiry: res.access?.expires ?? null,
          refreshExpiry: res.refresh?.expires ?? null,
        });
      } catch (err) {
        errorHandler(err);
      }
    }
  } else {
    clearTokenStore();
    onSessionExpired?.();
  }
};

const responseStatusHandler = async (
  response: Response,
): Promise<Response | {error: string}> => {
  switch (response.status) {
    case 400:
      return response;
    case 401:
      await reLogin();
      return {error: 'Unauthorized'};
    case 402:
      return {error: 'Payment Required'};
    case 403:
      return {error: 'Forbidden'};
    case 405:
      return {error: 'Method Not Allowed'};
    case 406:
      return {error: 'Not Acceptable'};
    case 408:
      return {error: 'Request Timeout'};
    case 410:
      return {error: 'Permanently deleted from server'};
    case 500:
      return {error: 'Internal Server Error'};
    case 501:
      return {error: 'Not Implemented'};
    case 502:
      return {error: 'Bad Gateway'};
    case 503:
      return {error: 'Service Unavailable'};
    case 504:
      return {error: 'Gateway Timeout'};
    case 511:
      return {error: 'Network Authentication Required'};
    case 200:
    case 201:
    default:
      return response;
  }
};

const errorHandler = (error: unknown): unknown => error;

export const postDataApi = async (
  requestUrl: string,
  params: Record<string, unknown>,
): Promise<unknown> => {
  const result = await fetch(`${hostConfig.API_URL}${requestUrl}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${tokenStore.token}`,
    },
    body: JSON.stringify(params),
  })
    .then(response => responseStatusHandler(response))
    .catch(err => errorHandler(err));

  if (result && typeof result === 'object' && 'status' in result) {
    const res = result as Response;
    const status = res.status;
    if (status === 200 || status === 201 || status === 400 || status === 409 || status === 404) {
      return res.json();
    }
  }
  return result;
};

export const getListByApi = async (
  requestUrl: string,
  params?: ListParams,
): Promise<unknown> => {
  let getParams = '?';

  if (params?.limit != null) { getParams += `limit=${params.limit}`; }
  if (params?.customerId != null) { getParams += `customerId=${params.customerId}`; }
  if (params?.assignTo) { getParams += `assignTo=${params.assignTo}`; }
  if (params?.taskType) { getParams += `taskType=${params.taskType}`; }
  if (params?.candidateId) { getParams += `candidateId=${params.candidateId}`; }
  if (params?.token != null) { getParams += `token=${params.token}`; }
  if (params?.next != null) { getParams += `&next=${params.next}`; }
  if (params?.previous != null) { getParams += `&previous=${params.previous}`; }
  if (params?.lastKey != null) { getParams += `&lastKey=${params.lastKey}`; }
  if (params?.currentPage != null) { getParams += `&page=${params.currentPage}`; }
  if (params?.organizationName != null) { getParams += `&organizationName=${params.organizationName}`; }
  if (params?.sortBy != null) { getParams += `&sortBy=${params.sortBy}`; }
  if (params?.userId != null) { getParams += `&userId=${params.userId}`; }
  if (params?.orgId != null) { getParams += `&orgId=${params.orgId}`; }
  if (params?.isActive != null && params.isActive !== '') { getParams += `&isActive=${params.isActive}`; }
  if (params?.designation != null) { getParams += `&designation=${params.designation}`; }
  if (params?.search != null) { getParams += `&search=${params.search}`; }
  if (params?.action != null && params.action !== '') { getParams += `&action=${params.action}`; }
  if (params?.jobId != null) { getParams += `&jobId=${params.jobId}`; }

  return fetch(`${hostConfig.API_URL}${requestUrl}${getParams}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${tokenStore.token}`,
    },
  })
    .then(response => responseStatusHandler(response))
    .then(result => (result as Response).json())
    .catch(error => errorHandler(error));
};

export const viewDataByApi = (
  requestUrl: string,
  dataId: string | number,
): Promise<unknown> =>
  fetch(`${hostConfig.API_URL}${requestUrl}/${dataId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${tokenStore.token}`,
    },
  })
    .then(response => responseStatusHandler(response))
    .then(result => {
      const res = result as Response;
      return res.status === 200 || res.status === 201 || res.status === 400
        ? res.json()
        : result;
    })
    .catch(error => errorHandler(error));

export const putDataApi = (
  requestUrl: string,
  params: Record<string, unknown>,
  id: string | number,
  roleId?: string | number,
  designation?: string,
  method?: string,
): Promise<unknown> => {
  let getParams = '';
  if (roleId != null) { getParams += `/${roleId}`; }
  if (designation) { getParams += `?designation=${designation}`; }
  if (method) { getParams += `&method=${method}`; }

  return fetch(`${hostConfig.API_URL}${requestUrl}/${id}${getParams}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${tokenStore.token}`,
    },
    body: JSON.stringify(params),
  })
    .then(response => responseStatusHandler(response))
    .then(result => {
      const res = result as Response;
      return res.status === 200 || res.status === 201 || res.status === 400
        ? res.json()
        : result;
    })
    .catch(error => errorHandler(error));
};

export const deleteDataApi = (
  requestUrl: string,
  id: string | number,
): Promise<unknown> =>
  fetch(`${hostConfig.API_URL}${requestUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${tokenStore.token}`,
    },
  })
    .then(response => responseStatusHandler(response))
    .then(result => {
      const res = result as Response;
      return res.status === 200 || res.status === 201 || res.status === 400
        ? res.json()
        : result;
    })
    .catch(error => errorHandler(error));

export const downloadApi = async (
  requestUrl: string,
  dataId: string | number,
): Promise<unknown> => {
  try {
    const response = await fetch(
      `${hostConfig.API_URL}${requestUrl}?candidateId=${dataId}`,
      {method: 'GET', headers: {Accept: 'application/pdf'}},
    );
    const result = await responseStatusHandler(response);
    if ('error' in result) { return result; }
    const res = result as Response;
    return res.status === 200 || res.status === 201 || res.status === 400
      ? res.arrayBuffer()
      : result;
  } catch (error) {
    return errorHandler(error);
  }
};
