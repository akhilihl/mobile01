import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: Record<string, unknown> | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Record<string, unknown> | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
