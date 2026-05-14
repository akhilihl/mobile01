import { createAction, createReducer } from '@reduxjs/toolkit';

export interface UserState {
  user: Record<string, unknown> | null;
}

export const setUser = createAction<Record<string, unknown> | null>('SET_USER');

const initialState: UserState = {
  user: null,
};

const userReducer = createReducer(initialState, builder => {
  builder.addCase(setUser, (state, action) => {
    state.user = action.payload;
  });
});

export default userReducer;
