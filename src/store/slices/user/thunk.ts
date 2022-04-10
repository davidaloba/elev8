import { createAsyncThunk } from '@reduxjs/toolkit'

export const login: Promise<any> = createAsyncThunk(
  'user/login',

  async (url, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const res = await fetch(url).then(
        (data) => data.json()
      )
      return res
    } catch (error) {
      return rejectWithValue('Opps there seems to be an error')
    }
  })