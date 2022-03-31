import { createSlice } from '@reduxjs/toolkit'
import db from '@db'

const initialState: {} = { tick: 'init' }

const tickSlice: any = createSlice({
  name: 'tick',

  initialState,

  reducers: {
    TICK: (state, action) => {
      return { ...state, tick: action.payload }
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

export const { TICK } = tickSlice.actions

export default tickSlice.reducer
