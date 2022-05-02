import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@store'
// import posts from './thunk'

// interface IPosts {
//   loading: Boolean,
//   all: (String | Number | Boolean)[]
//   filtered: (String | Number | Boolean)[]
//   searchTerm: String
//   current: {}
// }

const initialState = {
  loading: true,
  all: [],
  filtered: {
    type: 'all',
    posts: []
  },
  searchTerm: '',
  current: {}

}

const postsSlice: any = createSlice({
  name: 'posts',

  initialState,

  reducers: {
    setLoading: (posts, action) => {
      posts.loading = action.payload
    },
    setPosts: (posts, action) => {
      posts.all = action.payload
      posts.filtered.posts = action.payload
    },
    filterPosts: (posts, action) => {
      action.payload === 'all'
        ? posts.filtered.posts = posts.all
        : posts.filtered.posts = posts.all.filter((post) => post.type === action.payload)
      posts.filtered.type = action.payload
    },
    setSearchTerm: (posts, action) => {
      action.payload === 'all'
        ? posts.filtered.posts = posts.all
        : posts.filtered.posts = posts.all.filter((post) => post.type === action.payload)
    },
    expandPost: (posts, action) => {
      posts.current = action.payload
    }
  }

  // extraReducers: (builder) => {
  //   builder.addCase(posts, (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.posts
  //     }
  //   })
  // }

})

export const { setLoading, setPosts, filterPosts, setSearchTerm, expandPost } = postsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.posts

export default postsSlice.reducer
