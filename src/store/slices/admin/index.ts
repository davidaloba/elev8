import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@store'

const initialState = {
  summary: {
    postsCount: null,
    usersCount: null
  },
  posts: null
}

const userSlice: any = createSlice({
  name: 'admin',

  initialState,

  reducers: {
    fetchAdminSummary: (admin, action) => {
      admin.summary.postsCount = action.payload.postsCount
      admin.summary.usersCount = action.payload.usersCount
      console.log(action.payload, ' was added to admin summary in')
    },
    fetchAdminPosts: (admin, action) => {
      admin.posts = action.payload
      console.log(' fetch admin posts successful', action.payload)
    }
  }

  // extraReducers: (builder) => {
  //   builder.addCase(admin, (state, action) => {
  //     console.log('hydrate persited admin state')
  //     return {
  //       ...state,
  //       ...action.payload.admin
  //     }
  //   })
  // }

})

export const {
  fetchAdminSummary,
  fetchAdminPosts
} = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.admin

export default userSlice.reducer
