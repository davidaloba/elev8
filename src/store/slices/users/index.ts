import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import data from '@db/data'
import { HYDRATE } from 'next-redux-wrapper'
import axios from 'axios'

interface IUsers {
  data: ({} | string | boolean | number)[], loading: boolean
}

const initialState: IUsers = {
  data: data.users, loading: false
}

export const getUsers: Promise<any> = createAsyncThunk(
  'users/getUsers',
  async (thunkAPI) => {
    const res = await fetch('http://localhost:3000/api/users').then(
      (data) => data.json()
    )
    return res
  })

const usersSlice: any = createSlice({
  name: 'users',

  initialState,

  reducers: {
    _users: (_tick, action) => {
      _users.data = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      console.log('hydrate persited users state')
      return {
        ...state,
        ...action.payload.users
      }
    })
    builder.addCase(getUsers.pending, (users: IUsers) => {
      users.loading = true
      console.log(`is fetching users ${users.loading}, fetching... `)
    })
    builder.addCase(getUsers.fulfilled, (users: IUsers, action) => {
      users.loading = false
      users.data = action.payload
      console.log(`is fetching users ${users.loading}, fetching success`)
    })
    builder.addCase(getUsers.rejected, (users: IUsers, action) => {
      users.loading = false
      console.log(`is fetching users ${users.loading}, ${action.payload}`)
    })
  }

})

export const { _users } = usersSlice.actions

export default usersSlice.reducer
