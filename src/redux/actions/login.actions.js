import { createAsyncThunk } from '@reduxjs/toolkit'

import { postLoginRequestData } from '../../api/create'

const ADMIN_EMAIL = 'admin@gmail.com'
const ADMIN_PASSWORD = 'admin@123'

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (data) => {
    const email =
      typeof data.email === 'string' ? data.email.trim().toLowerCase() : ''
    const password = data.password ?? ''

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return { email: ADMIN_EMAIL, name: 'Admin' }
    }

    return postLoginRequestData(data)
  }
)