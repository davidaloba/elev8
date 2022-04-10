import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPosts: Promise<any> = createAsyncThunk(
  'posts/fetchPosts',

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
