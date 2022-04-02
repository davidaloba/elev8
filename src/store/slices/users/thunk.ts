import { createAsyncThunk } from '@reduxjs/toolkit'

export const getUsers: Promise<any> = createAsyncThunk(
  'users/getUsers',
  async (thunkAPI, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:3000/api/users').then(
        (data) => data.json()
      )
      return res
    } catch (error) {
      return rejectWithValue('Opps there seems to be an error')
    }
  })
