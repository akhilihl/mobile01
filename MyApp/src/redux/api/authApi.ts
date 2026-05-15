// Requires: npm install @reduxjs/toolkit react-redux
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { hostConfig } from '../../api/config';
import { URL_CONSTANTS } from '../../api/urls';
import { GetValue } from '../../utils/storageUtils';

const baseURL = hostConfig.API_URL;

const authHeaders = async (headers: Headers): Promise<Headers> => {
  const result = await GetValue<string>('accessToken');
  if (result.status === 'success' && result.data) {
    headers.set('Authorization', `Bearer ${result.data}`);
  }
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');
  return headers;
};

export const signinApi = createApi({
  reducerPath: 'signinApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: builder => ({
    signIn: builder.mutation<unknown, { phone_number: string; country_code: string; method: string }>({
      query: data => ({ url: URL_CONSTANTS.login, method: 'POST', body: data }),
    }),
  }),
});
export const { useSignInMutation } = signinApi;

export const signupApi = createApi({
  reducerPath: 'signupApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: builder => ({
    signUp: builder.mutation<unknown, { phone_number: string; otp: string; method: string; country_code: string }>({
      query: data => ({ url: URL_CONSTANTS.REGISTER, method: 'POST', body: data }),
    }),
  }),
});
export const { useSignUpMutation } = signupApi;

export const logoutApi = createApi({
  reducerPath: 'logoutApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, prepareHeaders: authHeaders }),
  endpoints: builder => ({
    logout: builder.mutation<unknown, void>({
      query: () => ({ url: URL_CONSTANTS.logout, method: 'PUT' }),
    }),
  }),
});
export const { useLogoutMutation } = logoutApi;
