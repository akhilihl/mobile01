import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import loginReducer from '../slices/login.slice';
import userReducer from '../reducers/userReducer';
import tokenReducer from '../reducers/tokenReducer';
import { signinApi, signupApi, logoutApi } from '../api/authApi';

const rootReducer = combineReducers({
  login: loginReducer,
  userState: userReducer,
  tokenState: tokenReducer,
  [signinApi.reducerPath]: signinApi.reducer,
  [signupApi.reducerPath]: signupApi.reducer,
  [logoutApi.reducerPath]: logoutApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefault =>
    getDefault({ immutableCheck: false, serializableCheck: false })
      .concat(signinApi.middleware)
      .concat(signupApi.middleware)
      .concat(logoutApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export default store;
