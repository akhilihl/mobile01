import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slices/login.slice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
})