import { createSlice } from '@reduxjs/toolkit'
import data from '@db/data'
import db from '@db'

interface IUsers {
  users: ({} | string | boolean | number)[];
}

const initialState: IUsers = {
  users: data.users
}

const usersSlice: any = createSlice({
  name: 'users',

  initialState,

  reducers: {
    FETCH_USERS: (state, action) => {
      return { ...state, users: action.payload }
    }
  },

  extraReducers: {
    HYDRATE: (state, action) => {
      console.log('HYDRATE', action.payload)
      return {
        ...state,
        ...action.payload.subject
      }
    }
  }

})

export const { FETCH_USERS } = usersSlice.actions

export default usersSlice.reducer
