import { createAsyncThunk } from '@reduxjs/toolkit'

export const getPosts: Promise<any> = createAsyncThunk(
  'posts/getPosts',
  async (thunkAPI, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:3000/api/posts').then(
        (data) => data.json()
      )
      return res
    } catch (error) {
      return rejectWithValue('Opps there seems to be an error')
    }
  })
