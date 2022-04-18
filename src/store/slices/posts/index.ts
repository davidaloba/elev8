import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@store'
// import posts from './thunk'

interface IPosts {
  loading: Boolean,
  data: (String | Number | Boolean)[]
}

const initialState: IPosts = {
  loading: true,
  data: []
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
      posts.data = action.payload
      console.log('Stored posts successfully')
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

export const { setLoading, setPosts } = postsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.posts

export default postsSlice.reducer
