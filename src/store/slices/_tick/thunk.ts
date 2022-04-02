import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTick: Promise<any> = createAsyncThunk(
  '_tick/fetch_tick',
  async (thunkAPI, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:3000/api/_tick').then(
        (data) => data.json()
      )
      return res
    } catch (error) {
      return rejectWithValue('Opps there seems to be an error')
    }
  })
