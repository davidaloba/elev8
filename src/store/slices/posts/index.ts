import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import data from '@db/data'
import { fetchPosts, save } from './thunk'

interface IPosts {
  loading: boolean,
  all: ({} | string | boolean | number)[]
}

const initialState: IPosts = {
  loading: false,
  all: data.posts
}

const postsSlice: any = createSlice({
  name: 'posts',

  initialState,

  reducers: {
    _posts: (_posts, action) => {
      _posts.all = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      console.log('hydrate persited posts state')
      return {
        ...state,
        ...action.payload.posts
      }
    })
    builder.addCase(fetchPosts.pending, (posts: IPosts) => {
      posts.loading = true
      console.log(`is fetching posts ${posts.loading}, fetching... `)
    })
    builder.addCase(fetchPosts.fulfilled, (posts: IPosts, action) => {
      posts.loading = false
      posts.all = action.payload
      console.log(`is fetching posts ${posts.loading}, fetching success`)
    })
    builder.addCase(fetchPosts.rejected, (posts: IPosts, action) => {
      posts.loading = false
      console.log(`is fetching posts ${posts.loading}, ${action.payload}`)
    })
  }

})

export const { _posts } = postsSlice.actions

export default postsSlice.reducer
