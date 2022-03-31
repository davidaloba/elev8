import { createSlice } from '@reduxjs/toolkit'
import data from '@db/data'
import db from '@db'

interface IPosts {
  posts: ({} | string | boolean | number)[];
}

const initialState: IPosts = {
  posts: data.posts
}

const postsSlice: any = createSlice({
  name: 'posts',

  initialState,

  reducers: {
    FETCH_POSTS: (state, action) => {
      return { ...state, posts: action.payload }
    }
  },

  extraReducers: {
    HYDRATE: (state, action) => {
      console.log('HYDRATE', action.payload)
      return {
        ...state,
        ...action.payload.subject
      }
    }
  }

})

export const { FETCH_POSTS } = postsSlice.actions

export default postsSlice.reducer
