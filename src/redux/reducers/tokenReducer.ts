import { createAction, createReducer } from '@reduxjs/toolkit';

export interface TokenState {
  token: string | null;
}

export const setToken = createAction<string | null>('SET_TOKEN');

const initialState: TokenState = {
  token: null,
};

const tokenReducer = createReducer(initialState, builder => {
  builder.addCase(setToken, (state, action) => {
    state.token = action.payload;
  });
});

export default tokenReducer;
