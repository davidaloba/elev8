import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: {} = { tick: 'tick' }

const tickSlice: any = createSlice({
  name: 'tick',

  initialState,

  reducers: {
    TICK (state, action) {
      return { ...state, tick: action.payload }
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log('HYDRATE', action.payload.tick)
      return {
        ...state,
        ...action.payload.tick
      }
    }
  }

})

export const { TICK } = tickSlice.actions

export default tickSlice.reducer
