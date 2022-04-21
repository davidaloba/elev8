import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@store'
// import posts from './thunk'

interface IPosts {
  loading: Boolean,
  all: (String | Number | Boolean)[]
  filtered: (String | Number | Boolean)[]
  searchTerm: String
  current: {}
}

const initialState: IPosts = {
  loading: true,
  all: [],
  filtered: [],
  searchTerm: '',
  current: {}

}

const postsSlice: any = createSlice({
  name: 'posts',

  initialState,

  reducers: {
    setLoading: (posts, action) => {
      posts.loading = action.payload
      console.log(`is loading posts is ${posts.loading}`)
    },
    setPosts: (posts, action) => {
      posts.all = action.payload
      posts.filtered = action.payload
      console.log('Stored posts successfully')
    },
    filterPosts: (posts, action) => {
      action.payload === 'all'
        ? posts.filtered = posts.all
        : posts.filtered = posts.all.filter((post) => post.type === action.payload)
      console.log('filtered posts successfully')
    },
    setSearchTerm: (posts, action) => {
      action.payload === 'all'
        ? posts.filtered = posts.all
        : posts.filtered = posts.all.filter((post) => post.type === action.payload)
      console.log('filtered posts successfully')
    },
    expandPost: (posts, action) => {
      posts.current = action.payload
      console.log(action.payload + 'current post stored successfully')
    }
  }

  // extraReducers: (builder) => {
  //   builder.addCase(posts, (state, action) => {
  //     console.log('hydrate persited posts state')
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
