import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import data from '@db/data'
import { getPosts } from './thunk'

interface IPosts {
  data: ({} | string | boolean | number)[], loading: boolean
}

const initialState: IPosts = {
  data: data.posts, loading: false
}

const postsSlice: any = createSlice({
  name: 'posts',

  initialState,

  reducers: {
    _posts: (_tick, action) => {
      _posts.data = action.payload
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
    builder.addCase(getPosts.pending, (posts: IPosts) => {
      posts.loading = true
      console.log(`is fetching posts ${posts.loading}, fetching... `)
    })
    builder.addCase(getPosts.fulfilled, (posts: IPosts, action) => {
      posts.loading = false
      posts.data = action.payload
      console.log(`is fetching posts ${posts.loading}, fetching success`)
    })
    builder.addCase(getPosts.rejected, (posts: IPosts, action) => {
      posts.loading = false
      console.log(`is fetching posts ${posts.loading}, ${action.payload}`)
    })
  }

})

export const { _posts } = postsSlice.actions

export default postsSlice.reducer
