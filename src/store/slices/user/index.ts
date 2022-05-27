import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@store'
import Cookies from 'js-cookie'

const initialState = {
  userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
  profile: {
    menu: false,
    edit: false,
    tab: 'profile'
  },
  referral: {
    loading: true,
    requestWithdrawal: false,
    data: {}
  }
}

const userSlice: any = createSlice({
  name: 'user',

  initialState,

  reducers: {
    login: (user, action) => {
      user.userInfo = { ...user.userInfo, ...action.payload }
    },
    signout: (user, action) => {
      user.userInfo = null
    },
    savePost: (user, action) => {
      user.userInfo.saves = action.payload
    },
    toggleMenu: (user, action) => {
      user.profile.menu = !user.profile.menu
    },
    toggleEdit: (user, action) => {
      user.profile.edit = !user.profile.edit
    },
    switchTab: (user, action) => {
      user.profile.tab = action.payload
    },
    loadingReferral: (user, action) => {
      user.referral.loading = action.payload
    },
    setRequestWithdrawal: (user, action) => {
      user.referral.requestWithdrawal = action.payload
    },
    setReferralData: (user, action) => {
      user.referral.data = action.payload
    }
  }

  // extraReducers: (builder) => {
  //   builder.addCase(user, (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.user
  //     }
  //   })
  // }

})

export const { login, signout, savePost, toggleMenu, toggleEdit, switchTab, loadingReferral, setReferralData, setRequestWithdrawal } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer
