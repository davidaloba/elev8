import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@store'

interface IUser {
  data: {},
  saved: {}
}

const initialState: IUser = {
  data: {},
  saved: {}
}

const userSlice: any = createSlice({
  name: 'user',

  initialState,

  reducers: {
    login: (user, action) => {
      console.log('stored user data ==>', user.data)
      return { ...user, ...action.payload }
    },
    fetchSaved: (user, action) => {
      const saves = action.payload.saves
      const posts = action.payload.posts
      const saved = posts.filter((post) => saves.includes(post.slug))
      user.saved = saved
      console.log('Hey! I fetched saved posts ==>', saved)
    }
  },

  extraReducers: (builder) => {
    // builder.addCase(THUNK, (state, action) => {
    //   console.log('hydrate persited user state')
    //   return {
    //     ...state,
    //     ...action.payload.user
    //   }
    // })
  }

})

export const { login, fetchSaved } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer
