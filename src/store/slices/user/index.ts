import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@store'
import Cookies from 'js-cookie'
// import user from './thunk'

// interface IUser {
//   loading: Boolean,
//   userInfo: {}
// }

const initialState = {
  userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
  profile: {
    menu: false,
    edit: false
  }
}

const userSlice: any = createSlice({
  name: 'user',

  initialState,

  reducers: {
    login: (user, action) => {
      user.userInfo = { ...user.userInfo, ...action.payload }
      console.log('user logged in', user.userInfo)
    },
    signout: (user, action) => {
      user.userInfo = null
      console.log('user logged in', user.userInfo)
    },
    savePost: (user, action) => {
      user.userInfo.saves = action.payload
      console.log(action.payload + 'was added to saves successfully')
    },
    toggleMenu: (user, action) => {
      user.profile.menu = !user.profile.menu
      console.log('user menu is' + !user.profile.menu)
    },
    toggleEdit: (user, action) => {
      user.profile.edit = !user.profile.edit
      console.log('user menu is' + !user.profile.menu)
    }
  }

  // extraReducers: (builder) => {
  //   builder.addCase(user, (state, action) => {
  //     console.log('hydrate persited user state')
  //     return {
  //       ...state,
  //       ...action.payload.user
  //     }
  //   })
  // }

})

export const { login, signout, savePost, toggleMenu, toggleEdit } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer
