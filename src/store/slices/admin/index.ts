import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@store'

const initialState = {
  loading: true,
  summary: {
    postsCount: null,
    usersCount: null
  },
  posts: null,
  users: null,
  giveaway: null,
  withdrawalRequests: null
}

const userSlice: any = createSlice({
  name: 'admin',

  initialState,

  reducers: {
    fetchAdminSummary: (admin, action) => {
      admin.summary = action.payload
    },
    fetchAdminPosts: (admin, action) => {
      admin.posts = action.payload
    },
    fetchAdminUsers: (admin, action) => {
      admin.users = action.payload
    },
    fetchAdminWithdrawals: (admin, action) => {
      const data = Object.values(action.payload)
      admin.withdrawalRequests = data
    },
    fetchAdminGiveaway: (admin, action) => {
      admin.giveaway = action.payload
    },
    fetchAdminNotifications: (admin, action) => {
      admin.notifications = action.payload
    },
    setAdminLoading: (admin, action) => {
      admin.loading = false
    }
  }

  // extraReducers: (builder) => {
  //   builder.addCase(admin, (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.admin
  //     }
  //   })
  // }

})

export const {
  fetchAdminSummary,
  fetchAdminPosts,
  fetchAdminUsers,
  fetchAdminWithdrawals,
  fetchAdminGiveaway,
  fetchAdminNotifications,
  setAdminLoading
} = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.admin

export default userSlice.reducer
