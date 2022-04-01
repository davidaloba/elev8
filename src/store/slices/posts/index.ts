import { createSlice } from '@reduxjs/toolkit'
import data from '@db/data'
import { HYDRATE } from 'next-redux-wrapper'
import axios from 'axios'

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
    FETCH_POSTS (state, action) {
      const { data } = axios.get(action.payload)
      return { ...state, posts: data }
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log('HYDRATE', action.payload.posts)
      return {
        ...state,
        ...action.payload.posts
      }
    }
  }

})

export const { FETCH_POSTS } = postsSlice.actions

export default postsSlice.reducer
