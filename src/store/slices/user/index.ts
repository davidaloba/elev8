import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@store'
import Cookies from 'js-cookie'
// import user from './thunk'

// interface IUser {
//   loading: Boolean,
//   userInfo: {}
// }

const initialState = {
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null
}

const userSlice: any = createSlice({
  name: 'user',

  initialState,

  reducers: {
    login: (user, action) => {
      user.userInfo = { ...user.userInfo, ...action.payload }
      console.log('user logged in', user.userInfo)
    },
    fetchSaved: (user, action) => {
      const saves = action.payload.saves
      const posts = action.payload.posts
      const saved = posts.filter((post) => saves.includes(post.slug))
      user.saved = saved
      console.log('Hey! I fetched saved posts ==>', saved)
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

export const { login, fetchSaved } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer
